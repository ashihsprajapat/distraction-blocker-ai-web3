import mongoose, { Schema, model } from 'mongoose'

const sessionSchema = new Schema({

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject', required: true
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true } // Duration in minutes
});

const Session = model('Session', sessionSchema);
export default Session;