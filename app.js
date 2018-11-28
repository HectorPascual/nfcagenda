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
      uid = url.substring(url.indexOf('?')+1,url.length);
      Student.find({uid : /^uid/} ,(err, name) => {
        if(err) {

          console.log(uid)
          resdb = {success: "false", msg: name}
          const responseBody = { headers, method, url, resdb }
          res.write(JSON.stringify(responseBody),function(err) {
            res.end();
          });
        } else {
          console.log(uid)

          resdb = {success: "true", msg: name}
          const responseBody = { headers, method, url, resdb}
          res.write(JSON.stringify(responseBody),function(err) {
            res.end();
          })
      }})

    break;
    case "/tasks":
      /*test = {
        test: '1'
      }*/

    /*  var user = new Test({
          _id: new mongoose.Types.ObjectId(),
          user: "Hector"
      });

      user.save(function(err) {
        if (err) throw err;
        else console.log("added succesfully")
      })

*/
      Test.find({user : "Hector"}, (err, user) => {
        if(err) {

          console.log(user)
          resdb = {success: "false", msg: user}
          const responseBody = { headers, method, url, resdb }
          res.write(JSON.stringify(responseBody),function(err) {
            res.end();
          });
        } else {
          console.log(user)

          resdb = {success: "true", msg: user}
          const responseBody = { headers, method, url, resdb}
          res.write(JSON.stringify(responseBody),function(err) {
            res.end();
          });
        }
      });

      break;
    case "/test2":
      test = {
        test: '2'
      }
      break;
    default:
      test = {
        test: '0'
      }
  }

  //res.write(JSON.stringify(responseBody));
  // Note: the 2 lines above could be replaced with this next one:
  // response.end(JSON.stringify(responseBody))

  // MANAGE DB QUERIES

}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
