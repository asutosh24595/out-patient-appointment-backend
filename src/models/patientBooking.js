import { Schema, model } from "mongoose";

const patientDataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  doctorConsulting: {
    type: String,
    required: true,
  },
  dayOfAppointment: {
    type: String,
    required: true,
  },
  timeOfAppointment: {
    type: String,
    required: true,
  }
});

const PatientData = model("PatientData",patientDataSchema);

export default PatientData;