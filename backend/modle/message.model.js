import mongoose,{Schema, model} from 'mongoose'
import User from './user.modle';

const chatSchema = new Schema({
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Assuming you have a User model
        required: true 
    },
    receiver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Assuming you have a User model
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    message: { 
        type: String, 
        required: true 
    }
});

// To sort messages by date when querying
chatSchema.index({ date: 1 });

const Chat  = mongoose.model('Chat', chatSchema);
export default Chat;
