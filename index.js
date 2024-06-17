const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your API-Ninjas API key
const API_NINJAS_API_KEY = 'Ot28mMZlv6k4ttzYvKAA0Q==gsjSjZUAsL2qGe3O';

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to fetch animal information
app.get('/animal-info', async (req, res) => {
    try {
        const animalName = req.query.name;
        if (!animalName) {
            return res.status(400).json({ error: "Animal name is required" });
        }

        const url = `https://api.api-ninjas.com/v1/animals?name=${animalName}`;
        
        const response = await axios.get(url, {
            headers: {
                'X-Api-Key': API_NINJAS_API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Couldn't fetch animal information at the moment." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
