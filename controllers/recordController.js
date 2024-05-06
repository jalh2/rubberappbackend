const Records = require('../models/recordModel')
//const jwt = require('jsonwebtoken')

// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
// }

const insertRecord = async (req, res) => {

    const { tapperName, tapperId, drc, latexVolume, dryrubberweight, date, time, buyingprice, farm_id, farmgroupname, taskname, taskgroupname } = req.body;
    console.log(tapperName+" "+tapperId+" "+drc+" "+latexVolume+" "+dryrubberweight+" "+date+" "+time+" "+buyingprice+" "+farmgroupname+" "+taskname+" "+taskgroupname)

    try {
      const dataObj = await Records.insert(tapperName, tapperId, drc, latexVolume, dryrubberweight, date, time, buyingprice, farm_id, farmgroupname, taskname, taskgroupname)
      res.status(200).json(dataObj)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
 
}


const getdailyRecords = async (req, res) => {

  const {  date, farm_id } = req.body;
  console.log( date+" "+farm_id)

  try {
    const dataObj = await Records.getDailys( date, farm_id)
    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

const getweeklyRecords = async (req, res) => {

  const {  date, farm_id } = req.body;
  console.log( date+" "+farm_id)

  try {
    const dataObj = await Records.getWeeklys( date, farm_id)
    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

const getmonthlyRecords = async (req, res) => {

  const {  date, farm_id } = req.body;
  console.log( date+" "+farm_id)

  try {
    const dataObj = await Records.getMonthlys( date, farm_id)
    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}


const getRecords = async (req, res) => {
  const {tapperId, date} = req.body
   console.log(tapperId+" "+date);
   try {
    const dataObj = await Records.getRecords(tapperId, date)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getAllForOne = async (req, res) => {
  const {tapperName, tapperId} = req.body
   console.log(tapperId+" "+tapperName);
   try {
    const dataObj = await Records.getAllRecordsForOnePerson(tapperName, tapperId)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getRecord = async (req, res) => {
  const {recordId} = req.params
   console.log(recordId);
   try {
    const dataObj = await Records.getRecord(recordId)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteRecords = async (req, res) => {
  const {id} = req.params;
    

   try {
    const dataObj = await Records.deleteRecords(id)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteOneRecord = async (req, res) => {
  const {_id} = req.params
   
   try {
    const dataObj = await Records.deleteOneRecord(_id)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports = { insertRecord, getRecords, getRecord, deleteRecords, deleteOneRecord, getdailyRecords, getweeklyRecords, getmonthlyRecords, getAllForOne }