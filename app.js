const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded()) //Used to access data from html forms

// app.use(express.json())   */Used to access data from api clients*/

app.use('/', require('./routes/api/world'))
app.use('/countries', require('./routes/api/countries'))

app.listen('3000', () => {
  console.log('Server started on port 3000')
})
