//Reference code : https://github.com/eagarcia8/fastApp/blob/master/index.js

const express = require("express");
const app = express();

const mongoose = require("mongoose");

// type in your credentials link from mongoDB website
const credentials = "mongodb+srv://userInfo:test1234@nodejs-practise-tbbvn.mongodb.net/test?retryWrites=true";
const bodyParser = require("body-parser");

let http = require("http").Server(app);

app.use("/saveMessage", express.static("./Client"));

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
  timestamp : Number,
});

//Model lets us create a new database with the name messages and only allows the messageSchema
//message let messageModel = new mongoose.model("collectionName(as in your mongoDB database user/etc-case sensitive)",messageSchema);
let messageModel = new mongoose.model("message",messageSchema);



//POST handler
app.post("/",(req,res)=>{
  let dataReceived = req.body.userNumber;
  let dataToSend= {
    message : dataReceived
  };
  console.log(dataReceived);
  let date = new Date();
  console.log(date.getTime());
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
  let allMessages;
  console.log(date.getTime());
  let newMessage = new messageModel({
        user: req.body.user,
        message: req.body.message,
        timestamp: date.getTime()
  });
    //saving the message.model to the database
    newMessage.save((error)=>{
      if (error) {
          console.log("There was an issue with Mongoose", error)
          res.sendStatus(500);
      }else {
          console.log("Document saved");
          // database of search queries functions in mongoDB:
          //https://mongoosejs.com/docs/queries.html

          // Search in your database in MongoDB for the match that fits the search query and return an array for the answer: eg look for "Hi!" string in all "message" properties
              // messageModel.find({message:"Hi!"},(error, results)=>{
              //   console.log(results.toString());
              // });
          // Search in your database in MongoDB for the match that fits the search query and return an array for the answer: eg look for any that starts with "H" string in all "message" properties
              // messageModel.find({message:/^h/},(error, results)=>{
              //   console.log(results);
              // });
          //  use | to find "or" additional statement
              messageModel.find({message:/^h|H|W/},(error, results)=>{
                console.log(results);
                // search for specific id for a entry in the database
                allMessages = results;
                console.log(allMessages[3]._id);
                let objectToDelete = allMessages[3]._id;
                messageModel.findByIdAndDelete(objectToDelete, (error,results)=>{
                  console.log(error, results);
                  console.log("The 4th item in the database was deleted!");

                });
              });
          res.sendStatus(200);
      }
    });

});
