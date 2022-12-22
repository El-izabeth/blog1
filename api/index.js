const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./routes/auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
}).then(()=>console.log("DB connection successful!")).catch(err=>console.log(err));

app.use(express.json()); 
app.use(cors());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);

app.listen(8800,()=>{
    console.log("Backend server running...");
});