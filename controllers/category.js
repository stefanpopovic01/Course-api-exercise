const Category = require("../models/Category");

async function createCategory (req, res) {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);

    } catch (err) {
        res.status(500).json({message: err.message});       
    }
};

async function getCategories (req, res) {
    try {
        const categories = await Category.find();
        res.json(categories);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getCategory (req, res) {
    try {
        const category = await Category.findById(req.params.id);
        if(!category) return res.status(404).send("Nevalidan ID.")
        res.json(category);

    } catch (err) {
        res.status(500).json({message: err.mesesage})
    }
};

async function getSubcategories (req, res) {
    try {
        const parentId = req.params.id;
        const subcategories = await Category.find({parentCategory: parentId});
        if (!subcategories || subcategories.length === 0)
            return res.status(404).json({ message: "Nema podkategorija." });

        res.json(subcategories);
    } catch (err) {
        res.status(500).json({message: err.mesesage})        
    }
}

async function getTopCategories (req, res) {
    try {
        const categories = await Category.find();
        if (!categories || categories.length === 0) return res.status(404).json({ message: "Nema kategorija." });        

        const sorted = categories.sort((a, b) => (b.products?.length || 0) - (a.products?.length || 0));
        const top3 = sorted.slice(0, 3);
        res.json(top3);

    } catch (err) {
        res.status(500).json({message: err.mesesage})        
    }
}

async function getCategoryHierarchy(req, res) {
  try {
    const categories = await Category.find().populate('parentCategory');

    const parents = [];
    categories.forEach(cat => {
      if (cat.parentCategory && !parents.includes(cat.parentCategory.name)) {
        parents.push(cat.parentCategory.name);
      }
    });

    const hierarchy = [];

    parents.forEach(parentName => {
      const parentObj = {
        name: parentName,
        subcategories: []
      };

      categories.forEach(cat => {
        if (cat.parentCategory && cat.parentCategory.name === parentName) {
          parentObj.subcategories.push(cat.name);
        }
      });

      hierarchy.push(parentObj);
    });

    res.json(hierarchy);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function updateCategory (req, res) {
    try {
        const updated = await Category.replaceOne({_id: req.params.id}, req.body);
        if (updated.matchedCount === 0) return res.status(404).json({ message: 'Kategorija nije pronadjena.' });

        const category = await Category.findById(req.params.id);
        res.json(category);

    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

async function deleteCategory (req, res) {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).send("Kategorija nije pronadjena.");

        res.json({ message: "Kategorija obrisana" });

    } catch (err) {
        res.status(400).json({message: err.mesesage});
    }
};

module.exports = { createCategory, getCategories, getCategory, updateCategory, deleteCategory, getSubcategories, getTopCategories, getCategoryHierarchy };