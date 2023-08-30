const mongoose = require('mongoose')

const Schema = mongoose.Schema

const farmSchema = new Schema({
  farm_id: {
    type: String,
    required: true,
  },
  buyingprice: {
    type: Number,
    required: true,
  },
  marketprice1:{
    type: Number,
    require: true,
  },
  marketprice2:{
    type: Number,
    require: true,
  },
  marketprice3:{
    type: Number,
    require: true,
  },
  marketprice4:{
    type: Number,
    require: true,
  },
  marketprice5:{
    type: Number,
    require: true,
  },
  totalweight:{
    type: Number,
    require: true,
  },
  pricesold:{
    type: Number,
    require: true,
  },
  tappercount:{
    type: Number,
    require: true,
  },
  firestoneprice:{
    type: Number,
    require: true,
  },
  manual_buyingprice:{
    type: Number,
    require: true,
  }
})


// static insert method
farmSchema.statics.insert = async function( name, id) {

  const exists = await this.findOne({ id })

  if (exists) {
    throw Error('Record Already Inserted')
  }

  const post = await this.create({name, id})

  return post
}

farmSchema.statics.getFarm = async function(farm_id) {

  let docs = await this.findOne({ farm_id });
  return docs;
}

farmSchema.statics.deleteFarm = async function (id) {
  const exists = await this.findOne({ id });

  if (exists) {
    // Delete the record if it exists
    const deletedRecord = await this.findOneAndDelete({ id });
    return deletedRecord;
  } else {
    throw Error('Record not found');
  }
};


module.exports = mongoose.model('Farms', farmSchema, 'farms')
