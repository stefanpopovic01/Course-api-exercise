const express = require("express");

const router = express.Router();
const manufacturerController = require("../controllers/manufacturer");

router.post("/", manufacturerController.createManufacturer);
router.get("/", manufacturerController.getManufacturers);
router.get("/topManufacturer", manufacturerController.getTopManufacturer);
router.get("/average-product-price/:id", manufacturerController.getAverageProductPrice);
router.get("/:id", manufacturerController.getManufacturer);
router.put("/:id", manufacturerController.updateManufacturer);
router.delete("/:id", manufacturerController.deleteManufacturer);

module.exports = router;