const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { SkinAnalysis } = require('../models/SkinAnalysis');

const analyzeSkin = async (req, res) => {
    try {
        // Send the photo to Python skin analysis model API
        const photoPath = path.join(__dirname, '..', req.file.path);
        
        // Send photo to Python backend
        const pythonResponse = await axios.post('http://localhost:5001/api/analyze', {
            photo: fs.readFileSync(photoPath, 'base64')
        });

        // Extract the results from Python model
        const { blemishes, skinType, score } = pythonResponse.data;

        // Save analysis to DB
        const analysis = await SkinAnalysis.create({
            blemishes_detected: blemishes,
            skin_type: skinType,
            score: score,
            photo_url: photoPath
        });

        // Send results back to frontend
        res.json({ message: 'Skin analysis complete', data: analysis });
    } catch (err) {
        console.error('Error analyzing skin:', err);
        res.status(500).json({ message: 'Error analyzing skin', error: err.message });
    }
};

module.exports = { analyzeSkin };
