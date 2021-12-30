const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Campground = require('./models/campground')

const mongoDB = 'mongodb://127.0.0.1:27017/yelp-camp';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('database connected')
});


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makeCamp', async (req, res) => {
    const camp = new Campground({ title: 'My backyard', description: 'A great place' });
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log("Example app listening at port")
})