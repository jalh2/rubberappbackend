const express = require('express')

// controller functions
const { insertRecord, getRecord, getRecords, deleteRecords,deleteOneRecord} = require('../controllers/recordController')

const router = express.Router()


// tapper routes
router.post('/insert', insertRecord)
router.get('/getonerecord/:recordId', getRecord)
router.get('/getallrecords/:tapperId', getRecords)
router.get('/deleteallrecords/:tapperId', deleteRecords)
router.get('/deleteonerecord:_id', deleteOneRecord)


module.exports = router