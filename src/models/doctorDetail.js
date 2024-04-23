import { Schema, model } from "mongoose";

const doctorDetailsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  qualifications: {
    type: Array,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  languagesSpoken: {
    type: Array,
    required: true,
  },
  appointmentFees: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
});

const DoctorDetail = model("DoctorDetail", doctorDetailsSchema);

export default DoctorDetail;
