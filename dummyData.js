import { faker } from "@faker-js/faker";
import connectDb from "./src/config.js";
import DoctorDetail from "./src/models/doctorDetail.js";
import { config } from "dotenv";
import AvailData from "./src/models/availability.js";
config();

console.log(process.env);

(async () => {
  await connectDb();
})();

const generateDummyData = async (count) => {
  try {
    for (let i = 0; i < count; i++) {
      const doctor = new DoctorDetail({
        name: faker.person.fullName(),
        speciality: faker.helpers.arrayElement([
          "Cardiology",
          "Pediatrics",
          "Orthopedics",
          "Neurology",
          "Gynecology",
          "ENT",
          "General Medicine",
        ]),
        qualifications: faker.helpers.arrayElement(["MBBS", "MD", "MS"]),
        experience: faker.number.int({ min: 1, max: 30 }),
        languagesSpoken: faker.helpers.arrayElements(
          ["English", "Spanish", "French"],
          faker.number.int({ min: 1, max: 3 })
        ),
        appointmentFees: faker.number.int({ min: 50, max: 100 }),
        ratings: faker.number.int({ min: 3, max: 5 }),
      });

      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const timeSlots = [
        "17:00-17:15",
        "17:15-17:30",
        "17:30-17:45",
        "17:45-18:00",
        "18:00-18:15",
        "18:15-18:30",
        "18:30-18:45",
        "18:45-19:00",
        "19:00-19:15",
        "19:15-19:30",
        "19:30-19:45",
        "19:45-20:00",
        "20:00-20:15",
        "20:15-20:30",
        "20:30-20:45",
        "20:45-21:00",
      ];

      const doctorAvailability = new AvailData({
        doctorId: doctor._id,
        dayAndTimeSlots: daysOfWeek.flatMap((day) =>
          timeSlots.map((timeSlot) => ({ day, timeSlot }))
        ),
      });

      await doctor.save();
      await doctorAvailability.save();
    }
    console.log(`Successfully generated dummy data.`);
  } catch (err) {
    console.error("Error generating dummy data:", err);
  }
};

generateDummyData(20);
