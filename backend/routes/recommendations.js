const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Rec');
const { createRecommendation, getRecommendations, deleteRecommendations } = require('../controllers/recommendations.controller');
const authenticateUser = require('../middleware/authenticator');

//POST /api/recs/ - create a new recommendation
router.post('/', authenticateUser, createRecommendation);

//GET /api/recs/ - get all recommendations
router.get('/', getRecommendations);

//DELETE - delete a recommendation
router.delete('/:id', authenticateUser, deleteRecommendations);


module.exports = router;