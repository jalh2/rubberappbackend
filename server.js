require('dotenv').config()

const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')

const tapperRoutes = require('./routes/tappers')
const recordRoutes = require('./routes/records')
const farmRoutes = require('./routes/farms')
const farmgroupsRoutes = require('./routes/farmgroups')
const taskRoutes = require('./routes/task');
const taskgroupRoutes = require('./routes/taskgroup');

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(cors({
  origin: '*'
}));

// routes

app.use('/api/tapper', tapperRoutes)
app.use('/api/record', recordRoutes)
app.use('/api/farm', farmRoutes)
app.use('/api/task', taskRoutes)
app.use('/api/farmgroups', farmgroupsRoutes)
app.use('/api/taskgroup', taskgroupRoutes)

mongoose.set('strictQuery', true);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })