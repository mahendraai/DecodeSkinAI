const express = require('express');
const multer = require('multer');
const skinAnalysisController = require('../controllers/skinAnalysisController');

const router = express.Router();

// Image upload setup using Multer
const upload = multer({ dest: 'uploads/' });

// Route to upload photo and get skin analysis
router.post('/upload', upload.single('photo'), skinAnalysisController.analyzeSkin);

module.exports = router;
