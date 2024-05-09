const express = require("express");
const {
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
  removeJob,
  getSavedJobs,
  refreshAccessToken,
} = require("../controllers/user");
const verifyJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

const router = express.Router();

router.route("/postJob").post(verifyJWT, postJob);
router.route("/getJobs").get(verifyJWT, getJobs);
router.route("/saveJob").post(verifyJWT, saveJob);
router.route("/removeJob").post(verifyJWT, removeJob);

router.route("/getSavedJobs").get(verifyJWT, getSavedJobs);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/profile").get(verifyJWT, getUser);
router.route("/profile/edit").post(verifyJWT, updateProfile);
router.post("/register", handleUserSignup);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.post("/login", handleUserLogin);
router.route("/logout").post(verifyJWT, logoutUser);
router
  .route("/profile/update")
  .post(verifyJWT, upload.single("pdf"), updateResume);
module.exports = router;
