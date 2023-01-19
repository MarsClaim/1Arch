const express = require("express");
const bodyparser = require ("body-parser");
const app = express(); //it is required type the const app which is the one used to creste a whole express app which is the representation of express
const cors = require("cors");
const env =require("dotenv");

env.config({
    path:"./env.env",
})

app.use(cors());
app.use(bodyparser.json({
    limit:"100mb"
}));
//"*"All means that it will be applied to everything within the app, it gonna affect everything there
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
}); //node uses to use just one thread, but it is used next it help to to different requests in case it stucks on the first thread
//body tends to go the info which will be used to control and header to show to user


app.get('/', function(req, res){ //Its an endpoint that will respond to the request done in it, according to the '/' and the place put there
    res.send("HelooWorld");
});

app.get('/home', function(req, res){ 
    res.send("Mikasa");
}); //It will be stuck at this point  cuz since the very first requestot was not made the next action for it to follow onto the next request


app.get("/add", function(req, res){
    let n1=1;
    let n2=2;
    result= n1 + n2;
    res.send(result);
});

app.get("/sub", function(req, res){
    let n1=1;
    let n2=2;
    result= n1 - n2;
    res.send(result);
});

app.get("/mul", function(req, res){
    let n1=1;
    let n2=2;
    result= n1 * n2;
    res.send(result);
});

app.get("/div", function(req, res){
    let n1=1;
    let n2=2;
    result= n1 / n2;
    res.send(result);
});
const db =[{
    username:"Villa1",
    password:"password123",
},
{
    username:"Villa2",
    password:"password456",
},
{
    username:"Villa3",
    password:"password789",
},
];


app.post("/newuser", function(req, res){
    let user = req.body;
    db.push(user);
    res.send(db);
});

app.delete("/deleteuser", function(req, res){
    let user = req.body;
    db.splice(0, 1);
    res.send(db);
});

app.put("/updateuser", function(req, res){
    let user = req.body;
    db.splice(0, 1);
    res.send(db);
});

app.get("/getallusers", function(req, res){
    res.send(db);
});
const port = process.env.PORT||3000;
app.listen(port,()=> {
    //console.log("App is runnning on port:" + Port)
    console.log(`App is runnning on port: ${port}`);
});//It is for the requests to listen to this program



    
