const express = require('express')

// controller functions
const { insertTapper, getTappers, deleteTapper} = require('../controllers/tapperController')

const router = express.Router()


// tapper routes
router.post('/insert', insertTapper)
router.post('/get', getTappers)
router.post('/delete', deleteTapper)


module.exports = router