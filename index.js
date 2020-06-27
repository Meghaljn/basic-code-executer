var express=require('express');
const app = express();
const http = require('http');

const fs = require('fs');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const port=8081;
var os = require("os");


app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(bodyParser.text());

app.post('/',function(req,res){

  // const book = req.body;
  // console.log(book.code);
 // pythonfile = book.code;
  pythonfile = req.body;
  fs.writeFile('test.py', pythonfile, function (err,data) {
    if (err) {
     res.error(err);
     return;
    }

  });
  exec('test.py', (error, stdout, stderr) => {
    if (error) {
      res.write(stderr);
      res.write(" File is not in python!! ");
      res.send();
      return ;
    }
    
    res.write(`stdout: ${stdout}`);
    res.send();
    return ;
    
  });


})

 app.listen(port, () => console.log(`Example app listening on port ${port}!`))