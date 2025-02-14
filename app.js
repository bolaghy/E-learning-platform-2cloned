require('dotenv').config()
const express = require('express');
const { mongoose } = require('mongoose');
const courseRouter = require('./Routers/courseRouter')
const authRouter = require('./Routers/authRouter')
//const authMiddleware = require('./Middleware/authMiddleware')
const PORT = process.env.port || 3000
const api = process.env.api

const app = express()

  
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies


app.use(`${api}`,  courseRouter)
app.use(`${api}`,  authRouter)


const start = async ()=> {
    try {
        await mongoose.connect(process.env.dataBaseString)
        app.listen(PORT, ()=>{ 
        console.log(`server is listening and connected to DB on port http://localhost:${PORT}${api}`) 
})
    } catch (error) {
        console.log(error);    
    }
}          
start ();  

