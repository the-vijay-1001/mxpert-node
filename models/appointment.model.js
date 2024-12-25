import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.
            Schema.Types.
            ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

export const Appointment = mongoose.model("Appointment", AppointmentSchema);