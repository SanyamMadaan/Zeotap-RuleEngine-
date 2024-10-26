require('dotenv').config();
const DATABASE_URL=process.env.DATABASE_URL;
const mongoose=require('mongoose');

console.log('database url is '+DATABASE_URL);
mongoose.connect(DATABASE_URL)
.then(()=>console.log('Connected to Database'))
.catch(err=>console.log('Error while connecting to database: ',err));