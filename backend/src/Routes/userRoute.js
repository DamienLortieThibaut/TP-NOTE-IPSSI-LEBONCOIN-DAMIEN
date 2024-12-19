const express = require("express");
const {
  Register,
  Login,
  updateUser,
  deleteUser,
  getUsers,
} = require("../Controllers/userController");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUser);
router.get("/get", authMiddleware, getUsers);

module.exports = router;
