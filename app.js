// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json').results

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static files
app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
  res.render('index', { restaurants })
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

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})