import express from "express";
import { isLogin } from './../middlware/auth.middleware.js';
import { addSubject } from './../controller/subject.controller.js';
const Router = express.Router();


Router.route("/subject-add")
.post(isLogin, addSubject)



export default Router;