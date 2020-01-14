const { Router } = require('express');
const config = require('config');
const shortid = require('shortid');
const router = Router();
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { from } = req.body;
    const code = shortid.generate();
    const existing = await Link.findOne({ from });
    if (existing) {
      res.json({ link: existing });
      return;
    }

    const to = `${baseUrl}/t/${code}`;
    const link = new Link({
      code, to, from, owner: req.user.userId
    });

    await link.save();
    res.status(201).json({ link });

  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Server error!' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const links = await Link.findById(req.params.id);
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Server error!' });
  }
});

module.exports = router