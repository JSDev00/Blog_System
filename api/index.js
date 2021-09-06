require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const categoryRouter = require('./routes/category');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
//Routes

app.get('/',(req,res)=>{
    res.send("Hello World")
})
//Connect to mongoDB
mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
        .then(()=>console.log("Connected to DB"))
        .catch((err)=>console.log(err));
//UPLOAD IMAGE TO SERVER
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})
const upload = multer({storage:storage});
app.post('/api/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("File has Been uplaoded");
});
//Run an app middlewares
app.use(express.json());
app.use('/images',express.static(path.join(__dirname,'/images')));
app.use(cors())
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/post',postRouter);
app.use('/api/category',categoryRouter);

//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("server is running now on port 5000"));