const DATABASE_URL=process.env.DATABASE_URL;
const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(DATABASE_URL)
.then(()=>console.log('Connected to Database'))
.catch(err=>console.log('Error while connecting to database: ',err));