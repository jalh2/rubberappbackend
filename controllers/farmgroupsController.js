const FarmGroups = require('../models/farmgroupsModel')
//const jwt = require('jsonwebtoken')

// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
// }

const insertFarmgroups = async (req, res) => {

    const { farmgroupname, farmid, id } = req.body;
    console.log(farmgroupname+" "+farmid+" "+id)

    try {
      const dataObj = await FarmGroups.insertFarmGroups(farmgroupname, farmid, id)
      res.status(200).json(dataObj)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
 
}


const getFarmgroups = async (req, res) => {
  try {
    const { farmid } = req.params
    const dataObj = await FarmGroups.getFarmGroups(farmid)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteFarmgroup = async (req, res) => {
  const { id } = req.params
  
  try {
   const dataObj = await FarmGroups.deleteFarmGroups(id)

   res.status(200).json(dataObj)
 } catch (error) {
   res.status(400).json({error: error.message})
 }
}

module.exports = { insertFarmgroups, getFarmgroups, deleteFarmgroup }