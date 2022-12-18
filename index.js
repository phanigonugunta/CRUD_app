const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const fs = require("fs");
const bodyParser = require("body-parser");
const internal = require("stream");
const morgan = require("morgan");
const app = express();
const port = 80;

mongoose.connect('mongodb://127.0.0.1:27017/crud', { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error",()=>{console.log("error in connection")});
db.once("open",()=>{console.log("connected to database")});

// app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

const crudschema = new mongoose.Schema({
    myid: Number,
    myname: String,
    mymail: String,
    mygender: String,
    mystatus: String
});

const crudmodel = mongoose.model("crud", crudschema);

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

app.use('/static/main/assets/bootstrap/css',express.static('static/main/assets/bootstrap/css'));
app.use('/static/main/assets/bootstrap/js',express.static('static/main/assets/bootstrap/js'));
app.use('/static/main/assets/css',express.static('static/main/assets/css'));
app.use('/static/main/assets/img',express.static('static/main/assets/img'));

app.use('/static/new/assets/bootstrap/css',express.static('static/new/assets/bootstrap/css'));
app.use('/static/new/assets/bootstrap/js',express.static('static/new/assets/bootstrap/js'));
app.use('/static/new/assets/css',express.static('static/new/assets/css'));

app.use('/static/update/assets/bootstrap/css',express.static('static/update/assets/bootstrap/css'));
app.use('/static/update/assets/bootstrap/js',express.static('static/update/assets/bootstrap/js'));
app.use('/static/update/assets/css',express.static('static/update/assets/css'));

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

// mongoose.set('strictQuery', true);

app.get("/", async (req, res) => { 
    
    try{
        const resu = await crudmodel.find();

        app.locals.users = resu;
        // res.json(resu.id);
    }catch(err){
        return res.send('Error ' + err)
     
     }
    
    res.render('main.ejs');
    
});

app.get("/new", (req, res) => {    
    res.render('new.ejs');
});

app.post("/new", (req, res) => {
    

    name1 = req.body.myname;
    mail = req.body.mymail;
    // const formf = require("./views/new.ejs")
    // mygender = formf.gen;
    // mystatus = formf.sts;
    status1 = req.body.formCheck1;
    gender = req.body.formCheck3;

    const login1 = new crudmodel({ myname: name1, mymail:mail, mygender:gender, mystatus:status1});
    const logged = login1.save();

    res.render('new.ejs');
});


app.get("/main", async (req, res) => {    
    try{
        const resu = await crudmodel.find();
        // res.json(resu[1].mystatus);
        app.locals.users = resu;
    }catch(err){
        return res.send('Error ' + err)
     
     }
    
    res.render('main.ejs');
});

app.get("/noupdate", async (req, res) => {    
    try{
        const resu = await crudmodel.find();
        // res.json(resu[1].mystatus);
        app.locals.users = resu;
    }catch(err){
        return res.send('Error ' + err)
     
     }
    
    res.render('main.ejs');
});

app.get("/update/:id", async (req, res) => {

    try{
        const resu = await crudmodel.findById(req.params.id);
        app.locals.users = resu;
        res.render('update.ejs');
    }catch(err){
        return res.send('Error ' + err)
     
     }
});

app.post("/update/:id", async (req, res) => {
    
    try{
        const alien = await crudmodel.findById(req.params.id);
        console.log(req.params.id);
        alien.myname = req.body.myname10;
        alien.mymail = req.body.mymail10;
        alien.mygender = req.body.formCheck310;
        alien.mystatus = req.body.formCheck110;
        const a1 = await alien.save();
        res.redirect("/main");
    }catch(err){
        res.send('Error');
    }
});

app.get("/delete1/:id", async (req, res) => {

    const id = req.params.id;

    crudmodel.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.redirect("/main");
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
        
});

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});