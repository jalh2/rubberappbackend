const express = require('express')

// controller functions
const { insertRecord, getRecord, getRecords} = require('../controllers/recordController')

const router = express.Router()


// tapper routes
router.post('/insert', insertRecord)
router.get('/getonerecord/:recordid', getRecord)
router.get('/getallrecords/:recordid', getRecords)


module.exports = router