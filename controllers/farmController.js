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

const updateFarm1 = async (req, res) => {

    const { farm_id, marketprice1, marketprice2, marketprice3, marketprice4, marketprice5, buyingprice } = req.body;
    console.log(farm_id+" "+marketprice1+" "+marketprice2+" "+marketprice3+" "+marketprice4+" "+marketprice5+" "+buyingprice)

    try {
      const dataObj = await Farms.update1(farm_id, marketprice1, marketprice2, marketprice3, marketprice4, marketprice5, buyingprice)
      res.status(200).json(dataObj)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
 
}

const updateFarm2 = async (req, res) => {

    const { farm_id, firestoneprice } = req.body;
    console.log(farm_id+" "+firestoneprice)

    try {
      const dataObj = await Farms.update2(farm_id, firestoneprice)
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

module.exports = { insertFarm, getFarm, deleteFarm, updateFarm1, updateFarm2 }