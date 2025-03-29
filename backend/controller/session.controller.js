
import Session from "../modle/session.model.js";
import Subject from './../modle/subject.model.js';

export const addSession = async (req, res) => {
    const { subjectId, startTime, endTime } = req.body;
    try {
        if (!subjectId || !startTime || !endTime) {
            return res.json({ message: "All details are required" })
        }
        const start = new Date(startTime);
        const end = new Date(endTime);
        const duration = (end - start) / 60000; // Convert milliseconds to minutes

        const session = new Session({ subject: subjectId, startTime: start, endTime: end, duration });
        await session.save();



        // Find the subject and update total study time
        const subject = await Subject.findById(subjectId);
        console.log(subject)
        subject.totalStudy += duration;
        subject.sessions.push(session._id);
        await subject.save();

        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ message: 'Error creating session', error });
    }

}


