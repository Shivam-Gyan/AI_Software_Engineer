import express from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";

const UserAuthRouter = new express.Router();


UserAuthRouter
    .post('/register',
        body('email').isEmail().withMessage('Enter valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 character long'),
        userController.createUser)
    .post('/login',
        body('email').isEmail().withMessage('Enter valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 character long'),
        userController.loginUser)

export default UserAuthRouter;