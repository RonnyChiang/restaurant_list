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

app.get('/:restaurant_id', (req, res) => {
  const restaurant = restaurants.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurant: restaurant })
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

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})