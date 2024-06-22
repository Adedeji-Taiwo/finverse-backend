const mongoose = require("mongoose");

const waitListSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  feature: {
    type: String,
    required: true,
  },
  alternative: {
    type: String,
    required: true,
  },
  others: {
    type: String,
  },
  success: {
    type: String,
    required: true,
  },
  pricing: {
    type: String,
    required: true,
  },
  premium: {
    type: String,
    required: true,
  },
});

waitListSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const WaitList = mongoose.model("WaitList", waitListSchema);

module.exports = WaitList;
