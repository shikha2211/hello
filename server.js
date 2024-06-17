const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); //This line tells Express to parse JSON data in incoming requests.

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})

// const books = [
//     {
//         id: 1,
//         author: 'Stephen King',
//         title: 'Safari'
//     }
// ];

//let books = [];

const database = {
    books: [ // This array will be initialized for PUT condition when we have to edit the book details
        // {
        //     "id": 1,
        //     "title": "Network and Mobile Communication",
        //     "author": "Theodore Rappaport",
        //     "year": 2003
        // }
    ]
};

//Get a single book
app.get('/books/:id', (req, res) => {
    const booknum = parseInt(req.params.id);
    const book = database.books.find(b => b.id === booknum);
    console.log(booknum,book);
    if (!book) {
        res.status(404).send('Book not found!');
    }
    else {
        res.json(book);
    }

});

//Get all books
app.get('/books', (req, res) => {
    const allBooks = res.json(database.books);
    console.log(allBooks);
});

//Add a book
app.post('/books', (req, res) => {
    console.log('Received request to add book:', req.body);
    const books = req.body;
    database.books.push(books);
    res.status(201).send("Book added");
});

//Update a book
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const newTitle = req.body.title;

    const book = database.books.find(book => book.id === bookId);

    if (book) {
        console.log("Details:" + book);
        book.title = newTitle;
        res.send('Book title updated!')
    }
    else {
        console.log("Details not found here:" + book);
        res.status(404).send('Book not found here !')
    }
});

//Delete a book
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = database.books.findIndex(b => b.id === bookId);
    if(bookIndex > -1){
        database.books.splice(bookIndex, 1);
        res.status(204).send("Book deleted");
    }
    else{
        res.status(404).send("Book not found here!")
    }
})

// This code does a few things:

// Imports the Express module
// Creates an Express application
// Sets up a basic route (/) that sends ‘Hello World!’ when accessed
// Tells the application to listen on port 3000