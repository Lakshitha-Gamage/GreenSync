const AdminController = require("../controllers/adminController");

const express = require("express");
const router = express.Router();

router.post("/registration", AdminController.adminRegistration);
// router.put("/update/:id", UserController.updateUserDetails);

module.exports = router;

