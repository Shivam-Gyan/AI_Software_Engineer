// .env variable configuration 
import 'dotenv/config'

import http from 'http';
import app from "./app.js"
import db from './database/config/database.config.js';
import { Server } from 'socket.io';
import cors from 'cors'

import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import projectModel from './model/project.model.js';
import userAuth from './model/user.auth.js';
import googleGeminiResponseServices from './database/services/google_ai_response.services.js';


// import redisClient from './database/redis.config.js';


db();


const port = process.env.PORT || 8080

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});



// socket io middleware
io.use(async (socket, next) => {

    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(" ")[1];
        const projectId = socket.handshake.query.projectId

        if (!mongoose.Types.ObjectId.isValid(projectId)) {

            return next(new Error("Not valid Project Id"));
        }

        socket.project = await projectModel.findOne({ _id: projectId })

        if (!token) {
            return next(new Error("Not Authorized"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return next(new Error("Not Authorized"));
        }

        socket.user = decoded;
        next();

    } catch (error) {
        next(error);
    }
})

io.on('connection', (socket) => {

    console.log("connected", socket.user.email, socket.project._id)

    socket.roomId = socket.project._id.toString()

    socket.join(socket.roomId);


    socket.on('project-message', async (data) => {

        const userdata = await userAuth.findOne({ _id: data.sender });

        const formated = {
            message: data.message,
            user:userdata,
            time: new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        }
        socket.broadcast.to(socket.roomId).emit('project-message', formated)

        const message=data.message;
        const aipresentInMessage=message.includes('@ai')

        if(aipresentInMessage){

            const prompt=message.replace("@ai","")

            const result=await googleGeminiResponseServices.geminiResponse(prompt)

            io.to(socket.roomId).emit("project-message",{
                message:result,
                user:{
                    _id:'ai',
                    name:"gemini",
                    email:"gemini@ai"
                },
                time:new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
            })

            return;
        }



    })

    // socket.on('event',(data)=>{})
    socket.on("disconnect", () => {
        socket.leave(socket.roomId)
    })
})


server.listen(port, () => {
    console.log(`server running at ${port}`);
})