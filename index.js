const express = require("express");
const app = express();

const mongoose = require("mongoose");

// type in your credentials link from mongoDB website
const credentials = "mongodb+srv://userInfo:test1234@nodejs-practise-tbbvn.mongodb.net/test?retryWrites=true";
const bodyParser = require("body-parser");

let http = require("http").Server(app);

app.use("/", express.static("./"));

const PORT = 3000;
http.listen(PORT);
app.use("/",express.static("./Client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
console.log("Express server is now runnin on port 3000!");

//connect and display on console if it connected or not
mongoose.connect(credentials, (error)=>{
    if (error) {
      console.log("fail to connect to database", error);
    }else {
      console.log("successfully connected to database");
    }
});

 //Copies JS Promise to mongoose
mongoose.Promise = global.Promise;

// create a variable that is shorter so you dont have to type mongoose.conection all the time
let db = mongoose.connection;

//turning on the connection and showing errors   if there is
db.on("error", console.error.bind(console,"MongoDB connection error:"));

//Grab a copy of the Mongoose schema class
let Schema = mongoose.Schema;

//Customizes our empty class into a custom class and stored in mySchema
let messageSchema = new mongoose.Schema({
  // "_id": Schema.Types.ObjectId, //its always _id for mongo DB
  user : String,
  message : String,
  time : Number,
});

//Model lets us create a dew database with the name messages and only allows the messageSchema
let messageModel = new mongoose.model("message",messageSchema);


app.post("/",(req,res)=>{
  let dataReceived = req.body.userNumber;
  let dataToSend= {
    message : dataReceived
  };
  console.log(dataReceived);
  let date = new Date();
  let newMessage = new messageModel({
        user: req.body.user,
        message: req.body.message,
        timestamp: date.getTime()
  });
    newMessage.save((error)=>{
      if (error) {
          console.log("There was an issue with Mongoose", error)
          res.sendStatus(500);
      }else {
          console.log("Document saved");
          res.sendStatus(200);
      }
    });

});

app.post("/saveMessage", (req, res) => {
  let date = new Date();
  let newMessage = new messageModel({
        user: req.body.user,
        message: req.body.message,
        timestamp: date.getTime()
  });
    newMessage.save((error)=>{
      if (error) {
          console.log("There was an issue with Mongoose", error)
          res.sendStatus(500);
      }else {
          console.log("Document saved");
          res.sendStatus(200);
      }
    });
});
