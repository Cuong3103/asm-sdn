const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const authenticateJWT = require("../middleware/authMiddleware");

// CREATE category
router.post("/", authenticateJWT, async (req, res) => {
  const category = new Category(req.body);
  try {
    const savedCategory = await category.save();
    res.json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id",async(req,res)=>{
try {
  const getById = await Category.findById(req.params.id)
  return res.status(200).json({getById})
} catch (error) { 
}
})

// UPDATE category
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE category
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
