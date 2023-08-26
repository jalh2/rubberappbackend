const mongoose = require('mongoose')

const Schema = mongoose.Schema
const recordSchema = new Schema({
  tapperName: {
    type: String,
    required: false,
  },
  tapperId: {
    type: String,
    required: false,
  },
  recordId: {
    type: String,
    required: false,
  },
  drc: {
    type: String,
    required: false,
  },
  latexVolume: {
    type: String,
    required: false,
  },
  dryrubberweight: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  time: {
    type: String,
    required: false,
  },
})


// static insert method
recordSchema.statics.insert = async function( tapperName, tapperId, drc, latexVolume, dryrubberweight, date, time) {

  const exists = await this.findOne({ tapperId: tapperId, date: date })

    if (exists) {
      // Update the existing record
      exists.tapperName = tapperName;
      exists.drc = drc;
      exists.latexVolume = latexVolume;
      exists.dryrubberweight = dryrubberweight;
      exists.time = time;
  
      await exists.save(); // Save the updated record
      return exists; // Return the updated record
  }

  const post = await this.create({tapperName, tapperId, drc, latexVolume, dryrubberweight, date, time})

  return post
}


recordSchema.statics.getRecords = async function(tapperId) {

  let query = { tapperId };
  let docs = await this.find(query);
  return docs;
}

recordSchema.statics.getRecord = async function(recordId) {
  
  let doc = await this.findOne({ recordId });
  return doc;
}

recordSchema.statics.deleteOneRecord = async function (recordId) {
  const deletedRecord = await this.findByIdAndDelete(recordId);

  if (deletedRecord) {
    return deletedRecord;
  } else {
    throw Error('Record not found');
  }
};


recordSchema.statics.deleteRecords = async function (tapperId) {
  const deletedRecords = await this.deleteMany({ tapperId });

  if (deletedRecords.deletedCount > 0) {
    return deletedRecords;
  } else {
    throw Error('No records found with the given tapperid');
  }
};

module.exports = mongoose.model('Records', recordSchema, 'records')
