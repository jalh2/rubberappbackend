const express = require('express')

// controller functions
const { inserttaskGroup, gettaskGroups, deletetaskGroup} = require('../controllers/taskgroupController')

const router = express.Router()


// farmgroup routes
router.post('/insert', inserttaskGroup)
router.get('/get/:farmid', gettaskGroups)
router.get('/delete/:id', deletetaskGroup)


module.exports = router