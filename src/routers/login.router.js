const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");
const auth = require("../middleware/auth");

router.post("/add-admin", loginController.addAdmin);
router.post("/add-user", loginController.addUser);
router.post("/login",loginController.login); 
router.put("/update-user", auth, loginController.updateUser);
router.post("/forgot-password", loginController.forgotPassword)
router.post("/password-reset/:token", loginController.userPasswordReset)
module.exports = router;