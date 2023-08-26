const Records = require('../models/recordModel')
//const jwt = require('jsonwebtoken')

// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
// }

const insertRecord = async (req, res) => {

    const { tapperName, tapperId, drc, latexVolume, dryrubberweight, date, time } = req.body;
    console.log(tapperName+" "+tapperId+" "+drc+" "+latexVolume+" "+dryrubberweight+" "+date+" "+time)

    try {
      const dataObj = await Records.insert(tapperName, tapperId, drc, latexVolume, dryrubberweight, date, time)
      res.status(200).json(dataObj)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
 
}


const getRecords = async (req, res) => {
  const {tapperId} = req.params
   console.log(tapperId);
   try {
    const dataObj = await Records.getRecords(tapperId)

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
  const {tapperId} = req.params;
    

   try {
    const dataObj = await Records.deleteRecords(tapperId)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteOneRecord = async (req, res) => {
  const {recordId} = req.params
   
   try {
    const dataObj = await Records.deleteOneRecord(recordId)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports = { insertRecord, getRecords, getRecord, deleteRecords, deleteOneRecord }