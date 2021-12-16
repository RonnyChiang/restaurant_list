const restaurants = require('../restaurant') // 載入 model

// get restaurant list from json
const restaurantList = require("../../restaurant.json").results

const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const db = require('../../config/mongoose')


db.once("open", () => {



  // return Promise.all(Array.from(
  //   { length: 2 },
  //   (_, i) =>
  //     bcrypt
  //       .genSalt(10)
  //       .then(salt => bcrypt.hash('12345678', salt))
  //       .then(hash => User.create({
  //         name: `user${i + 1}`,
  //         email: `user${i + 1}@example.com`,
  //         password: hash
  //       }))
  //       .then(user => {
  //         const userId = user._id
  //         Array.from(
  //           { length: 3 },
  //           (_, i) => {
  //             console.log(`hi${i}`)
  //             let { name, name_en, category, image, location, phone, google_map, rating, description } = restaurantList[i]
  //             restaurants.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })

  //           }
  //         )
  //       })

  // ))




  return Promise.all(Array.from(
    { length: 2 },
    (_, i) =>
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash('12345678', salt))
        .then(hash => User.create({
          name: `user${i + 1}`,
          email: `user${i + 1}@example.com`,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          Array.from(
            { length: 3 },
            (_, i) => {
              console.log(`hi${i}`)
              let { name, name_en, category, image, location, phone, google_map, rating, description } = restaurantList[i]
              console.log(name)
              restaurants.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
            }
          )
        })

  ))

    // console.log("running restaurantSeeder script...")

    // restaurants.create(restaurantList)
    //   .then(() => {
    //     console.log(restaurantList)
    //     console.log("restaurantSeeder done!")
    //     db.close()
    //   })
    .catch(err => console.log(err))
    .then(() => {
      console.log('done.')
    })
    // 退出
    .finally(() => process.exit())
})