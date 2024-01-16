const TaskGroups = require('../models/taskgroupsModel')
//const jwt = require('jsonwebtoken')

// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
// }

const inserttaskGroup = async (req, res) => {

    const { farmgroupname, farmid, taskname, taskgroupname, id } = req.body;
    console.log(farmgroupname+" "+farmid+" "+taskname+" "+taskgroupname+" "+id);

    try {
      const dataObj = await TaskGroups.insertTaskGroup(farmgroupname, farmid, taskname, taskgroupname, id)
      res.status(200).json(dataObj)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
 
}


const gettaskGroups = async (req, res) => {
  try {
    const { farmid } = req.params
    const dataObj = await TaskGroups.getTaskGroups(farmid)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deletetaskGroup = async (req, res) => {
  const { id } = req.params
  
  try {
   const dataObj = await TaskGroups.deleteTaskGroup(id)

   res.status(200).json(dataObj)
 } catch (error) {
   res.status(400).json({error: error.message})
 }
}

module.exports = { inserttaskGroup, gettaskGroups, deletetaskGroup }