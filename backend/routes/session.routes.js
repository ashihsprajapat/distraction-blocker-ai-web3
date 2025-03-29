

import express from 'express';
import { isLogin } from '../middlware/auth.middleware.js';
import { addSession } from '../controller/session.controller.js';
const Router= express.Router();


Router.route("/add-session")
.post(isLogin, addSession)


export default Router;