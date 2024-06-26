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
    type: Date,
    required: false,
  },
  time: {
    type: Date,
    required: false,
  },
  buyingprice: {
    type: String,
    required: false,
  },
  farm_id: {
    type: String,
    required: true,
  },
  farmgroupname: {
    type: String,
    required: true,
  },
  taskname: {
    type: String,
    required: true,
  },
  taskgroupname: {
    type: String,
    required: true,
  }
})


// static insert method
recordSchema.statics.insert = async function( tapperName, tapperId, drc, latexVolume, dryrubberweight, date, time, buyingprice, farm_id, farmgroupname, taskname, taskgroupname) {

  const exists = await this.findOne({ tapperId: tapperId, date: new Date(date) })

  const ndate = new Date(date);
  const tdate = new Date(time);
    if (exists) {
      // Update the existing record
      exists.tapperName = tapperName;
      exists.drc = drc;
      exists.latexVolume = latexVolume;
      exists.dryrubberweight = dryrubberweight;
      exists.farm_id = farm_id;
      exists.buyingprice = buyingprice;
      exists.farmgroupname = farmgroupname;
      exists.taskname = taskname;
      exists.taskgroupname = taskgroupname;
  
      await exists.save(); // Save the updated record
      return exists; // Return the updated record
  }

  const post = await this.create({tapperName, tapperId, drc, latexVolume, dryrubberweight, date: ndate, time: tdate, buyingprice, farm_id, farmgroupname, taskname, taskgroupname})

  return post
}


recordSchema.statics.getRecords = async function(tapperId, date) {

  const selectedDate = new Date(date);

 
  const endDate = new Date(selectedDate);
  endDate.setDate(selectedDate.getDate() + 30);

 
  const query = {
    tapperId: tapperId,
    date: {
      $gte: new Date(selectedDate.toISOString().slice(0, 10)), 
      $lte: new Date(endDate.toISOString().slice(0, 10)),     
    },
  };

  const docs = await this.find(query);

  return docs;
}

recordSchema.statics.getAllRecordsForOnePerson = async function(tapperName, tapperId) {
  const query = {
    tapperName: tapperName,
    tapperId: tapperId,
  };

  const docs = await this.find(query)
    .sort({ date: -1 }) // Sort by date in descending order (most recent to older)
    .limit(100); // Limit the result to 100 records

  return docs;
};

recordSchema.statics.getDailys = async function(date, farm_id) {

  let query = { date: new Date(date), farm_id: farm_id };
  let docs = await this.find(query);
  return docs;
}

recordSchema.statics.getWeeklys = async function(date, farm_id) {
  // Parse the date string into a JavaScript Date object
  const selectedDate = new Date(date);

  // Calculate the end date by adding 7 days to the selected date
  const endDate = new Date(selectedDate);
  endDate.setDate(selectedDate.getDate() + 7);

  // Define the query to find records within the date range
  const query = {
    farm_id: farm_id,
    date: {
      $gte: new Date(selectedDate.toISOString().slice(0, 10)), // Greater than or equal to the selected date
      $lte: new Date(endDate.toISOString().slice(0, 10)),     // Less than or equal to the end date
    },
  };

  // Find documents matching the query
  const docs = await this.find(query);

  return docs;
};

recordSchema.statics.getMonthlys = async function(date, farm_id) {
 
  const selectedDate = new Date(date);

 
  const endDate = new Date(selectedDate);
  endDate.setDate(selectedDate.getDate() + 30);

 
  const query = {
    farm_id: farm_id,
    date: {
      $gte: new Date(selectedDate.toISOString().slice(0, 10)), 
      $lte: new Date(endDate.toISOString().slice(0, 10)),     
    },
  };

  const docs = await this.find(query);

  return docs;
};



recordSchema.statics.getRecord = async function(recordId) {
  
  let doc = await this.findOne({ recordId });
  return doc;
}

recordSchema.statics.deleteOneRecord = async function (_id) {
  const deletedRecord = await this.deleteOne({ _id: _id })

  if (deletedRecord) {
    return "success";
  } else {
    throw Error('Record not found');
  }
};


recordSchema.statics.deleteRecords = async function (id) {
  const deletedRecords = await this.deleteMany({ tapperId: id });

  if (deletedRecords.deletedCount > 0) {
    return deletedRecords;
  } else {
    throw Error('No records found with the given tapperid');
  }
};

module.exports = mongoose.model('Records', recordSchema, 'records')
