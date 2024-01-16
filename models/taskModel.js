const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
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
  id: {
    type: String,
    required: true,
  },
})


// static insert method
taskSchema.statics.insertTask = async function( taskname, farmgroupname, farmid, id) {

  const exists = await this.findOne({ taskname, farmgroupname, farmid })

  if (exists) {
    throw Error('Record Already Inserted')
  }

  const post = await this.create({taskname, farmgroupname, farmid, id})

  return post
}



taskSchema.statics.getTasks = async function(farmid) {

  let docs = await this.find({ farmid });
  return docs;
}



taskSchema.statics.deleteTask = async function (id) {
  const exists = await this.findOne({ id });

  if (exists) {
    // Delete the record if it exists
    const deletedRecord = await this.findOneAndDelete({ id });
    return deletedRecord;
  } else {
    throw Error('Record not found');
  }
};


module.exports = mongoose.model('tasks', taskSchema, 'tasks')
