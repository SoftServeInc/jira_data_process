const express = require('express');
const jiraController = require('../controllers/jiraController');
const router = express.Router();

router.get('/search', jiraController.searchClient);

module.exports = router;
