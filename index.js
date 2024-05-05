import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//Connect to the database
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(error => console.log(error));

//Define the port

const port = process.env.PORT || 3000;

//Enable PUG
app.set('view engine', 'pug');

//Get the current year
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nameWebSite = "Agencia de Viajes";
    return next();
});

//Add body parser for reading data from forms
app.use(express.urlencoded({extended: true}));

//Enable public folder
app.use(express.static('public'));

//Put the router to use
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});