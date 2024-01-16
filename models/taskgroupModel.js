const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskgroupSchema = new Schema({
  farmid: {
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
  },
  id: {
    type: String,
    required: true,
  },
})


// static insert method
taskgroupSchema.statics.insertTaskGroup = async function(farmgroupname, farmid, taskname, taskgroupname, id) {

  const exists = await this.findOne({ taskname, farmgroupname, farmid, taskgroupname })

  if (exists) {
    throw Error('Record Already Inserted')
  }

  const post = await this.create({taskname, farmgroupname, farmid, taskgroupname, id})

  return post
}



taskgroupSchema.statics.getTaskGroups = async function(farmid) {

  let docs = await this.find({ farmid });
  return docs;
}



taskgroupSchema.statics.deleteTaskGroup = async function (id) {
  const exists = await this.findOne({ id });

  if (exists) {
    // Delete the record if it exists
    const deletedRecord = await this.findOneAndDelete({ id });
    return deletedRecord;
  } else {
    throw Error('Record not found');
  }
};


module.exports = mongoose.model('taskgroups', taskgroupSchema, 'taskgroups')
