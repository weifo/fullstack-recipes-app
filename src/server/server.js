const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const bodyParser=require('body-parser');
var cors = require('cors');
const Catalog =require('./models/Catalog');

const app = express();
app.use(cors());
// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/recipes',require('./routes/api/recipes'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/category',require('./routes/api/catalog'))

// app.get('/catalog/:catalog_id',(req,res)=>{
//   query='/catalog/'+req.params.catalog+'/'
//   Catalog.find({'catalog':query})
//   .then(data=>res.json(data))
//   .catch(err=>console.log(err))
//   // console.log(req.params.catalog_id)
// })
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));