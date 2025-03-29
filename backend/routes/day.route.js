
import express from 'express';
import { isLogin } from './../middlware/auth.middleware.js';
import { addDay } from '../middlware/day.middleware.js';
const Router= express.Router();

Router.route("/Day")
.post(isLogin, addDay)


export default Router;