const express = require("express");
const {
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAnnoucement,
  getAnnouncementById,
  getAnnouncementByUserId,
} = require("../Controllers/announcementController");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createAnnouncement);
router.get("/get", authMiddleware, getAnnoucement);
router.put("/update/:announcementId", authMiddleware, updateAnnouncement);
router.delete("/delete/:announcementId", authMiddleware, deleteAnnouncement);
router.get("/get/:announcementId", authMiddleware, getAnnouncementById);

module.exports = router;
