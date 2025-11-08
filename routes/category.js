const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/subcategories/:id", categoryController.getSubcategories);
router.get("/top-categories", categoryController.getTopCategories);
router.get("/hierarchy", categoryController.getCategoryHierarchy);
router.get("/:id", categoryController.getCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
