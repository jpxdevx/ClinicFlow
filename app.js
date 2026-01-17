// Express app to serve the static files

// Modules import
const express = require('express');
const path = require('path');
const services = require('./static/Scripts/Services.js');

// Initialization
const app = express();
const port = 80;

// Serving static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// Endpoints

// homepage
app.get('/', (req, res) =>
{
    res.status(200).render('index.pug', {serviceCards: services});
});

// Services
app.get('/services', (req, res) =>
{
    res.status(200).render('services.pug', {serviceCards: services});
});

app.get('/appointment', (req, res) =>
{
    res.status(200).render('appointment.pug');
})

// Server
app.listen(port, () => 
{
    console.log(`The website is launched successfully and is lstening to port ${port}`);
});