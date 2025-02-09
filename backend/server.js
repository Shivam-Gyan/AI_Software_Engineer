// .env variable configuration 
import 'dotenv/config'

import http from 'http';
import app from "./app.js"
import db from './database/database.config.js';
// import redisClient from './database/redis.config.js';


db();


const port=process.env.PORT || 8080

const server=http.createServer(app);


server.listen(port,()=>{
    console.log(`server running at ${port}`);
})