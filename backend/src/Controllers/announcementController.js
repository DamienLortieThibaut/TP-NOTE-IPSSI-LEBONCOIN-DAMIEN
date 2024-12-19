const { get } = require("mongoose");
const Announcement = require("../Models/announcementModel");

const createAnnouncement = async (req, res) => {
  const authorId = req.user.id;
  try {
    const announcement = new Announcement({
      ...req.body,
      author: authorId,
    });
    if (!announcement) {
      return res.status(400).send("Merci de remplir tous les champs");
    }
    await announcement.save();
    res.status(201).send(announcement);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAnnoucement = async (req, res) => {
  try {
    const filter = {};
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }
    if (req.query.description) {
      filter.description = { $regex: req.query.description, $options: "i" };
    }
    if (req.query.category) {
      filter.category = { $regex: req.query.category, $options: "i" };
    }

    const announcements = await Announcement.find(filter).populate(
      "author",
      "username email"
    );

    res.status(200).send(announcements);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.announcementId).populate(
      "author",
      "username email"
    );
    if (!announcement) {
      return res.status(404).send({ error: "Recette introuvable" });
    }
    res.status(200).send(announcement);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.announcementId,
      req.body,
      {
        new: true,
      }
    );
    if (!announcement) {
      return res.status(404).send({ error: "Recette introuvable" });
    }
    res.status(200).send(announcement);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAnnouncementByUserId = async (req, res) => {
  try {
    const announcement = await Announcement.find({ author: req.params.userId }).populate(
      "author",
      "username email"
    );
    if (!announcement) {
      return res.status(404).send({ error: "Recette introuvable" });
    }
    res.status(200).send(announcement);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.announcementId);
    if (!announcement) {
      return res.status(404).send({ error: "Recette introuvable" });
    }
    res.status(200).send({ message: "Recette supprimée" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createAnnouncement,
  getAnnoucement,
  updateAnnouncement,
  getAnnouncementByUserId,
  getAnnouncementById,
  deleteAnnouncement,
};
