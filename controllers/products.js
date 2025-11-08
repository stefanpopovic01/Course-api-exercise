const Product = require("../models/Products");
const Rating = require("../models/Rating");

async function createProduct (req, res) {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);

    } catch (err) {
        res.status(500).json({message: err.message});       
    }
};

async function getProducts (req, res) {
    try {
        const filters = {};

        const minPrice = +req.query.minPrice || 0;
        const maxPrice = +req.query.maxPrice || Number.MAX_SAFE_INTEGER;
        filters.price = {$gte: minPrice, $lte: maxPrice};

        if (req.query.category) filters.category = { $eq: req.query.category};
        if (req.query.manufacturer) filters.manufacturer = { $eq: req.query.manufacturer};

        const sortField = req.query.sortBy || "price";
        const sortOrder = req.query.order === "desc" ? -1 : 1;

        const products = await Product.find(filters)
        .sort({ [sortField]: sortOrder });

        res.json(products);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getProduct (req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).send("Nevalidan ID.")
        res.json(product);

    } catch (err) {
        res.status(500).json({message: err.mesesage})
    }
};

async function getAverageRating (req, res) {

    try {
        const productId = req.params.id;
        const ratings = await Rating.find({ product: productId });

        if (ratings.length === 0) return res.status(200).send({ averageRating: null, message: "Nema ocena." });
        let total = 0;

        ratings.forEach((element) => {
            total += element.score;
        });
        res.json({productId, averageRating: +(total / ratings.length).toFixed(2)});

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function updateProduct (req, res) {
    try {
        const updated = await Product.replaceOne({_id: req.params.id}, req.body);
        if (updated.matchedCount === 0) return res.status(404).json({ message: 'Product nije pronadjen' });

        const product = await Product.findById(req.params.id);
        res.json(product);

    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

async function deleteProduct (req, res) {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).send("Product nije pronadjen.");

        res.json({ message: "Product obrisan" });

    } catch (err) {
        res.status(400).json({message: err.mesesage});
    }
};

module.exports = { createProduct, getProducts, getProduct, updateProduct, deleteProduct, getAverageRating };