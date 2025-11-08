const Manufacturer = require("../models/Manufacturer ");

async function createManufacturer(req, res) {
  try {
    const manufacturer = new Manufacturer(req.body);
    await manufacturer.save();
    res.status(201).json(manufacturer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getManufacturers(req, res) {
  try {
    const filters = {};
    if(req.query.country) filters.country = req.query.country;

    const manufacturers = await Manufacturer.find(filters);
    res.json(manufacturers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getManufacturer(req, res) {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    if (!manufacturer) return res.status(404).json({ message: "Proizvođač nije pronađen." });
    res.json(manufacturer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getTopManufacturer(req, res) {
  try {
    const manufacturers = await Manufacturer.find();
    if(!manufacturers || manufacturers.length === 0) return res.status(404).json({ message: "Nema proizvođača." });

    let topManufacturer = manufacturers[0];

    manufacturers.forEach((m) => {
      if( m.products.length > topManufacturer.products.length) topManufacturer = m;
    });
    res.json(topManufacturer);

  } catch (err) {
    res.status(500).json({ message: err.message });   
  }
};

async function getAverageProductPrice(req, res) {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id).populate("products");
    
    if (!manufacturer) return res.status(404).json({ message: "Proizvođač nije pronađen." });
    if (!manufacturer.products || manufacturer.products.length === 0) {
      return res.json({ manufacturerId: manufacturer._id, manufacturerName: manufacturer.name, averagePrice: null, message: "Nema proizvoda." });
    }

    let total = 0;
    manufacturer.products.forEach((p) => {
      total += p.price;
    })
    let average = +(total / manufacturer.products.length).toFixed(2);

    res.json({ manufacturerId: manufacturer._id, manufacturerName: manufacturer.name, averagePrice: average});

  } catch (err) {
    res.status(500).json({ message: err.message });   
  }
}

async function updateManufacturer(req, res) {
  try {
    const result = await Manufacturer.replaceOne({ _id: req.params.id }, req.body);
    if (result.matchedCount === 0) return res.status(404).json({ message: "Proizvođač nije pronađen." });

    const updated = await Manufacturer.findById(req.params.id);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteManufacturer(req, res) {
  try {
    const deleted = await Manufacturer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Proizvođač nije pronađen." });

    res.json({ message: "Proizvođač obrisan.", deleted });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { createManufacturer, getManufacturers, getManufacturer, updateManufacturer, deleteManufacturer, getTopManufacturer, getAverageProductPrice };
