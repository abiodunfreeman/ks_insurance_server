const express = require('express');
const router = express.Router();
const { createContactMsg } = require('../controllers/ContactMsg');
router.route('/').post(createContactMsg);

module.exports = router;
