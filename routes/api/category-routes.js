const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint for all categories and products within

router.get('/', async (req, res) => {
  // find all categories
try {
  const categories = await Category.findAll({include: [{model: Product }] })
  res.status(200).json(categories);
} catch (err) {
  res.status(500).json({message: 'error'})
}
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findbyPk(req.params.id, {include: [{ model: Product}]})
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json({message: 'error'})
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(400).json({message: 'error'})
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
