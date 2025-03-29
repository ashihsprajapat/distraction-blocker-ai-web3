import mongoose,{Schema, model} from 'mongoose'
import User from './user.modle';

const groupSchema = new Schema({
    groupName: { 
        type: String, 
        required: true 
    },
    admin: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', // Assuming you have a User model to reference
        required: true 
    },
    groupMembers: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' // Array of User references
    }],
    createDate: { 
        type: Date, 
        default: Date.now 
    },
    chatAll: { 
        type: Boolean, 
        default: true  // true means everyone can chat, false means only specific users can
    },
    chatAdmit: { 
        type: Boolean, 
        default: false  // true means admin can admit members, false means no one can
    },
    image: { 
        type: String,  // URL or path to the image file (you can store this as a string)
        default: null   // If no image, this will be null
    },
    chat_message:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ]
});

const Group = model('Group', groupSchema);
export default Group;
