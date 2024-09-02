import express from 'express';
import createServer from './framework/config/server';
import { connectDB } from './framework/config/connectDB';
import path from 'path';
import http from 'http';
import { config } from 'dotenv';
config();



const startServer = async()=>{
  try {
    await connectDB();
    const app = createServer();
   
    const server = http.createServer(app);
    const port = process.env.PORT;

    server?.listen(port,()=>{
      console.log('server is running at port ',port);
    });
  } catch (error) {
    console.log(error);
  }
}
startServer();
// const app = express();
// app.use(express.json());
// app.post('/user/signup',(req,res)=>{
//   console.log(req.body);
//   console.log('hello')
//   res.json({hello:'hello'})
// })

// app.listen(3000,()=>{
//   console.log('server is running')
// })