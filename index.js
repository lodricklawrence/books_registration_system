const { PrismaClient }=require('@prisma/client');
const prisma = new PrismaClient();

const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const bookDirectory=require('./booksDbdir');
const PORT=2000;

app.listen(PORT,()=>{
  console.log("server is listening on port "+PORT);
});

app.use(bodyParser.json());

// POST method for adding a book 
app.post('/addbooks',bookDirectory.addbook);

//GET method for getting allbooks
app.get('/allbooks',bookDirectory.allbooks);

// GET method for getting a book via its id
app.get('/idbooks/:id',bookDirectory.idbooks);

// PUT method for updating a book
app.put('/idbooks/:id',bookDirectory.updatebooks);

// DELETE method for deleting a book via its id
app.delete('/idbooks/:id',bookDirectory.deletebooks);




