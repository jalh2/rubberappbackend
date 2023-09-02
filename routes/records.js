const express = require('express')

// controller functions
const { insertRecord, getRecord, getRecords, deleteRecords,deleteOneRecord, getdailyRecords, getweeklyRecords } = require('../controllers/recordController')

const router = express.Router()


// tapper routes
router.post('/insert', insertRecord)
router.post('/getdailys', getdailyRecords)
router.post('/getweeklys', getweeklyRecords)
router.get('/getonerecord/:recordId', getRecord)
router.get('/getallrecords/:tapperId', getRecords)
router.get('/deleteallrecords/:id', deleteRecords)
router.get('/deleteonerecord/:_id', deleteOneRecord)


module.exports = router