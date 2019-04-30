const express = require("express");
const app = express();

let http = require ("http").Server(app);
const bodyParser = require("body-parser");
app.use("/", express.static("./"));

const PORT = 3000;
http.listen(PORT);
app.use("/",express.static("./Client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
console.log("Express server is now runnin on port 3000!");

app.post("/",(req,res)=>{
  let dataReceived = req.body.userNumber;
  let dataToSend= {
    message : dataReceived
  };
  console.log(dataReceived);
  res.send(dataToSend);
});

const mongoose = require("mongoose");

// type in your credentials link from mongoDB website
const credentials = "mongodb+srv://practiceUser:test1234@mongopractice-fk1ue.mongodb.net/test?retryWrites=true";

//connect and display on console if it connected or not
mongoose.connect(credentials, (error)=>{
    if (error) {
      console.log("fail to connect to database", error);
    }else {
      console.log("successfully connected to database");
    }
});

mongoose.Promise = global.Promise;

// create a variable that is shorter so you dont have to type mongoose.conection all the time
let db = mongoose.connection;

//turning on the connection and showing errors if there is
db.on("error", console.error.bind(console,"MongoDB connection error:"));

//Grab a copy of the Mongoose package class
let Schema = mongoose.Schema;

//Customizes our empty class into a custom class and stored in mySchema
let usersSchema = new mongoose.Schema({
  // "_id": Schema.Types.ObjectId, //its always _id for mongo DB
  "userId" : String,
  "firstName": String,
  "lastName": String,
  "age": Number,
  "isActive": Boolean,

});

let usersModel = new mongoose.model("user",usersSchema);

let myFirstUser = new usersModel(
  {
    userId: "TheGuest", // you can use " or no " for the keys
    "firstName": "Roberto",
    lastName : "Lafarious",
    age : 24,
    isActive:true,
  }
);

myFirstUser.save((error)=> {
  if (error) {
    console.log("there was an error saving your document",error);
  }else {
    console.log("Your document was successfully saved to the database!");

  }
});
