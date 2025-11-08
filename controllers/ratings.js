const Rating = require("../models/Rating");

async function createRating (req, res) {
  try {
    const rating = new Rating(req.body);
    await rating.save();
    res.status(201).json(rating);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getRatings(req, res) {
  try {
    const filters = {};

    if (req.query.minScore || req.query.maxScore) {
      filters.score = {};
      if (req.query.minScore) filters.score.$gte = +req.query.minScore;
      if (req.query.maxScore) filters.score.$lte = +req.query.maxScore;
    }

    const ratings = await Rating.find(filters);
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function getRating (req, res) {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) return res.status(404).json({ message: "Ocena nije pronađena." });
    res.json(rating);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getLatestRatings(req, res) {
  try {
    const productId = req.params.id;
    const limit = +req.query.limit || 5;

    const ratings = await Rating.find({ product: productId })
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function updateRating (req, res) {
  try {
    const result = await Rating.replaceOne({ _id: req.params.id }, req.body);
    if (result.matchedCount === 0) return res.status(404).json({ message: "Ocena nije pronađena." });

    const updated = await Rating.findById(req.params.id);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteRating (req, res) {
  try {
    const deleted = await Rating.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Ocena nije pronađena." });

    res.json({ message: "Ocena obrisana.", deleted });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { createRating, getRating, getRatings, updateRating, deleteRating, getLatestRatings };