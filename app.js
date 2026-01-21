// Express app to serve the static files

// Modules import
import express from 'express';
import path from 'path';
import services from './static/Scripts/Services.js';
import session from 'express-session';
import mongoose from 'mongoose';

const __dirname = import.meta.dirname;

// DB connection
await mongoose.connect('mongodb://localhost/ClinicFlow', 
    {
        serverSelectionTimeoutMS: 15000
    }
);

// Schema and modelling
const appointmentSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        phone: Number,
        age: Number,
        date: String,
        time: String
    }
);

const appointment = mongoose.model('Appointment', appointmentSchema);

// Initialization
const app = express();
const port = 80;

// Serving static files
app.use('/static', express.static(path.join(__dirname, 'static')));
// Session 
app.use(session(
    {
        secret: 'clinicFlow session 1321',
        resave: false,
        saveUninitialized: true
    }
));
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
app.post('/submit-appointment', async (req, res, next) =>
{
    try
    {
        var readdata = new appointment(req.body);
        await readdata.save();

        req.session.reademail = req.body.email;
        res.redirect(`/success`);
    }

    catch(error)
    {
        next(error);
    }
});

// Success page display
app.get('/success', (req, res) =>
{
    // Read from the session
    const email = req.session.reademail;

    // If email is not entered then ask to fill the form
    if(!email)
        return res.redirect('/error');
    
    delete req.session.reademail;

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

// Not found
app.use((req, res) =>
{
    res.status(404).render('error404.pug');
});

// Internal server error
app.use((err, req, res, next) =>
{
    res.status(500).render('error500.pug');
});

// Server
app.listen(port, () => 
{
    console.log(`The website is launched successfully and is lstening to port ${port}`);
});