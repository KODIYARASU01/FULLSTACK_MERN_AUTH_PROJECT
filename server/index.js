import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

let PORT=process.env.PORT ||5000;

let app=express();

app.get('/',(req,res)=>{
    res.send('Server is working')
})

app.listen(PORT,()=>{
    console.log(`Server running ${PORT} port number`)
});

