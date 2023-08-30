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

farmSchema.statics.updateFarm1 = async function(farm_id, marketprice1, marketprice2, marketprice3, marketprice4, marketprice5, buyingprice) {
  try {
    // Find farms with the given farm_id
    const farmsToUpdate = await this.find({ farm_id });

    // Update each farm's market prices and buying price
    for (const farm of farmsToUpdate) {
      farm.marketprice1 = marketprice1;
      farm.marketprice2 = marketprice2;
      farm.marketprice3 = marketprice3;
      farm.marketprice4 = marketprice4;
      farm.marketprice5 = marketprice5;
      farm.buyingprice = buyingprice;

      await farm.save(); // Save the updated farm
    }

    return farmsToUpdate; // Return the updated farms
  } catch (error) {
    throw new Error(error.message);
  }
};

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
