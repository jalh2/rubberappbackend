const Tappers = require('../models/tapperModel')
//const jwt = require('jsonwebtoken')

// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
// }

const insertTapper = async (req, res) => {

    const { name, id, farm_id} = req.body;
    console.log(name+" "+id+" "+farm_id)

    try {
      const dataObj = await Tappers.insert(name, id, farm_id)
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

module.exports = { insertTapper, getTappers, deleteTapper }