const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

var api=require('./routes/api.js');

var port=3000;
var app = express();


// app.use(express.static(path.join(__dirname, '../public')))
app.use(cors());
app.use(bodyParser.json());

app.use('/',api);
app.listen(port,(err) => {
    if (err) {
        throw err
    }
    console.log('server started on port 3000');
});
module.exports=app;
