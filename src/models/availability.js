import { Schema, model } from "mongoose";

const doctorAvailSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "DoctorDetail",
    required: true,
  },
  dayAndTimeSlots: [
    {
      day: String,
      timeSlot: String,
    },
  ],
});

const AvailData = model("AvailData", doctorAvailSchema);

export default AvailData;
