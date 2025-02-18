import Redis from "ioredis";

const redisClient=new Redis({
    port:process.env.REDIS_PORT,
    host:process.env.REDIS_HOST,
    password:process.env.REDIS_PASSWORD
})

redisClient.on('connect',()=>{
    console.log('redis connected')
})

redisClient.on('error',()=>{
    console.log('redis error')
})

export default redisClient;