import mongoose, { Schema, model } from 'mongoose'
import Subject from './subject.model.js';
import Week from './week.model.js';

const daySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    subjects: [{
        subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
        sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }]
    }],

});

const Day = model('Day', daySchema);
export default Day;
