var http = require('http');
var mongoose = require('mongoose');
var config = require('./config/database');
var Mark = require('./models/mark_model');
var Task = require('./models/task_model');
var Timetable = require('./models/timetable_model');
var Student = require('./models/student_model');
var utils = require('./utils')

var uid = null;

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

  res.setHeader('Access-Control-Allow-Origin', '*');
  [url_def,array,from_now] = utils.parseURL(url)

  switch (url_def) {

    case "/auth":
      auth(res,url)
    break;

    case "/logout":
      logout(res)
    break;

    case "/tasks":
      tasks(res,array,from_now)
    break;

    case "/marks":
      marks(res,array,from_now)
    break;

    case "/timetables":
      timetables(res,array,from_now)
    break;

    default:
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.end("The URL specified does not exist");
    break;
  }

}).listen(process.env.PORT || 3000);

// ------------------------------------------------ //
// --------------- API FUNCTIONS ------------------ //
// ------------------------------------------------ //

function auth(res,url){
  if(uid == null){
    value = url.substring(url.indexOf('?')+1,url.length);
    name = "uid"
    var query = {};
    query[name] = value;
    Student.find(query ,(err, docs) => {
      if(err) {
        res.writeHead(401, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(err),function(err) {
          res.end();
        });
      } else {
        uid = value;
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(docs),function(err) {
          res.end();
        })
    }})
  }
  else{
    console.log("Ya has iniciado sesión!")
    res.end()
  }
}

function logout(res){
  res.writeHead(200, {'Content-Type': 'application/json'})
  uid = null
  res.end()
}

function tasks(res,array,from_now){

  tasksOrMarks(res,array,from_now,"tasks",Task)
}

function marks(res,array,from_now){
  tasksOrMarks(res,array,from_now,"marks",Mark)
}

function tasksOrMarks(res,array,from_now,caller,model){
  res.writeHead(200, {'Content-Type': 'application/json'})
  var limit = 0;
  var gt,lt,lte,gte;
  var query = {};
  query["uid"] = uid
  for (i = 0; i < array.length; i++){

    var values = array[i].split("=");
    var field = values[0]
    var value = values[1]

    option = field.substring(field.indexOf('[')+1,field.indexOf(']'))
    if(value == "now") value = utils.formatDate(new Date())
    console.log("k")
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
  if (from_now) value = utils.formatDate(new Date())

  var dbquery = model.find(query,(err,docs) => {
    if(err) {
      res.write(JSON.stringify(err),function(err) {
        res.end();
      });
    } else {
      res.write(JSON.stringify(docs),function(err) {
        res.end();
      });
    }
  })
  if (limit) dbquery.limit(parseInt(limit))
  if (gt) dbquery.where(gtfield.substring(0,gtfield.indexOf('['))).gt(gt).sort({date: 1})
  if (from_now && caller=="tasks") dbquery.where("date").gt(value).sort({date: 1})
  if (lt) dbquery.where(ltfield.substring(0,ltfield.indexOf('['))).lt(lt).sort({date: 1})
  if (gte) dbquery.where(gtefield.substring(0,gtefield.indexOf('['))).gte(gte).sort({date: 1})
  if (lte) dbquery.where(ltefield.substring(0,ltefield.indexOf('['))).lte(lte).sort({date: 1})
  if (caller = "marks") dbquery.sort({subject: 1})
  dbquery.exec()
}

async function timetables(res,array,from_now){
  res.writeHead(200, {'Content-Type': 'application/json'})
  var dbquery_repeat,dbquery_today
  var limit = 0;
  var gt,lt,lte,gte;
  var query = {};
  query["uid"] = uid
  for (i = 0; i < array.length; i++){

    var values = array[i].split("=");
    var field = values[0]
    var value = values[1]

    option = field.substring(field.indexOf('[')+1,field.indexOf(']'))

    if(field.indexOf("day[") >= 0 ) {
      field = "day_number["
      if(value!="now") value = utils.parseDay(value)
      else value = (new Date()).getDay()
    }else if(value=="now" && field.indexOf("day") >= 0 ){
      field = "day_number"
      value = (new Date()).getDay()
    }

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
      console.log("!!!!!!!!!!!!!!!!!" + gt)
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
    value_hour = utils.formatHour(date)
    query_today = await Timetable.find(query, (err, docs) => {
      if(err) {
        resdb = {success: "false", msg: docs}
        const responseBody = { headers, method, url, resdb }
        res.write(JSON.stringify(responseBody),function(err) {
          res.end();
        });
      } else {
        dbquery_today=docs
      }
    }).where("day_number").equals(value_day)
    .sort({hour: 1}).where("hour").gte(value_hour)
    //QUERY TO REPEAT THE DAYS
    query_repeat = await Timetable.find(query, (err, docs) => {
      if(err) {
        resdb = {success: "false", msg: docs}
        const responseBody = { headers, method, url, resdb }
        res.write(JSON.stringify(responseBody),function(err) {
          res.end();
        });
      } else {
        dbquery_repeat = docs
      }
    }).sort({day_number: 1}).sort({hour: 1}).where("day_number").lt(value_day)

    query_repeat_hour = await Timetable.find(query, (err, docs) => {
     if(err) {
       resdb = {success: "false", msg: docs}
       const responseBody = { headers, method, url, resdb }
       res.write(JSON.stringify(responseBody),function(err) {
         res.end();
       });
     } else {
       dbquery_today_hour=docs
     }
   }).where("day_number").equals(value_day)
   .sort({hour: 1}).where("hour").lt(value_hour)

  }
  var dbquery = Timetable.find(query, (err, docs) => {
    if(err) {
      resdb = {success: "false", msg: docs}
      const responseBody = { headers, method, url, resdb }
      res.write(JSON.stringify(responseBody),function(err) {
        res.end();
      });
    } else {
      if(from_now){
        query_result = query_result.concat(dbquery_today, docs, dbquery_repeat,dbquery_today_hour)
        if(limit) {
          query_result = query_result.slice(0,limit)
        }
      }
      else query_result = docs
      res.write(JSON.stringify(query_result),function(err) {
        res.end();
      });
    }
  }).sort({day_number: 1}).sort({hour: 1})

  if (limit && !from_now) dbquery.limit(parseInt(limit))
  if (gt) dbquery.where(gtfield.substring(0,gtfield.indexOf('['))).gt(gt).sort({day_number: 1})
  if (from_now) {
    dbquery.where("day_number").gt(value_day).sort({day_number: 1})
  }
  if (lt) dbquery.where(ltfield.substring(0,ltfield.indexOf('['))).lt(lt).sort({day_number: 1})
  if (gte) dbquery.where(gtefield.substring(0,gtefield.indexOf('['))).gte(gte).sort({day_number: 1})
  if (lte) dbquery.where(ltefield.substring(0,ltefield.indexOf('['))).lte(lte).sort({day_number: 1})
}
