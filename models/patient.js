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
        required: true,
    } ,
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "B+", "AB+", "O+", "AB-"],
        required : true,
    },
    allergies: {
        type: String,
    },
    medications : {
        type: String,
    }
});

export const patient = mongoose.model("patient", PatientSchema);