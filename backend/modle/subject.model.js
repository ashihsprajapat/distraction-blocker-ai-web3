import mongoose,{Schema, model} from 'mongoose'
import Session from './session.model.js';
import Day from './day.model.js';

const subjectSchema = new Schema({
    name: { type: String, required: true },
    day:{type:Schema.Types.ObjectId,
        ref:'Day',
    },
    totalStudy: { type: Number, default: 0 }, // Total study time in minutes
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    }]
});

const Subject =model('Subject', subjectSchema);

export default Subject;