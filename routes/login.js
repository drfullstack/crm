const express = require("express")
const { protectRoute } = require("../auth/protect");
const { dashboardView } = require("../controllers/dashboardController");
const { loginUser, registerUser, registerView, loginView } = require("../controllers/loginController");
const router = express.Router();
//missing loginUser route;
router.get("/login", loginView)
router.post("/login", loginUser)
router.get("/register", registerView)
router.post("/register", registerUser)
router.get("/dashboard", protectRoute, dashboardView)
module.exports = router