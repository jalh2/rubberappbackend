const Tasks = require('../models/taskModel')
//const jwt = require('jsonwebtoken')

// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
// }

const insertTask = async (req, res) => {

    const { farmgroupname, farmid, taskname, id } = req.body;
    console.log(farmgroupname+" "+farmid+" "+taskname+" "+id);

    try {
      const dataObj = await Tasks.insertTask(farmgroupname, farmid, taskname, id)
      res.status(200).json(dataObj)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
 
}


const getTasks = async (req, res) => {
  try {
    const { farmid } = req.params
    const dataObj = await Tasks.getTasks(farmid)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params
  
  try {
   const dataObj = await Tasks.deleteTask(id)

   res.status(200).json(dataObj)
 } catch (error) {
   res.status(400).json({error: error.message})
 }
}

module.exports = { insertTask, getTasks, deleteTask }