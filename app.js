// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurants = require('./models/restaurant')

// connect mongoose
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/restaurant-list') // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static files
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))


// routes
app.get('/', (req, res) => {
  restaurants.find({})
    .lean()
    .then(restaurantsData => res.render("index", { restaurantsData }))
    .catch(err => console.log(err))
})

app.get('/search', (req, res) => {
  if (!req.query.keywords) {
    res.redirect('/')
  }

  const keyword = req.query.keywords
  const restaurantsFilter = restaurants.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurantsFilter, keyword })
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const id = req.params.restaurantId
  return restaurants.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(err => console.log(err))
})

//add new restaurant page
app.get("/restaurants/new", (req, res) => {
  res.render('new')
})

// add new restaurant
app.post("/restaurants", (req, res) => {
  restaurants.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// edit page
app.get('/restaurants/:restaurantId/edit', (req, res) => {
  const id = req.params.restaurantId
  return restaurants.findById(id)
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(err => console.log(err))
})

// edit info
app.post("/restaurants/:restaurantId/edit", (req, res) => {
  const id = req.params.restaurantId
  const {
    name, name_en, category, image, location, phone, google_map, rating, description
  } = req.body
  return restaurants.findById(id)
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
    .catch(err => console.log(err))
})

//delete function
app.post('/restaurants/:restaurantId/delete', (req, res) => {
  const id = req.params.restaurantId
  return restaurants.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})