const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Rec');

//POST /api/recs/ - create a new recommendation
router.post('/', async (req, res) => {
    try {
        const { category, title, description, userId } = req.body;

        //validation
        if (!category || !title || !description || !userId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newRec = new Recommendation({
            category,
            title,
            description,
            userId
        });

        await newRec.save();
        res.status(201).json({ message: 'Recommendation saved!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//GET /api/recs/ - get all recommendations
router.get('/', async (req, res) => {
    try {
        const recs = await Recommendation.find().sort({createdAt: -1}) //newest first
        res.json(recs);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


module.exports = router;