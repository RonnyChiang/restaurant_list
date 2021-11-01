const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 todo model

// get restaurant list from json
const restaurantList = require("../../restaurant.json").results


mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once("open", () => {
  console.log("running restaurantSeeder script...")

  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!")
      // db.close()
    })
    .catch(err => console.log(err))
})