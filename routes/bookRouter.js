const express = require("express")

function routes(Book){
    const bookRouter = express.Router()
    bookRouter.route("/books") 
    .post((req,res)=>{
        const book = new Book(req.body)
        book.save()
        return res.status(201).json({data:book})
    })
    .get((req,res)=>{
        const query = {}
        if(req.query.genre){
            query.genre = req.query.genre
        }
        Book.find(query, (err,books)=>{
            if(err){
                return res.json({Error:err})
            }
            return res.json({data:books})
        })
    })
    bookRouter.use("/books/:bookId", (req, res, next)=>{
        Book.findById(req.params.bookId,(err,book)=>{
            if(err){
                return res.json({Error: err})
            }
            if(book){
                req.book = book
                return next()
            }
            return res.sendStatus(404)
        })
    })
    bookRouter.route("/books/:bookId")
    .get((req,res)=> res.json(req.book))
    .put((req,res)=>{
            const {book} = req
            book.title = req.body.title
            book.authour = req.body.authour
            book.genre = req.body.genre
            book.read = req.body.read
            book.save()
            return res.json({data:book})
        })
    .patch((req, res)=>{
        const {book} = req
        if(req.body._id){
            delete req.body._id
        }
        Object.entries(req.body).forEach((item)=>{
            const key = item[0]
            const value = item[1]
            book[key] = value
        })
    })
    return bookRouter
}

module.exports = routes