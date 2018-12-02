var http = require('http');
var mongoose = require('mongoose');
const config = require('./config/database');
var Test = require('./models/test_model');
var Mark = require('./models/mark_model');
var Task = require('./models/task_model');
var Timetable = require('./models/timetable_model');
var Student = require('./models/student_model');

var uid = "DEF123";
var i

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
  var from_now = false;
  var array = []

  if(url.indexOf('?') >= 0){
    url_def = url.substring(0, url.indexOf('?'));
    array = url.substring(url.indexOf('?')+1,url.length).split("&");
  }
  else {
    url_def = url

    from_now = true
  }

  switch (url_def) {
    case "/auth":
      res.writeHead(200, {'Content-Type': 'application/json'})
      if(uid == null){
        value = url.substring(url.indexOf('?')+1,url.length);
        console.log(uid)
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
            uid = value;
            res.write(JSON.stringify(name),function(err) {
              res.end();
            })
        }})
      }
      else{
        console.log("Ya has iniciado sesión!")
      }
    break;

    case "/logout":
      res.writeHead(200, {'Content-Type': 'application/json'})
      uid = null
      console.log(uid)
    break;

    case "/tasks":
      res.writeHead(200, {'Content-Type': 'application/json'})
      var limit = 0;
      var gt,lt,lte,gte;
      var query = {};
      query["uid"] = uid
      for (i = 0; i < array.length; i++){

        var values = array[i].split("=");

      //  console.log(values)
        var field = values[0]
      //  console.log(field)
        var value = values[1]
      //  console.log(value)
        option = field.substring(field.indexOf('[')+1,field.indexOf(']'))
        if(value == "now") value = formatDate(new Date())

        if(field=="limit"){
          limit = value;
        }
        else if (option.indexOf("gte") >= 0) {
          var gtefield = field
          gte = value;
        }
        else if (option.indexOf("gt") >= 0) {
          var gtfield = field
          gt = value;
        }
        else if (option.indexOf("lte") >= 0) {
          var ltefield = field
          lte = value;
        }
        else if (option.indexOf("lt") >= 0) {
          var ltfield = field
          lt = value;
        }
        else{
          query[field] = value;
          console.log(query)
        }
      }
      if (from_now) value = formatDate(new Date())
      //  find({published: true}).sort({'date': -1}).limit(20);
        var dbquery = Task.find(query ,(err, name) => {
          if(err) {
            resdb = {success: "false", msg: name}
            const responseBody = { headers, method, url, resdb }
            res.write(JSON.stringify(responseBody),function(err) {
              res.end();
            });
          } else {
            res.write(JSON.stringify(name),function(err) {
              res.end();
            })
        }})
        if (limit) dbquery.limit(limit)
        if (gt) dbquery.where(gtfield.substring(0,gtfield.indexOf('['))).gt(gt).sort({date: 1})
        if (from_now) dbquery.where("date").gt(value).sort({date: 1})
        if (lt) dbquery.where(ltfield.substring(0,ltfield.indexOf('['))).lt(lt).sort({date: 1})
        if (gte) dbquery.where(gtefield.substring(0,gtefield.indexOf('['))).gte(gte).sort({date: 1})
        if (lte) dbquery.where(ltefield.substring(0,ltefield.indexOf('['))).lte(lte).sort({date: 1})

    break;
    case "/marks":
    res.writeHead(200, {'Content-Type': 'application/json'})
    var limit = 0;
    var gt,lt,lte,gte;
    var query = {};
    for (i = 0; i < array.length; i++){

      var values = array[i].split("=");

    //  console.log(values)
      var field = values[0]
    //  console.log(field)
      var value = values[1]
    //  console.log(value)
      option = field.substring(field.indexOf('[')+1,field.indexOf(']'))
      if(field=="limit"){
        limit = value;
      }
      else if (option.indexOf("gte") >= 0) {
        var gtefield = field
        gte = value;
      }
      else if (option.indexOf("gt") >= 0) {
        var gtfield = field
        gt = value;
      }
      else if (option.indexOf("lte") >= 0) {
        var ltefield = field
        lte = value;
      }
      else if (option.indexOf("lt") >= 0) {
        var ltfield = field
        lt = value;
      }
      else{
        query[field] = value;
        console.log(query)
      }
    }
      var dbquery = Mark.find(query, (err, name) => {
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
          res.write(JSON.stringify(name),function(err) {
            res.end();
          });
        }
      });

      if (limit) dbquery.limit(limit)
      if (gt) dbquery.where(gtfield.substring(0,gtfield.indexOf('['))).gt(gt).sort({date: 1})
      if (lt) dbquery.where(ltfield.substring(0,ltfield.indexOf('['))).lt(lt).sort({date: 1})
      if (gte) dbquery.where(gtefield.substring(0,gtefield.indexOf('['))).gte(gte).sort({date: 1})
      if (lte) dbquery.where(ltefield.substring(0,ltefield.indexOf('['))).lte(lte).sort({date: 1})
      break;

    case "/timetables":
    res.writeHead(200, {'Content-Type': 'application/json'})
    var limit = 0;
    var gt,lt,lte,gte;
    var query = {};
    query["uid"] = uid
    for (i = 0; i < array.length; i++){

      var values = array[i].split("=");

    //  console.log(values)
      var field = values[0]
    //  console.log(field)
      var value = values[1]
    //  console.log(value)
      option = field.substring(field.indexOf('[')+1,field.indexOf(']'))
      if(value == "now") value = formatDate(new Date())
      if(field=="limit"){
        limit = value;
      }
      else if (option.indexOf("gte") >= 0) {
        var gtefield = field
        gte = value;
      }
      else if (option.indexOf("gt") >= 0) {
        var gtfield = field
        gt = value;
      }
      else if (option.indexOf("lte") >= 0) {
        var ltefield = field
        lte = value;
      }
      else if (option.indexOf("lt") >= 0) {
        var ltfield = field
        lt = value;
      }
      else{
        query[field] = value;
        console.log(query)
      }
    }
    var query_result = []
    if (from_now) {
      var date = new Date()
      value_day = date.getDay()
      value_hour = formatHour(date)
      console.log("!!" + value_day + "!!" + value_hour)
      var dbquery_today = Timetable.find(query, (err, name) => {
        if(err) {
          resdb = {success: "false", msg: name}
          const responseBody = { headers, method, url, resdb }
          res.write(JSON.stringify(responseBody),function(err) {
            res.end();
          });
        } else {
          query_result.push(name)

        }
      }).where("day_number").equals(value_day)
      .sort({hour: 1}).where("hour").gte(value_hour)

    }
    var dbquery = Timetable.find(query, (err, name) => {
      if(err) {
        resdb = {success: "false", msg: name}
        const responseBody = { headers, method, url, resdb }
        res.write(JSON.stringify(responseBody),function(err) {
          res.end();
        });
      } else {
        query_result.push(name)
        res.write(JSON.stringify(query_result),function(err) {
          res.end();
        });
      }
    });
    if (limit) dbquery.limit(limit)
    if (gt) dbquery.where(gtfield.substring(0,gtfield.indexOf('['))).gt(gt).sort({date: 1})
    if (from_now) {
      dbquery.where("day_number").gt(2).sort({day_number: 1})
      //if(query_result.length)
    //  dbquery.where("hour").gt(value_hour).sort({hour: 1})
    }
    if (lt) dbquery.where(ltfield.substring(0,ltfield.indexOf('['))).lt(lt).sort({date: 1})
    if (gte) dbquery.where(gtefield.substring(0,gtefield.indexOf('['))).gte(gte).sort({date: 1})
    if (lte) dbquery.where(ltefield.substring(0,ltefield.indexOf('['))).lte(lte).sort({date: 1})
    break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.end("The URL specified does not exist");
    break;
  }


  //res.write(JSON.stringify(responseBody));
  // Note: the 2 lines above could be replaced with this next one:
  // response.end(JSON.stringify(responseBody))

  // MANAGE DB QUERIES

}).listen(3000);

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formatHour(date){
  str = ("0" + date.getHours()).slice(-2) + ":" +
   ("0" + date.getMinutes()).slice(-2)
   return str
}



console.log('Server running at http://127.0.0.1:3000/');
