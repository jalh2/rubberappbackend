const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tapperSchema = new Schema({
  id: {
    type: String,
    required: true,
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
tapperSchema.statics.insert = async function( name, id, farm_id) {

  const exists = await this.findOne({ id })

  if (exists) {
    throw Error('Record Already Inserted')
  }

  const post = await this.create({name, id, farm_id})

  return post
}

tapperSchema.statics.getAll = async function(farm_id) {

  let docs = await this.find({ farm_id });
  return docs;
}

tapperSchema.statics.deleteTapper = async function (id) {
  const exists = await this.findOne({ id });

  if (exists) {
    // Delete the record if it exists
    const deletedRecord = await this.findOneAndDelete({ id });
    return deletedRecord;
  } else {
    throw Error('Record not found');
  }
};


module.exports = mongoose.model('Tappers', tapperSchema, 'tappers')
