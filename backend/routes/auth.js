//creates new router from Express
const express = require('express');
const router = express.Router();
//imports user model made in User.js
const User = require('../models/User');
const bcrypt = require('bcryptjs'); //securely hashs passwords
const jwt = require('jsonwebtoken'); //used to create/verify tokens

//POST /register
router.post('/register', async (req, res) => {
    try {
        const {username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required."});
        }
        
        //check if user exists
        const existingUser = await User.findOne({username});
        if (existingUser) return res.status(400).json({ message: "Username already in use"});

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user using hashedpass
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({message: "User created"});
    } catch (err) {
        res.status(500).json({error: err.message });
    }
    });

//POST /login
router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        
        //FOR DEBUG
        console.log('Login payload:', req.body);

        //find user
        const user = await User.findOne({username});
        if (!user) return res.status(400).json({message: "Invalid username or password"});

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid username or password"});

        //if password mathces, create JWT token representing user
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.json({token, user: { id: user._id, username: user.username }});
    } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

module.exports = router;
