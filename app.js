// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') // 載入 method-override
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')  // 引用路由器
const usePassport = require('./config/passport')
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

app.use(flash())  // 掛載套件

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  res.locals.loginError_msg = req.flash('loginError_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})

// 將 request 導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})