const express =require("express")
const path=require("path")
const app=express();
const bcrypt = require('bcrypt');
let users={}
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.set("view engine","ejs")
function auth (req,res,next){
    res.render("register")
    next()
}
app.post("/register",(req,res)=>{
    if(req.body.password==req.body.confirm_password){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                users.password=hash
                users.username=req.body.username;
                users.email=req.body.email

                res.redirect("/login")
            });
        });    

    }

    
 })
 app.get("/login",(req,res)=>{
    
    res.render("login")
 })
 app.post("/login",(req,res)=>{
    bcrypt.compare(req.body.password,users.password, function(err, result) {
        res.redirect("/home")
    
})
 })
app.get("/",auth,(req,res)=>{
    
   res.render("index")
})
app.get("/home",(req,res)=>{
    
    res.render("index",{users})
 })
app.get("/home/:username",(req,res)=>{
    res.render("error")
 })
app.listen(3000)
