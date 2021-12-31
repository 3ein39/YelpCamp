const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Campground = require('../models/campground')
const cities = require('./cities')
const { descriptors, places } = require('./seedsHelper')

const mongoDB = 'mongodb://127.0.0.1:27017/yelp-camp';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('database connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
}
)


