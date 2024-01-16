const express = require('express')

// controller functions
const { insertTask, getTasks, deleteTask} = require('../controllers/taskController')

const router = express.Router()


// farmgroup routes
router.post('/insert', insertTask)
router.get('/get/:farmid', getTasks)
router.get('/delete/:id', deleteTask)


module.exports = router