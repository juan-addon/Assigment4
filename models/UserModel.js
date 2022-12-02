const { model, Schema } = require("mongoose");

const UserInfo = new Schema({
  userName: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String },
  userType: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  licenseNumber: { type: String },
  Age: { type: Number },
  carDetail: {
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    platno: { type: String },
  },
  timeSlot:{
    slotDate: {type: String},
    slotId: {type: String},
    slotTime: {type: String}
  }
});

module.exports = model("UserInfo", UserInfo);
