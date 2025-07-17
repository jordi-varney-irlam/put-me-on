const Recommendation = require('../models/Rec');

//create recommendations
const createRecommendation = async (req, res) => {
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
        console.error('Error creating recommendation:', err)
        res.status(500).json({ error: err.message });
    }
};

//get recommendations
const getRecommendations = async (req, res) => {
    try {
        const recs = await Recommendation.find().sort({createdAt: -1}) //newest first
        res.json(recs);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

module.exports = { createRecommendation, getRecommendations };