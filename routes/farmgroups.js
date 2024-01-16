const express = require('express')

// controller functions
const { insertFarmgroups, getFarmgroups, deleteFarmgroup} = require('../controllers/farmgroupsController')

const router = express.Router()


// farmgroup routes
router.post('/insert', insertFarmgroups)
router.get('/get/:farmid', getFarmgroups)
router.get('/delete/:id', deleteFarmgroup)


module.exports = router