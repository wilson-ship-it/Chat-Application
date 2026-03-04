import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoutes from './routes/AuthRoutes.js'
import contactsRoute from './routes/ContactRoutes.js'
import setupSocket from './socket.js'
import messagesRoutes from './routes/MessagesRoutes.js'
import channelRoutes from './routes/ChannelRoutes.js'

dotenv.config();

const app=express();
const port=process.env.PORT || 3001;
const databaseURL= process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true,// to enable or get cookies from frontend we also want creadentials true
}));

app.use("/uploads/profiles",express.static("uploads/profiles"));
app.use("/uploads/files",express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json()); //to have our data in json format that we are getting from frontend (bpdy/payload)

app.use("/api/auth",authRoutes)
app.use("/api/contacts",contactsRoute)
app.use("/api/messages",messagesRoutes);
app.use("/api/channel",channelRoutes);

const server=app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});

setupSocket(server);

mongoose.connect(databaseURL).then(()=>console.log("DB connected"))
.catch((err)=>console.log(err.message));