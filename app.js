var http = require('http');
var mongoose = require('mongoose');
const config = require('./config/database');
var Test = require('./models/test_model');
var Mark = require('./models/mark_model');
var Task = require('./models/task_model');
var Timetable = require('./models/timetable_model');
var Student = require('./models/student_model');

mongoose.connect(config.database, { useMongoClient: true});
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});


//create a server object:

http.createServer(function (req, res) {
  const { headers, method, url } = req;

  let body = [];

  req.on('data', (chunk) => {
    //body.push(chunk);
  }).on('error', (err) => {
  // This prints the error message and stack trace to `stderr`.
    console.error(err.stack);
  }).on('end', () => {
    //body = Buffer.concat(body).toString();
    // at this point, `body` has the entire request body stored in it as a string
  });

  res.writeHead(200, {'Content-Type': 'application/json'})
  url_def = url.substring(0, url.indexOf('?'));
  console.log(url_def)

  // /auth?1232424
  switch (url_def) {
    case "/auth":
      value = url.substring(url.indexOf('?')+1,url.length);
      name = "uid"
      var query = {};
      query[name] = value;
      Student.find(query ,(err, name) => {
        if(err) {
          resdb = {success: "false", msg: name}
          const responseBody = { headers, method, url, resdb }
          res.write(JSON.stringify(responseBody),function(err) {
            res.end();
          });
        } else {
          resdb = {success: "true", msg: name}
          const responseBody = { headers, method, url, resdb}
          res.write(JSON.stringify(responseBody),function(err) {
            res.end();
          })
      }})

    break;
    case "/tasks":
      value = url.substring(url.indexOf('?')+1,url.length);
      name = "subject"
      var query = {};
      query[name] = value;
      Task.find(query ,(err, name) => {
        if(err) {
          resdb = {success: "false", msg: name}
          const responseBody = { headers, method, url, resdb }
          res.write(JSON.stringify(responseBody),function(err) {
            res.end();
          });
        } else {
          resdb = {success: "true", msg: name}
          const responseBody = { headers, method, url, resdb}
          res.write(JSON.stringify(responseBody),function(err) {
            res.end();
          })
      }})

      break;
    case "/marks":
      value = url.substring(url.indexOf('?')+1,url.length);
      name = "subject"
      var query = {};
      query[name] = value;
      Mark.find(query, (err, name) => {
        if(err) {
          resdb = {success: "false", msg: name}
          const responseBody = { headers, method, url, resdb }
          res.write(JSON.stringify(responseBody),function(err) {
            res.end();
          });
        } else {
          console.log(value)
          resdb = {success: "true", msg: name}
          const responseBody = { headers, method, url, resdb}
          res.write(JSON.stringify(responseBody),function(err) {
            res.end();
          });
        }
      });
      break;
    case "/timetables":
    value = url.substring(url.indexOf('?')+1,url.length);
    name = "room"
    var query = {};
    query[name] = value;
    Timetable.find(query, (err, name) => {
      if(err) {
        resdb = {success: "false", msg: name}
        const responseBody = { headers, method, url, resdb }
        res.write(JSON.stringify(responseBody),function(err) {
          res.end();
        });
      } else {
        resdb = {success: "true", msg: name}
        const responseBody = { headers, method, url, resdb}
        res.write(JSON.stringify(responseBody),function(err) {
          res.end();
        });
      }
    });
    break;
    default:
      res.status(404).send("Oh uh, something went wrong");
    break;
  }


  //res.write(JSON.stringify(responseBody));
  // Note: the 2 lines above could be replaced with this next one:
  // response.end(JSON.stringify(responseBody))

  // MANAGE DB QUERIES

}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
