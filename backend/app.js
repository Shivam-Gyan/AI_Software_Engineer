import express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import UserAuthRouter from './routes/user.auth.route.js';
import cookieParser from 'cookie-parser';
import projectRouter from './routes/project.router.js';


// creating express instance variable app
const app=express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/api/user',UserAuthRouter);
app.use('/api/project',projectRouter);

export default app;


