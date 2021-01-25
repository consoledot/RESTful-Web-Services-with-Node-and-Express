
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const db = require("./db")
const port = process.env.PORT || 3000
const bookRouter = express.Router()
const Book = require("./models/bookModel")
db.connect("mongodb://localhost/bookAPI")

bookRouter.route("/books") 
    .get((req,res)=>{

        res.json({hello:req.query.name, age:req.query.age})
    })

app.use("/api", bookRouter)

app.get("/", (req,res)=>{
    res.send("Welcome to my API")
})

app.listen(port, ()=>{
    console.log("Running on port " + port)
})