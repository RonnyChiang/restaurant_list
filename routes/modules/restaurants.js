// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurant model
const restaurants = require('../../models/restaurant')

// search
router.get('/search', (req, res) => {

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  const sortItem = req.query.sort
  const sortMethod = {}
  let sortInput = ''

  switch (sortItem) {
    case 'name_asc':
      sortMethod['name'] = 'asc'
      sortInput = `A > Z`
      break
    case 'name_desc':
      sortMethod['name'] = 'desc'
      sortInput = 'Z > A'
      break
    case 'rating_desc':
      sortMethod['rating'] = 'desc'
      sortInput = '評分最高'
      break
    case 'category':
      sortMethod['category'] = 'asc'
      sortInput = '類別'
      break
    case 'location':
      sortMethod['location'] = 'asc'
      sortInput = '地區'
      break
    default:
      sortMethod['_id'] = 'asc'
  }

  // if (!req.query.keywords) {
  //   console.log("wth")
  //   res.redirect('/')
  // }
  const userId = req.user._id
  restaurants.find({ userId })
    .lean()
    .sort(sortMethod)
    .then(restaurant => {
      const restaurantsFilter = restaurant.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurantsData: restaurantsFilter, keywords, sortInput })
    })
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

//add new restaurant page
router.get("/new", (req, res) => {
  return res.render("new")
})

// add new restaurant
router.post("/", (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return restaurants.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect("/"))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

// info page
router.get('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  return restaurants.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

// edit page
router.get('/:restaurantId/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  return restaurants.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

// edit info
router.put("/:restaurantId", (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  const {
    name, name_en, category, image, location, phone, google_map, rating, description
  } = req.body
  return restaurants.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description

      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => {
      console.log(err)
      res.render(
        'error',
        { status: 500, error: err.message }
      )
    })
})

//delete function
router.delete('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  return restaurants.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

module.exports = router