var express = require("express")
var bodyparser = require("body-parser")
var mongoose = require("mongoose")

const app=express()
app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/moneylist')
var db = mongoose.connection
db.on('error',() => console.log("Error in Connecting to the Database"))
db.once('open',() => console.log("Connected to  Database"))

app.post("/add", (req,res)=>{
    var category_select = req.body.category_select
    var amount_input = req.body.amount
    var info = req.body.info
    var date_input = req.body.date_input

    var data={
        "Category": category_select,
        "Amount": amount_input,
        "Info": info,
        "Date": date_input
    }
    db.collection('users').insertOne(data,(err,collection) =>{ 
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")

    })          
})    
app.get("/",(req,res) =>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(5000)    

console.log("listening on port 5000")