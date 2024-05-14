const User = require("../models/user");
const ApiResponse = require("../utils/ApiResponse.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const Job = require("../models/job");
const jwt = require("jsonwebtoken");
const ms = require("ms");

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const handleUserSignup = async (req, res) => {
  //get user details from frontend
  //validation --
  //check if user already exists: name and email
  //create user in db
  //remove password and refresh token field  from response
  //check for user creation
  //return res
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "all fields are required" });
    }
    const existingUser = await User.findOne({
      $or: [{ name }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    await User.create({
      name,
      email,
      password,
    });
    return res.status(200).json({ msg: "Signup successfull" });
  } catch (e) {
    throw new ApiError(500, "Something went wrong while signing up", e);
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!password || !email) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Password is not valid" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
    );

    const expiresAt = new Date(
      Date.now() + ms(process.env.ACCESS_TOKEN_EXPIRY)
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + ms(process.env.ACCESS_TOKEN_EXPIRY)),
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRY)),
      })
      .json({
        user: {
          name: user.name,
          email: user.email,
          accessToken,
          refreshToken,
          expiresAt,
        },
        msg: "User logged in successfully",
      });
  } catch (error) {
    throw new ApiError(401, "Login Failed");
  }
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // remove field from document
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ msg: "User logged out" });
};

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    //matching incoming refreshToken with user's refreshToken
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + ms(process.env.ACCESS_TOKEN_EXPIRY)),
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRY)),
      })
      .json({
        accessToken,
        refreshToken: refreshToken,
        expiresAt: new Date(Date.now() + ms(process.env.ACCESS_TOKEN_EXPIRY)),
        msg: "Access Token Refreshed",
      });
  } catch (e) {
    throw new ApiError(401, "Invalid refresh token");
  }
};

const updateResume = async (req, res) => {
  try {
    const resumefilePath = req.file?.path;

    if (!resumefilePath) {
      return res.status(400).json({ msg: "Resume file is required" });
    }
    const resume = await uploadOnCloudinary(resumefilePath);
    if (!resume.url) {
      return res.status(500).json({ msg: "Error while uploading" });
    }

    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          resume: resume.url.replace(".pdf", ".jpg"),
        },
      },
      { new: true }
    );
    return res.json(new ApiResponse(200, "Resume updated successfully"));
  } catch (e) {
    throw new ApiError(500, "Something went wrong while updating resume", e);
  }
};

const changeCurrentPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    return res.status(400).json({ msg: "message is incorrect" });
  }
  user.password = newPassword;
  user.save({ validateBeforeSave: false });
  return res.status(200).json({ msg: "Password successfully changed" });
};

const getUser = async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched Succesfully"));
};

//update whatever is avalaible
const updateProfile = asyncHandler(async (req, res) => {
  try {
    const { data, skills } = req.body;

    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: { ...data, skills, saved_jobs: [] },
      },
      { new: true }
    );

    return res.json(new ApiResponse(200, "Account updated Successfully"));
  } catch (e) {
    throw new ApiError(500, "Something went wrong while updating Profile", e);
  }
});

const postJob = asyncHandler(async (req, res) => {
  try {
    const { data, desc } = req.body;
    await Job.create({
      ...data,
      desc,
    });
    return res.status(200).json({ msg: "Job posted successfully" });
  } catch (e) {
    throw new ApiError(500, "Something went wrong while Posting Job");
  }
});

const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({});
    return res.status(200).json(new ApiResponse(200, jobs, "successfull"));
  } catch (e) {
    console.error(e);
  }
});

const saveJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    if (user.saved_jobs.includes(jobId)) {
      return res.status(200).json({ msg: "Already Saved" });
    } else {
      user.saved_jobs.push(jobId);
      await user.save();
    }

    return res.status(200).json({ msg: "Successfull" });
  } catch (e) {
    console.error(e);
  }
});

const removeJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    user.saved_jobs = user.saved_jobs.filter(
      (savedJobId) => !savedJobId.equals(jobId)
    );
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, user.saved_jobs, "successfull"));
  } catch (e) {
    console.error(e);
  }
});

const getSavedJobs = asyncHandler(async (req, res) => {
  try {
    const saved_ids = req.user.saved_jobs;
    const filteredJobs = await Job.find({ _id: { $in: saved_ids } });

    return res
      .status(200)
      .json(new ApiResponse(200, filteredJobs, "successful"));
  } catch (e) {
    console.error(e);
  }
});

module.exports = {
  handleUserSignup,
  handleUserLogin,
  logoutUser,
  updateResume,
  changeCurrentPassword,
  getUser,
  updateProfile,
  postJob,
  getJobs,
  saveJob,
  getSavedJobs,
  refreshAccessToken,
  removeJob,
};
