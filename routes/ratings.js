const express = require("express");

const router = express.Router();
const ratingController = require("../controllers/ratings");

router.post("/", ratingController.createRating);
router.get("/", ratingController.getRatings);
router.get("/:id", ratingController.getRating);
router.get("/latest/:id", ratingController.getLatestRatings);
router.put("/:id", ratingController.updateRating);
router.delete("/:id", ratingController.deleteRating);

module.exports = router;