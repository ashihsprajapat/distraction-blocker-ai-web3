

import Subject from './../modle/subject.model.js';
import User from './../modle/user.modle.js';


export const addSubject = async (req, res) => {
    const { name } = req.body;
    const userId= req.user._id;
    try {
        if(!name)
            return res.json({message:"name is requierd"})

        const exist= await Subject.find({name: {$eq: name}});

        if(exist.length >0){
            return res.json({message:"subect exist already  "})
        }
        const user= await User.findById(userId);
        if(!user)
            return res.json({message:"user not found"})
        
        const subject = new Subject({ name });
        await subject.save();
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ message: 'Error creating subject', error });
    }
};
