const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()

app.use(express.json())
let books = []

const url = 'mongodb+srv://superadmin:nine28032543@cluster0.ze6xk.mongodb.net/sample_book?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true})
let db, booksConllection

async function connect() {
    await client.connect()
    db = client.db('sample_book')
    booksConllection = db.collection('books')
}
connect()


app.get('/books', async(req, res) => {
    //input

    //process
    const cursor = await booksConllection.find({})
    const result = await cursor.toArray()

    //output
    res.status(200).json(result) 
})

app.get('/books/:id', async(req, res) => {
    //input
    let id = req.params.id

    //process
    const book = await booksConllection.findOne({ _id: ObjectId(id) })


    //output
    res.status(200).json(book) 
})
// POST movies//
app.post('/books', async(req, res) => {
    //input
    let newtitle = req.body.title
    let newprice = req.body.price
    let newunit = req.body.unit
    let newisbn = req.body.isbn
    let newimageurl = req.body.imageurl

    //key: value
    let newBook = {
        title: newtitle,
        price: newprice,
        unit: newunit,
        isbn: newisbn,
        imageurl: newimageurl

    }
    let bookID = 0

    //process
    const result = await booksConllection.insertOne(newBook)
    // movies.push(newMovie)
    // //n-1
    // movieID = movies.length - 1
    bookID = result.insertedId

    //output
    res.status(200).json(bookID)
})

const port = 3000
app.listen(port, () => console.log(`Server started again at ${port}`))