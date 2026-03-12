//////////////////////////
// Imports
//////////////////////////

const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

//////////////////////////
// Constants
//////////////////////////

const port = 8080;
const pathToFrontend = path.join(__dirname, '../frontend');
const app = express();

//////////////////////////
// Middleware/Controllers
//////////////////////////

const serveStatic = express.static(pathToFrontend);

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

// GET /api/gifs
const serveGifs = async (req, res, next) => {
  try {
    const { q } = req.query;
    const url = q ? `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${q}&limit=10` : `https://api.giphy.com/v1/gifs/trending?limit=10&rating=g&api_key=${process.env.API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    res.send(data);
  }
  catch (error) {
    console.warn(`Error: ${error.message}`);
    res.status(503).send(error);
  }
}

const serve404 = (req, res, next) => {
  res.status(404).send({ error: `Not found: ${req.originalUrl}` });
}

app.use(logRoutes);
app.use(serveStatic);

app.get('/api/gifs', serveGifs);
app.use(serve404);

//////////////////////////
// Listener
//////////////////////////

app.listen(port, () => console.log(`listening at http://localhost:${port}`)); 