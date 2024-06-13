require('dotenv').config();
const express = require('express');
 const app = express();
 const cors = require("cors");
 const connetion =require("./database/db.js")
 const userRoutes = require('./routes/user.js');
 const authRoutes = require('./routes/auth.js');
 


//Database connection
connetion();

 //middleware
 app.use(express.json());
 app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

 const port = process.env.port ||3000 
 app.listen(port,()=>{
    console.log(`Lisiting on port ${port}...`);
 })

