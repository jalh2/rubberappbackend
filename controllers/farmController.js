const Farms = require('../models/farmModel')
//const jwt = require('jsonwebtoken')

// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
// }

const insertFarm = async (req, res) => {

    const { name, id } = req.body;
    console.log(name+" "+id)

    try {
      const dataObj = await Farms.insert(name, id)
      res.status(200).json(dataObj)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
 
}

const getFarm = async (req, res) => {
  try {
    const { farm_id } = req.params
    const dataObj = await Farms.getFarm(farm_id)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteFarm = async (req, res) => {
  const { id } = req.params
  
  try {
   const dataObj = await Farms.deleteFarm(id)

   res.status(200).json(dataObj)
 } catch (error) {
   res.status(400).json({error: error.message})
 }
}

module.exports = { insertFarm, getFarm, deleteFarm }