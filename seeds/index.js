const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const axios = require('axios');
const Campground = require('../models/campground')
const cities = require('./cities')
const {descriptors, places} = require('./seedsHelper')

const mongoDB = 'mongodb://127.0.0.1:27017/yelp-camp';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('database connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)];

async function seedImg() {
    try {
        const resp = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: 'h3jg6e9i6Ofw9lfoREB7k07a5qutx7u9NlPurQwn6fc',
                collections: 483251,
            },
        })
        return resp.data.urls.small
    } catch (err) {
        console.error(err)
    }
}


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: "61f982c0bffff4f6e811998c",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae aliquid voluptatem dignissimos omnis impedit, molestias architecto magnam doloremque distinctio, repellendus perspiciatis earum similique, quos nobis ipsum qui veritatis aliquam praesentium!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [31.23944, 30.05611]
            },
            images: [{
                "url": "https://res.cloudinary.com/ein39/image/upload/v1643904859/YelpCamp/w2sueupzskasefnesxl7.jpg",
                "filename": "YelpCamp/w2sueupzskasefnesxl7",
            }, {
                "url": "https://res.cloudinary.com/ein39/image/upload/v1643904887/YelpCamp/hdmkonvrvacosy5clzjz.jpg",
                "filename": "YelpCamp/hdmkonvrvacosy5clzjz",
            }]
        })
        await camp.save();
    }
}
seedDB().then(() => {
        mongoose.connection.close();
    }
)


