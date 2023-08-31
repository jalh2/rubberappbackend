const express = require('express')

// controller functions
const { insertFarm, getFarm, updateFarm1, updateFarm2, updateFarm3, deleteFarm} = require('../controllers/farmController')

const router = express.Router()


// tapper routes
router.post('/insert', insertFarm)
router.post('/marketupdate', updateFarm1)
router.post('/firestoneupdate', updateFarm2)
router.post('/manualupdate', updateFarm3)
router.get('/get/:farm_id', getFarm)
router.get('/delete/:id', deleteFarm)


module.exports = router