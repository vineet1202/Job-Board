const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    coverImg: { type: String }, //clodinary url
    location: {
      type: String,
    },
    role: {
      type: String,
    },
    experience: {
      type: String,
    },
    bio: {
      type: String,
    },
    skills: { type: [] },
    website: { type: String },
    linkedin: { type: String },
    github: { type: String },
    college_name: { type: String },
    degree: { type: String },
    major: { type: String },
    gpa: { type: Number },
    resume: { type: String }, //cloudinary url
    project_name_1: { type: String },
    project_name_2: { type: String },
    project_name_3: { type: String },
    project_link_1: { type: String },
    project_link_2: { type: String },
    project_link_3: { type: String },

    achievements: { type: String },

    applied_to: { type: Schema.Types.ObjectId, ref: "Job" }, //jobs applied to
    saved_jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); //this.password is DB pwd and password is passed from frontend
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("user", userSchema);
module.exports = User;
