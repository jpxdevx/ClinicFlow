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
// URL encoding
app.use(express.urlencoded({extended: true}));

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

// Appointment form
app.get('/appointment', (req, res) =>
{
    res.status(200).render('appointment.pug');
});

// Appointment form submission
app.post('/submit-appointment', (req, res) =>
{
    // Read from the form
    const email = req.body.email;

    res.redirect(`/success?email=${encodeURIComponent(email)}`);
});

// Success page display
app.get('/success', (req, res) =>
{
    // Read from the URL
    const email = req.query.email;

    res.status(200).render('success.pug', {mail: email});
});

// Contact
app.get('/contact', (req, res) =>
{
    res.status(200).render('contact.pug');
});

// Learn more
app.get('/about', (req, res) =>
{
    res.status(200).render('about.pug');
});

// Server
app.listen(port, () => 
{
    console.log(`The website is launched successfully and is lstening to port ${port}`);
});