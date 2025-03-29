

import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import mognooseConnection from "./config/mongodb.js";

//user Router
import userAuth from "./routes/auth.routes.js"

//session Route
import SessionRoute from './routes/session.routes.js'

//subject route
import SubjectRouter from './routes/subject.routes.js'


///for cloudinary setUp
import cloudinaryConnection from "./config/cloudinary.connection.js";

import { server, app, io } from "./config/socket.js";

import path from 'path';


const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Allow credentials (cookies) to be sent
}));


app.use(express.json());

app.use(cookieParser());




const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

server.listen(PORT, () => {
    console.log("App is listing on port", PORT);
})

await mognooseConnection()
    .then(() => console.log("Connect to data base"))
//.catch((err)=>console.log(err))

await cloudinaryConnection()
    .then(() => console.log(" cloudinary setUp done"))

app.get("/", (req, res) => {
    res.send("ok working")
})

//router for authentication
app.use("/api/auth", userAuth)


//subject router
app.use('/api/subject', SubjectRouter);

// session Router
app.use("/api/session", SessionRoute);


//day route
import DayRouter from "./routes/day.route.js"
app.use("/api/day", DayRouter);




if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}