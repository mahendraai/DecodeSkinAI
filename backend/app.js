const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const skinAnalysisRoutes = require('./routes/skinAnalysisRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/skin-analysis', skinAnalysisRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
