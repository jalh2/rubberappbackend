const mongoose = require('mongoose')

const Schema = mongoose.Schema

const farmgroupsSchema = new Schema({
  farmid: {
    type: String,
    required: true,
  },
  farmgroupname: {
    type: String,
    required: true, 
  },
  id: {
    type: String,
    required: true,
  },
})


// static insert method
farmgroupsSchema.statics.insertFarmGroup = async function( farmgroupname, farmid, id) {

  const exists = await this.findOne({ farmgroupname, farmid })

  if (exists) {
    throw Error('Record Already Inserted')
  }

  const post = await this.create({farmgroupname, farmid, id})

  return post
}



farmgroupsSchema.statics.getFarmGroups = async function(farmid) {

  let docs = await this.find({ farmid });
  return docs;
}



farmgroupsSchema.statics.deleteFarmGroup = async function (id) {
  const exists = await this.findOne({ id });

  if (exists) {
    // Delete the record if it exists
    const deletedRecord = await this.findOneAndDelete({ id });
    return deletedRecord;
  } else {
    throw Error('Record not found');
  }
};


module.exports = mongoose.model('FarmGroups', farmgroupsSchema, 'farmgroups')
