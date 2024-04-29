const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tapperSchema = new Schema({
  tasknumber: {
    type: String,
    required: true,
    unique: false,
  },
  name: {
    type: String,
    required: true,
  },
  farm_id: {
    type: String,
    required: true,
  },
  farmgroupname: {
    type: String,
    required: false,
    default: "",
  },
  taskname: {
    type: String,
    required: false,
    default: "",
  },
  taskgroupname: {
    type: String,
    required: false,
    default: "",
  }
})


// static insert method
tapperSchema.statics.insert = async function( name, tasknumber, farm_id) {

  const exists = await this.findOne({ name })
  console.log("model view "+name+" "+tasknumber+" "+farm_id);
  if (exists) {
    throw Error('Record Already Inserted')
  }

  const post = await this.create({name, tasknumber, farm_id})

  return post
}

tapperSchema.statics.getAll = async function(farm_id) {

  let docs = await this.find({ farm_id });
  return docs;
}

tapperSchema.statics.deleteTapper = async function (name) {
  const exists = await this.findOne({ name });

  if (exists) {
    // Delete the record if it exists
    const deletedRecord = await this.findOneAndDelete({ name });
    return deletedRecord;
  } else {
    throw Error('Record not found');
  }
};

tapperSchema.statics.UpdateTapper = async function(_id, farmgroupname, taskname, taskgroupname) {
  const filter = { _id: _id };
  const update = {
    farmgroupname: farmgroupname,
    taskname: taskname,
    taskgroupname: taskgroupname,
  };

  try {
    const doc = await this.findOneAndUpdate(filter, update, {
      new: true
    });
    return doc;
  } catch (error) {
    return error.message;
  }
};

tapperSchema.statics.GetTapperGroup = async function(farm_id, farmgroupname, taskname, taskgroupname) {
  const filter = {
    farm_id: farm_id,
    farmgroupname: farmgroupname,
    taskname: taskname,
    taskgroupname: taskgroupname,
  };

  try {
    let docs = await this.find(filter);
    return docs;
  } catch (error) {
    return error.message;
  }
};


module.exports = mongoose.model('Tappers', tapperSchema, 'tappers')
