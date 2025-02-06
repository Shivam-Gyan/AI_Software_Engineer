
import http from 'http';
import app from "./app.js"
import db from './database/database.config.js';

// .env variable configuration 
import 'dotenv/config';

db();


const port=process.env.PORT || 8080

const server=http.createServer(app);


server.listen(port,()=>{
    console.log(`server running at ${port}`);
})