const express = require('express');
const router = express.Router();
const books = require('./booksdb.js');


// Get the book list available in the shop
router.get('/',function (req, res) {
    res.send(JSON.stringify({books}, null, 4));
 });
 

// Get book details based on ISBN
router.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
    });
    

// Get book details based on author
router.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const filteredData = Object.values(books).filter(e => e.author === author);
    res.send(filteredData)
});    



// Get all books based on title
router.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const filteredData = Object.values(books).filter(e => e.title === title);
    res.send(filteredData)
});


//  Get book review
router.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});


// Sign in as Customer
router.post("/",(req,res)=>{
    users.push({"firstName":req.query.firstName,"lastName":req.query.lastName,"ph_no":req.query.ph_no,"email":req.query.email});
    res.send("The user /n" + (req.query.firstName) + (req.query.lastName) + "has been added!")
}); 


module.exports=router;