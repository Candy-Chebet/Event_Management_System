const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios'); // For making HTTP requests

// Local imports
const connectDb = require('./db.js');
const eventRoutes = require('./controllers/event.controller');
const attendeeRoutes = require('./controllers/attendee.controller');
const { errorHandler } = require('./middlewares/');

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Define a route handler for handling weather API calls
app.get('/api/weather/:city', async (req, res) => {
    try {
        const city = req.params.city;
        // Make a request to the external weather API
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={{weatherAPIKey}}`);
        const weatherData = response.data;
        // Send the weather data back to the client
        res.json(weatherData);
    } catch (error) {
        // Handle errors
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/attendees', attendeeRoutes);
app.use(errorHandler);

// Start the server
connectDb()
    .then(() => {
        console.log('DB connection succeeded.');
        app.listen(3000, () => console.log('Server started at port 3000'));
    })
    .catch(err => console.log(err));
