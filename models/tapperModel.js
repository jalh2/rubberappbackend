const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tapperSchema = new Schema({
  tapperid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
})


// static insert method
tapperSchema.statics.insert = async function( name, tapperid) {

  const exists = await this.findOne({ tapperid })

  if (exists) {
    throw Error('Record Already Inserted')
  }

  const post = await this.create({name, tapperid})

  return post
}




tapperSchema.statics.getAll = async function() {

  let docs = await this.find();
  return docs;
}



module.exports = mongoose.model('Tappers', tapperSchema, 'tappers')
