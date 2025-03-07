import express from 'express';
import CodeSnippet from '../models/CodeSnippet.js';

const router = express.Router();

// Get snippet by number
router.get('/:number', async (req, res) => {
  try {
    const snippet = await CodeSnippet.findOne({ snippetNumber: req.params.number });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new snippet (admin only)
router.post('/', async (req, res) => {
  const snippet = new CodeSnippet({
    title: req.body.title,
    code: req.body.code,
    description: req.body.description,
    snippetNumber: req.body.snippetNumber
  });

  try {
    const newSnippet = await snippet.save();
    res.status(201).json(newSnippet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;