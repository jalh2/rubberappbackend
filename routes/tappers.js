const express = require('express')

// controller functions
const { insertTapper, getTappers} = require('../controllers/tapperController')

const router = express.Router()


// tapper routes
router.post('/insert', insertTapper)
router.post('/get', getTappers)


module.exports = router