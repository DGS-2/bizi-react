const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FlightSchema = new Schema({
  commander: { id: Schema.Types.ObjectId },
  chief: { id: Schema.Types.ObjectId },
  oic: { id: Schema.Types.ObjectId },
  sections: [{
    name: String,
    oic: { id: Schema.Types.ObjectId },
    chief: { id: Schema.Types.ObjectId },
    teams: [{
      name: String,
      ncoic: { id: Schema.Types.ObjectId },
      members: [{ id: Schema.Types.ObjectId }]
    }]
  }]
})

module.exports = FlightSchema = mongoose.model('flight', FlightSchema)