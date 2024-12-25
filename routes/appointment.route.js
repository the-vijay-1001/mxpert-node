import exrpess from "express"
import { authentication } from "../middleware/authentication.js";
import { bookAppointment, deleteAppointmentById, getAppointments, getAppointmentsById } from "../controller/appointment.controller.js";

const router = exrpess.Router()

router.post("/book", authentication, bookAppointment);

router.get("/appointments", authentication, getAppointments);

router.delete("/delete/:id", authentication, deleteAppointmentById);

router.get("/appointment-by-id/:id", authentication, getAppointmentsById);


export default router;