const express = require("express");
const dotnev = require('dotenv');
const  mongoose  = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
dotnev.config()


const app = express();
const port = process.env.PORT || 3001
app.use(bodyParser.json());

routes(app);



mongoose.connect(`mongodb+srv://Longson2003s:${process.env.MONGODB}@cluster0.khyqnu8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    console.log('Connect Db successfully')
})
.catch((err) => {
    console.log('Error connecting failed')
})
app.listen(port , ()=> {
     console.log('Sever is running on port', + port); 
});