const express = require("express");
const bodyparser = require ("body-parser");
const app = express(); //it is required type the const app which is the one used to creste a whole express app which is the representation of express
const cors = require("cors");
const env =require("dotenv");
const conn =  require("./config");
const sql = require("mssql");
const bee = require("bcrypt");



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


const conn2 = {"name": 'development',
"server":'localhost',
"port": 1433,
"database" : 'test',
"user": 'remote',
"password" : 'jalap4'
}

async function sql_run(req, res, command){
    //req.body
    //let cred = req.body;
    const pool = new sql.ConnectionPool(conn2);
    //const pool = new sql.ConnectionPool(conn.databases);
    pool.on("error", err => {console.log(err)});
    //pool.on("success", succ => {console.log(succ)}
    try{
        await pool.connect()
        let result = await pool.request().query(command);

        
        return {
            "success": result
        };
    }
    catch (err){
        console.log(err);
        return err;
    }
    finally{
        pool.close();
    }
};

app.get('/', function(req, res){ //Its an endpoint that will respond to the request done in it, according to the '/' and the place put there
    res.send("HelloWorld");
});

app.post('/insert', function(req, res){//EndPoint to insert data
    let cred = req.body;
    let command = `insert into users(username, pass, email) values ('${cred.user}', '${hash}', '${cred.email}')`;
    sql_run(req, res, command);
    //res.send(sql_run());

    //res.send("DataInserted");
});

app.post('/read', function(req, res){//EndPoint to delete data
    let cred = req.body;
    let command = `select * from users`;
    sql_run(req, res, command);
});

app.post('/delete', function(req, res){//EndPoint to delete data
    let cred = req.body;
    let command = `delete from users where id = ${cred.id}`;
    sql_run(req, res, command);
    //res.send(sql_run());

    //res.send("DataInserted");
});

app.post('/update', function(req, res){//EndPoint to delete data
    let cred = req.body;
    let command = `update users set ${cred.column} = ${cred.finder} where ${cred.ident} = ${cred.ident}`;
    sql_run(req, res, command);
    //res.send(sql_run());

    //res.send("DataInserted");
});

app.post('/register', function(req, res){
    let cred = req.body;
    bee.hash(cred.pass, 10, async function(err, hash){
        let command = `insert into users(username, pass, email) values ('${cred.user}', '${hash}', '${cred.email}')`;
        sql_run(req, res, command);
    });//Everything has to pass through this to encrypt it(#10 the way and times it will be mixing up)
});

app.post('/login', async function(req, res){
    let cred = req.body;
    let command = `findUser '${cred.user}'`;
    let result = await sql_run (req, res, command);
    let comp = await bee.compare(cred.pass, result.success.recordset[0].pass, function (err, _res) {
        if (_res == true){
            if (result.recordset.lenght < 0){
                res.send('USER NOT FOUND');
            }else{
                let _u = result.recordset[0];
            }
        }
    })
    console.log=(result);
    res.send(result);
    //res.send(comp);
});


const port = process.env.PORT||3000;
app.listen(port,()=> {
    //console.log("App is runnning on port:" + Port)
    console.log(`App is runnning on port: ${port}`);
});//It is for the requests to listen to this program




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



    
