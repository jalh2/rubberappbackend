const express = require('express')

// controller functions
const { insertRecord, getRecord, getRecords, deleteRecords,deleteOneRecord} = require('../controllers/recordController')

const router = express.Router()


// tapper routes
router.post('/insert', insertRecord)
router.get('/getonerecord/:recordid', getRecord)
router.get('/getallrecords/:recordId', getRecords)
router.get('/deleteallrecords/:recordid', deleteRecords)
router.get('/deleteonerecord:recordid', deleteOneRecord)


module.exports = router