import express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import UserAuthRouter from './routes/user.auth.route.js';


// creating express instance variable app
const app=express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/user',UserAuthRouter)

export default app;


