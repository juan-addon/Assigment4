const { model, Schema } = require("mongoose");

const Appointment = new Schema({
  AppointmentDate: { type: String, required: true },
  Time: { type: String },
  IsTimeSlotAvailable: { type: Boolean },
});

module.exports = model("Appointment", Appointment);
