const Recommendation = require('../models/Rec');

//create recommendations
const createRecommendation = async (req, res) => {
    try {
        const { category, title, description } = req.body;
        const userId = req.user._id;

        //validation
        if (!category || !title || !description ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newRec = new Recommendation({
            category,
            title,
            description,
            userId,
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
        const recs = await Recommendation.find().populate('userId', 'username').sort({createdAt: -1}) //newest first
        res.json(recs);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

//delete recommendations
const deleteRecommendations = async (req, res) => {
    try {
        const rec = await Recommendation.findById(req.params.id);

        if (!rec) {
            return res.status(404).json({ message: 'Recommendation not found' });
        }

        //only creator can delete
        if (rec.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await rec.deleteOne();
        res.json({ message: 'Recommendation deleted' });
     } catch (err) {
            console.error('Error deleting recommendation:', err);
            res.status(500).json({ error: err.message });
     }
};


module.exports = { createRecommendation, getRecommendations, deleteRecommendations };