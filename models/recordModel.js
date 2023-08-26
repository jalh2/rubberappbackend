const mongoose = require('mongoose')

const Schema = mongoose.Schema
const recordSchema = new Schema({
  tapperName: {
    type: String,
    required: true,
  },
  tapperId: {
    type: String,
    required: true,
  },
  drc: {
    type: String,
    required: true,
  },
  latexVolume: {
    type: String,
    required: true,
  },
  dryrubberweight: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
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

  let query = { tapperId: tapperId };
  let docs = await this.find(query);
  return docs;
}

recordSchema.statics.getRecord = async function(recordId) {
  
  let doc = await this.findOne({ recordId });
  return doc;
}

recordSchema.statics.deleteOneRecord = async function (recordid) {
  const deletedRecord = await this.findByIdAndDelete(recordid);

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
