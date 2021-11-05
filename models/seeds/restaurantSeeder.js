const restaurants = require('../restaurant') // 載入 model

// get restaurant list from json
const restaurantList = require("../../restaurant.json").results

const db = require('../../config/mongoose')

db.once("open", () => {
  console.log("running restaurantSeeder script...")

  restaurants.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
    // 退出
    .finally(() => process.exit())
})