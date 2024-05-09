//verify user exists or not

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      return res
        .status(401)
        .json({ msg: "Session timed out. Please login again" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res.status(400).json({ msg: "Invalid access token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = verifyJWT;
