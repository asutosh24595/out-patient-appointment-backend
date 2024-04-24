import express from "express";
import DoctorDetail from "../models/doctorDetail.js";
import AvailData from "../models/availability.js";

const router = express.Router();

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await DoctorDetail.find();
    res.send(doctors);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/doctors/:doctorId", async (req, res) => {
  try {
    const doctor = await DoctorDetail.findById(req.params.doctorId);
    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }
    res.send(doctor);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/doctors/:doctorId/availability", async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await AvailData.findOne({ doctorId });
    if (!doctor) {
      return res.status(404).send("Doctor availability not found");
    }
    res.send(doctor);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/bookAppointment", async (req, res) => {
  try {
    const reqBody = req.body;
    const doctorData = await DoctorDetail.findOne({
      name: req.body.doctorConsulting,
    });
    if (!doctorData) {
      return res.status(404).send("Doctor not found");
    }
    const docAvail = await AvailData.findOne({ doctorId: doctorData._id });
    if (!docAvail) {
      return res.status(404).send("Doctor availability data not found");
    }

    if (
      !docAvail.dayAndTimeSlots.some(
        (slot) =>
          slot.day === req.body.dayOfAppointment &&
          slot.timeSlot === req.body.timeOfAppointment
      )
    ) {
      return res.status(400).send("Appointment time slot is not available");
    }

    await AvailData.findOneAndUpdate(
        { doctorId: doctorData._id },
        { $pull: { dayAndTimeSlots: { day: req.body.dayOfAppointment, timeSlot: req.body.timeOfAppointment } } }
    );

    res.send("Appointment booked successfully");

  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
