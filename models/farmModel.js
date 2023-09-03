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
  marketprice1: {
    type: Number,
    default: 0,
  },
  marketprice2: {
    type: Number,
    default: 0,
  },
  marketprice3: {
    type: Number,
    default: 0,
  },
  marketprice4: {
    type: Number,
    default: 0,
  },
  marketprice5: {
    type: Number,
    default: 0,
  },
  totalweight: {
    type: Number,
    default: 0,
  },
  pricesold: {
    type: Number,
    default: 0,
  },
  tappercount: {
    type: Number,
    default: 0,
  },
  firestoneprice: {
    type: Number,
    default: 0,
  },
  manual_buyingprice: {
    type: Number,
    default: 0,
  },
  using: {
    type: String,
    default: 'none', // Default string value set to 'none'
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
      using: "5 average"
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
      buyingprice: firestoneprice,
      using: "firestone",
    };

    let farmToUpdate = await this.findOneAndUpdate(filter, update, {
      new: true
    });

    return farmToUpdate; // Return the updated farms
  } catch (error) {
    throw new Error(error.message);
  }
};

farmSchema.statics.update3 = async function(farm_id, manual_buyingprice) {
  try {
    // Find farms with the given farm_id
    const filter = { farm_id: farm_id };
    const update = {
      manual_buyingprice: manual_buyingprice,
      buyingprice: manual_buyingprice,
      using: "manual price",
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
