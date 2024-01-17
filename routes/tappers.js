const express = require('express')

// controller functions
const { insertTapper, getTappers, deleteTapper, updateTapper, getTapperGroup} = require('../controllers/tapperController')

const router = express.Router()


// tapper routes
router.post('/insert', insertTapper)
router.post('/get', getTappers)
router.post('/update', updateTapper)
router.post('/getgroup', getTapperGroup)
router.get('/delete/:id', deleteTapper)


module.exports = router