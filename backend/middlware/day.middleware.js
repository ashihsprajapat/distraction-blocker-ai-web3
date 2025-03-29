
import User from "../modle/user.modle.js";
import Subject from './../modle/subject.model.js';

export const addDay = async (req, res) => {
    const { date } = req.body;
    const user= req.user;
    try {
        const sunjectData= await Subject.find({})
        const day = new Day({ user:user._id,date, subjects: subjectsData });
        await day.save();

        // Update the Week model if needed (this can be done later as per requirement)
        res.status(201).json(day);
    } catch (error) {
        res.status(400).json({ message: 'Error creating day', error });
    }
};