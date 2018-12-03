var http = require('http');
var mongoose = require('mongoose');
var config = require('./config/database');
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


http.createServer(function (req, res) {
  const { url } = req;
  var from_now = false;
  var array = []
  var url_def

  [url_def,array,from_now] = parseURL(url)

  switch (url_def) {

    case "/auth":
      auth(res,url)
    break;

    case "/logout":
      logout(res)
    break;

    case "/tasks":
      tasks(res,array)
    break;

    case "/marks":
      marks(res,array)
    break;

    case "/timetables":
      timetables(res,array)
    break;

    default:
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.end("The URL specified does not exist");
    break;
  }

}).listen(process.env.PORT || 3000);

function auth(res,url){
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
}

function logout(res){
  res.writeHead(200, {'Content-Type': 'application/json'})
  uid = null
  res.end()
}

function tasks(res,array){
  res.writeHead(200, {'Content-Type': 'application/json'})
  var limit = 0;
  var gt,lt,lte,gte;
  var query = {};
  query["uid"] = uid
  for (i = 0; i < array.length; i++){

    var values = array[i].split("=");
    var field = values[0]
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

  var dbquery = Task.find(query)

  if (limit) dbquery.limit(parseInt(limit))
  if (gt) dbquery.where(gtfield.substring(0,gtfield.indexOf('['))).gt(gt).sort({date: 1})
  if (from_now) dbquery.where("date").gt(value).sort({date: 1})
  if (lt) dbquery.where(ltfield.substring(0,ltfield.indexOf('['))).lt(lt).sort({date: 1})
  if (gte) dbquery.where(gtefield.substring(0,gtefield.indexOf('['))).gte(gte).sort({date: 1})
  if (lte) dbquery.where(ltefield.substring(0,ltefield.indexOf('['))).lte(lte).sort({date: 1})
  dbquery.exec((res,name) =>
    if(err) {
      res.write(JSON.stringify(err),function(err) {
        res.end();
      });
    } else {
      res.write(JSON.stringify(name),function(err) {
        res.end();
      });
  })
}

function marks(res,array){
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
  var dbquery = Mark.find(query);

  if (limit) dbquery.limit(parseInt(limit))
  if (gt) dbquery.where(gtfield.substring(0,gtfield.indexOf('['))).gt(gt).sort({date: 1})
  if (lt) dbquery.where(ltfield.substring(0,ltfield.indexOf('['))).lt(lt).sort({date: 1})
  if (gte) dbquery.where(gtefield.substring(0,gtefield.indexOf('['))).gte(gte).sort({date: 1})
  if (lte) dbquery.where(ltefield.substring(0,ltefield.indexOf('['))).lte(lte).sort({date: 1})

  dbquery.exec((res,name) =>
    if(err) {
      res.write(JSON.stringify(err),function(err) {
        res.end();
      });
    } else {
      res.write(JSON.stringify(name),function(err) {
        res.end();
      });
  })
}
function timetables(res,array){
  res.writeHead(200, {'Content-Type': 'application/json'})
  var dbquery_repeat,dbquery_today
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
  var repeat_finished = 0;
  if (from_now) {
    var date = new Date()
    value_day = date.getDay()
    value_hour = formatHour(date)
    console.log("!!" + value_day + "!!" + value_hour)
    query_today = Timetable.find(query, (err, name) => {
      if(err) {
        resdb = {success: "false", msg: name}
        const responseBody = { headers, method, url, resdb }
        res.write(JSON.stringify(responseBody),function(err) {
          res.end();
        });
      } else {
        dbquery_today=name
      }
    }).where("day_number").equals(value_day)
    .sort({hour: 1}).where("hour").gte(value_hour)
    //QUERY TO REPEAT THE DAYS
    query_repeat = Timetable.find(query, (err, name) => {
      if(err) {
        resdb = {success: "false", msg: name}
        const responseBody = { headers, method, url, resdb }
        res.write(JSON.stringify(responseBody),function(err) {
          res.end();
        });
      } else {
        dbquery_repeat = name
      }
    }).sort({day_number: 1}).sort({hour: 1})

  }
  var dbquery = Timetable.find(query, (err, name) => {
    if(err) {
      resdb = {success: "false", msg: name}
      const responseBody = { headers, method, url, resdb }
      res.write(JSON.stringify(responseBody),function(err) {
        res.end();
      });
    } else {
      /*query_result.push(name)
      //filling the files of client
      query_result.push(dbquery_repeat)
      query_result.push(dbquery_repeat)*/

      query_result = query_result.concat(dbquery_today, name, dbquery_repeat)
      res.write(JSON.stringify(query_result),function(err) {
        res.end();
      });
    }
  });

  if (limit) dbquery.limit(parseInt(limit))
  if (gt) dbquery.where(gtfield.substring(0,gtfield.indexOf('['))).gt(gt).sort({day_number: 1})
  if (from_now) {
    dbquery.where("day_number").gt(2).sort({day_number: 1})
  }
  if (lt) dbquery.where(ltfield.substring(0,ltfield.indexOf('['))).lt(lt).sort({day_number: 1})
  if (gte) dbquery.where(gtefield.substring(0,gtefield.indexOf('['))).gte(gte).sort({day_number: 1})
  if (lte) dbquery.where(ltefield.substring(0,ltefield.indexOf('['))).lte(lte).sort({day_number: 1})
}

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

//create a server object:
function parseURL(url){
  var array = []
  if(url.indexOf('?') >= 0){
    url_def = url.substring(0, url.indexOf('?'));
    array = url.substring(url.indexOf('?')+1,url.length).split("&");
  }
  else {
    url_def = url
    from_now = true
  }
  return [url_def,array,from_now]
}
console.log('Server running at http://127.0.0.1:3000/');
