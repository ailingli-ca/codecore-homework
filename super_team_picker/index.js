const express = require('express');
const app = express();
const methodOverride = require('method-override'); 
const path = require('path');
const logger = require('morgan');
const req = require('express/lib/request');
const cohortRouter = require('./routes/cohorts');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride((req,res) => {
    if (req.body && req.body._method) {
        const method = req.body._method;
        return method
    }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));


app.use('/cohorts', cohortRouter);

app.get ('/', (req, res) => {
    res.render('home');
})


app.set('view engine', 'ejs');
app.set('views', 'views')


const DOMAIN = "localhost";
const PORT = 4545;

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})