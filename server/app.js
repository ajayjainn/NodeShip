const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config();

const orderRouter = require('./routes/order')


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db')}
  )
  .catch((err) => {
    console.log('error: ', err)
    process.exit(0)
  })

app.use(express.json())
app.use('/',orderRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
