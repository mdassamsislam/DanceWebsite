const express = require("express")
const app = express()
const path = require("path")
const port = 80;
// getting-started with mongoose
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
//Defining Mongoose Schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,

});
//Mongoose Model
const Contact = mongoose.model('Contact', contactSchema);

//Express Specific Stuf
app.use("/static", express.static("static"))
app.use(express.urlencoded())

//PUG specific stuff
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//Endpoints
// ENDPOINTS
app.get('/', (req, res) => {
  const params = {}
  res.status(200).render('home.pug');
})
app.get('/contact', (req, res) => {
  const params = {}
  res.status(200).render('contact.pug', params);
})


// You must have method="post" and action="/contact" in the form.
app.post('/contact', (req, res) => {
  var myData = new Contact(req.body)
  myData.save()
    .then(() => {
      res.send("This data has been saved to the database.")
    }).catch(() => { res.status(400).send("Item was not saved to the database!") })
  // res.status(200).render('home.pug', params);
})
//This post request created a collection named -> contacts.
//Use db.contacts.find() to view received data :)



//Start the server
app.listen(port, () => {
  console.log("Port started on 80...");
});