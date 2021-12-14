// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') // 載入 method-override
const session = require('express-session')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')  // 引用路由器
require('./config/mongoose') // 引用mongoose
const PORT = process.env.PORT || 3000
const app = express()

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.use(express.static('public')) // static files
app.use(express.urlencoded({ extended: true }))  //  body-parser
app.use(methodOverride('_method')) //methodOverride

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// 將 request 導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})