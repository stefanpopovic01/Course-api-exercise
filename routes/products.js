const express = require("express");

const router = express.Router();
const productController = require("../controllers/products");

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/average-rating/:id", productController.getAverageRating);
router.get("/:id", productController.getProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;