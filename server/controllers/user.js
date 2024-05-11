const User = require("../models/user");
const ApiResponse = require("../utils/ApiResponse.js");
// const uploadOnCloudinary = require("../utils/cloudinary.js");
const cloudinary = require("cloudinary");
const asyncHandler = require("../utils/asyncHandler.js");
const fs = require("fs");
const ApiError = require("../utils/ApiError.js");
const Job = require("../models/job");
const jwt = require("jsonwebtoken");

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
    res.status(400).json(e);
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
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: { name: user.name, email: user.email, accessToken, refreshToken },
        msg: "User logged in successfully",
      });
  } catch (error) {
    console.error(error);
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

    //mathcing incoming refreshToken with user's refreshToken
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        accessToken,
        refreshToken: newRefreshToken,
        msg: "Access Token Refreshed",
      });
  } catch (e) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    //upload file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
    });
    fs.unlinkSync(localFilePath); //remove the locally saved
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const updateResume = async (req, res) => {
  const resumefilePath = req.file?.path;

  if (!resumefilePath) {
    return res.status(400).json({ msg: "Resume file is required" });
  }
  const resume = await uploadOnCloudinary(resumefilePath);
  if (!resume.url) {
    return res.status(400).json({ msg: "Error while uploading" });
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
  return (
    res
      .status(200)
      // .json(new ApiResponse(200, user, "Resume updated successfully"))
      .json({ msg: "Successfull" })
  );
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
  const { data, skills } = req.body;

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { ...data, skills, saved_jobs: [] },
    },
    { new: true }
  );

  return (
    res
      .status(200)
      // .json(new ApiResponse(200, user, "Account updated Successfully"));
      .json({ msg: "Account updated Successfully" })
  );
});

const postJob = asyncHandler(async (req, res) => {
  const { data, desc } = req.body;
  await Job.create({
    ...data,
    desc,
  });
  return res.status(200).json({ msg: "Job posted successfully" });
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
