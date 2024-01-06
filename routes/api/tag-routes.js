const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try { 
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tagData)

  } catch (err) {
    res.status(500).json({message: 'no tags'})
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found!'})
      return;
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json({message: 'no tags'})
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData)
  } catch (err) {
    res.status(400).json({message: 'FAIL'})
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updated = await Tag.update(req.body, {
      where: {id: req.params.id},
    });
    !updated[0]
    ? res.status(404).json({message: 'no tag'})
    : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({message: 'FAIL'})
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = await Tag.destroy({where: {id: req.params.id}});
    !deleted
    ? res.status(404).json({message: 'no tag'})
    : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({message: 'FAIL'})
  }
});

module.exports = router;
