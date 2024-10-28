const express=require('express');
const cors=require('cors');
require('dotenv').config();
const ruleRoutes=require('./routes/rules');
require('./db');
const PORT=process.env.PORT||3000;

const app=express();

app.use(cors({
    origin: 'https://zeotap-rule-engine-44r1.vercel.app', // Use your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allows cookies or auth headers if needed
}));

app.use(express.json());

app.use('/api/rules',ruleRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost/${PORT}`);
})
