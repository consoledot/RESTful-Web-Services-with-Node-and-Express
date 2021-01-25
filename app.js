
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()
const db = require("./db")
const port = process.env.PORT || 3000
const Book = require("./models/bookModel")
const bookRouter = require('./routes/bookRouter')(Book)

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
db.connect("mongodb://localhost/bookAPI")


app.use("/api", bookRouter)

app.get("/", (req,res)=>{
    res.send("Welcome to my API")
})

app.listen(port, ()=>{
    console.log("Running on port " + port)
})