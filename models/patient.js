import {mongoose, Schema} from "mongoose";

const PatientSchema = new Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "B+", "AB+", "O+", "AB-"],
    },
    allergies: {
        type: String,
    },
    medicalConditions: {
        type: String,
    }
  
});

export const Patient = mongoose.model("Patient", PatientSchema);