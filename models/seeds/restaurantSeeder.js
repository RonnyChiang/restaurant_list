const restaurants = require("../restaurant"); // 載入 model

// get restaurant list from json
const restaurantList = require("../../restaurant.json").results;

const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const User = require("../user");
const db = require("../../config/mongoose");

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

  const userIds = Array.from({ length: 2 }, (_, i) => i);

  return (
    Promise.all(
      userIds.map(uId =>
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash("12345678", salt))
          .then(hash =>
            User.create({
              name: `user${uId}`,
              email: `user${uId}@example.com`,
              password: hash
            })
          )
          .then(user => {
            const userId = user._id;
            const candidateRestaurantIndices = Array.from(
              { length: 3 },
              (_, rId) => rId
            ); // FIXME: generate the index list by user id

            const candidateRestaurants = candidateRestaurantIndices.map(
              index => restaurantList[index]
            );

            return candidateRestaurants.map(restaurant => {
              const {
                name,
                name_en,
                category,
                image,
                location,
                phone,
                google_map,
                rating,
                description
              } = restaurant;

              restaurants.create({
                name,
                name_en,
                category,
                image,
                location,
                phone,
                google_map,
                rating,
                description,
                userId
              });
            });
          })
      )
    )

      .catch(err => console.log(err))
      .then(() => {
        console.log("done.");
      })
      // 退出
      .finally(() => process.exit())
  );
});
