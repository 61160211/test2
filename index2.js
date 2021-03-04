const express = require('express')
const app = express()

app.use(express.json())
let books = []

// POST /books
app.post('/books', (req, res) => {
    //input
    let newTitle = req.body.title
    let newPrice = req.body.price
    let newUnit = req.body.unit
    let newIsbn = req.body.isbn
    let newImage = req.body.image_url

    // key: value
    let newBook = {
        title: newTitle,
        price: newPrice,
        unit: newUnit,
        isbn: newIsbn,
        image_url: newImage,
    }

    let bookID = 0

    //process
    books.push(newBook)

    //n-1
    bookID = books.length - 1

    //output

    res.status(201).json(bookID)
})

app.get('/books/:id', (req, res) => {
    //input
    let id = req.params.id

    let book = {}

    //process
    book = books[id]

    //output
    res.status(200).json(book)
})

const port = 3000
app.listen(3000, () => console.log(`Server started at ${port}`))