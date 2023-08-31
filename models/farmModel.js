const mongoose = require('mongoose')

const Schema = mongoose.Schema

const farmSchema = new Schema({
  farm_id: {
    type: String,
    required: true,
  },
  buyingprice: {
    type: Number,
    required: false,
  },
  marketprice1:{
    type: Number,
    require: false,
  },
  marketprice2:{
    type: Number,
    require: false,
  },
  marketprice3:{
    type: Number,
    require: false,
  },
  marketprice4:{
    type: Number,
    require: false,
  },
  marketprice5:{
    type: Number,
    require: false,
  },
  totalweight:{
    type: Number,
    require: false,
  },
  pricesold:{
    type: Number,
    require: false,
  },
  tappercount:{
    type: Number,
    require: false,
  },
  firestoneprice:{
    type: Number,
    require: false,
  },
  manual_buyingprice:{
    type: Number,
    require: false,
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

farmSchema.statics.update1 = async function(farm_id, marketprice1, marketprice2, marketprice3, marketprice4, marketprice5, buyingprice) {
  try {
    // Find farms with the given farm_id
   

    const filter = { farm_id: farm_id };
    const update = {
      marketprice1: marketprice1,
      marketprice2: marketprice2,
      marketprice3: marketprice3,
      marketprice4: marketprice4,
      marketprice5: marketprice5,
      buyingprice: buyingprice,
    };

    let farmToUpdate = await this.findOneAndUpdate(filter, update, {
      new: true
    });


    return farmToUpdate; // Return the updated farms
  } catch (error) {
    throw new Error(error.message);
  }
};

farmSchema.statics.update2 = async function(farm_id, firestoneprice) {
  try {
    // Find farms with the given farm_id
   

    const filter = { farm_id: farm_id };
    const update = {
      firestoneprice: firestoneprice,
    };

    let farmToUpdate = await this.findOneAndUpdate(filter, update, {
      new: true
    });


    return farmToUpdate; // Return the updated farms
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
