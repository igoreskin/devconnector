const express = require('express');
const router = express.Router();

// @route   GET /api/profile
// @desc    Tests profile route
// @access  Public
router.get('/', (req, res) => res.json({msg: 'Profile route'}));

module.exports = router;