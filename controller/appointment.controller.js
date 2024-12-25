import mongoose from "mongoose";
import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";

export const bookAppointment = async (req, res) => {
    try {
        const { date, userId, description } = req.body;
        const isPatient = await User.findOne({ _id: userId });
        if (isPatient?.role === "patient") {
            if (date && userId && description) {
                const booked = await Appointment.create({ date, userId, description });
                if (booked)
                    return res.status(200).json({ message: "Appointment Booked", data: booked, status: true })
                return res.status(400).json({ message: "Something went wrong...", status: false })
            }
            else {
                return res.json({ message: "All Fields Required...", status: false })
            }
        }
        else {
            return res.status(400).json({ message: "Only Patient Can Book Appointment..", status: false })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", status: false });
    }
}

export const deleteAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAppointment = await Appointment.findByIdAndDelete({ _id: id })
        if (deletedAppointment)
            return res.status(200).json({ message: "Products Deleted", data: deletedAppointment, status: true })
        return res.status(400).json({ message: "Something went wrong..", status: false })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", status: false });
    }
}

export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user_details",
                },
            }
        ]);
        if (appointments?.length) {
            return res.status(200).json({ message: "Appointments Found", total: appointments?.length, data: appointments, status: true })
        }
        return res.status(400).json({ message: "Something went wrong..", data: null, status: false })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", status: false });
    }
}
export const getAppointmentsById = async (req, res) => {
    const { id } = req.params;

    try {
        const appointments = await Appointment.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(id) },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user_details",
                },
            },
        ]);

        if (appointments?.length) {
            return res.status(200).json({
                message: "Appointments Found",
                total: appointments.length,
                data: appointments,
                status: true,
            });
        }

        return res.status(404).json({
            message: "No appointments found for the specified user",
            data: null,
            status: false,
        });
    } catch (error) {
        console.log('✌️error --->', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            status: false,
        });
    }
};
