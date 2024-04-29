const Tappers = require('../models/tapperModel')
//const jwt = require('jsonwebtoken')

// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
// }

const insertTapper = async (req, res) => {

    const { name, tasknumber, farm_id} = req.body;
    console.log(name+" "+tasknumber+" "+farm_id)

    try {
      const dataObj = await Tappers.insert(name, tasknumber, farm_id)
      res.status(200).json(dataObj)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
 
}

const getTappers = async (req, res) => {

  const { farm_id } = req.body;
  console.log("farm id: "+farm_id)
  try {
    const dataObj = await Tappers.getAll(farm_id)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteTapper = async (req, res) => {
  const {id} = req.params
  
  try {
   const dataObj = await Tappers.deleteTapper(id)

   res.status(200).json(dataObj)
 } catch (error) {
   res.status(400).json({error: error.message})
 }
}

const updateTapper = async (req, res) => {

  const {  _id, farmgroupname, taskname, taskgroupname } = req.body;
  console.log(_id+" "+farmgroupname+" "+taskname+" "+taskgroupname)

  try {
    const dataObj = await Tappers.UpdateTapper(_id, farmgroupname, taskname, taskgroupname)
    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

const getTapperGroup = async (req, res) => {

  const { farm_id, farmgroupname, taskname, taskgroupname } = req.body;
  console.log(farm_id+" "+farmgroupname+" "+taskname+" "+taskgroupname)
  
  try {
    const dataObj = await Tappers.GetTapperGroup(farm_id, farmgroupname, taskname, taskgroupname)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { insertTapper, getTappers, deleteTapper, updateTapper, getTapperGroup }