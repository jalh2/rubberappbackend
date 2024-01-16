const mongoose = require('mongoose')

const Schema = mongoose.Schema

const farmSchema = new Schema({
  farm_id: {
    type: String,
    required: true,
  },
  buyingprice: {
    type: Number,
    default: 0, // Default value set to 0
  },
  totalweight: {
    type: Number,
    default: 0,
  },
  tappercount: {
    type: Number,
    default: 0,
  },
})

farmSchema.statics.create = async function (farm_id) {
  try {
    const farm = new this({
      farm_id,
    });

    const result = await farm.save();
    return result;
  } catch (error) {
    throw error;
  }
};
// static insert method
farmSchema.statics.insert = async function( name, id) {

  const exists = await this.findOne({ id })

  if (exists) {
    throw Error('Record Already Inserted')
  }

  const post = await this.create({name, id})

  return post
}

farmSchema.statics.incrementTapperCount = async function( farm_id ) {

  const filter = { farm_id: farm_id };
  // const update = increment;
  try {
    const doc = await this.findOneAndUpdate(filter, { $inc: { tappercount: 1 } },{
      new: true
    });
    return doc;
  } catch (error) {
    return error.message;
  }
}

farmSchema.statics.decrementTapperCount = async function (farm_id) {
  const filter = { farm_id: farm_id };

  try {
    const doc = await this.findOneAndUpdate(
      filter,
      { $inc: { tappercount: -1 } }, // Decrement by 1
      { new: true }
    );
    return doc;
  } catch (error) {
    return error.message;
  }
};

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
