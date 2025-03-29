import mongoose, { Schema, model } from 'mongoose'
import User from './user.modle.js';

const weekSchema = new Schema({


    weekStartDate: { type: String, required: true },
    days: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Day'
    }]
});

const Week = model('Week', weekSchema);
export default Week;