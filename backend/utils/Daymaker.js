
const dayMaker= async (req, res) => {
    const { date, subjectsData } = req.body; // subjectsData contains subject IDs and their sessions
    try {
        const day = new Day({ date, subjects: subjectsData });
        await day.save();

        // Update the Week model if needed (this can be done later as per requirement)
        res.status(201).json(day);
    } catch (error) {
        res.status(400).json({ message: 'Error creating day', error });
    }
};