const Tappers = require('../models/tapperModel')
//const jwt = require('jsonwebtoken')

// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
// }

const insertTapper = async (req, res) => {

    const { name, tapperid } = req.body;
    console.log(name+" "+tapperid)

    try {
      const dataObj = await Tappers.insert(name, tapperid)
      res.status(200).json(dataObj)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
 
}



const getTappers = async (req, res) => {
  try {
    const dataObj = await Tappers.getAll()

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports = { insertTapper, getTappers }