const express = require('express')

// controller functions
const { insertRecord, getRecord, getRecords, deleteRecords,deleteOneRecord, getdailyRecords, getweeklyRecords, getmonthlyRecords, getAllForOne } = require('../controllers/recordController')

const router = express.Router()


// tapper routes
router.post('/insert', insertRecord)
router.post('/getdailys', getdailyRecords)
router.post('/getweeklys', getweeklyRecords)
router.post('/getmonthlys', getmonthlyRecords)
router.get('/getonerecord/:recordId', getRecord)
router.post('/getallrecords', getRecords)
router.post('/getallforone', getAllForOne)
router.get('/deleteallrecords/:id', deleteRecords)
router.get('/deleteonerecord/:_id', deleteOneRecord)


module.exports = router