var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
if (err) throw err;

//------------------Create Collections--------------------------

var dbo = db.db("mydb");
dbo.createCollection("tasks", function(err, res) {
  if (err) throw err;
  console.log("Se ha creado la colección tasks!");
  db.close();
});

dbo.createCollection("timetables", function(err, res) {
  if (err) throw err;
  console.log("Se ha creado la colección timetables!");
  db.close();
});

dbo.createCollection("marks", function(err, res) {
  if (err) throw err;
  console.log("Se ha creado la colección marks!");
  db.close();
});

dbo.createCollection("students", function(err, res) {
  if (err) throw err;
  console.log("Se ha creado la colección students!");
  db.close();
});

  //------------------Insert--------------------------

    var myobj = [
  { uid: 'DEF123', name: 'Albert Risco Patiño'},
];
dbo.collection("students").insertMany(myobj, function(err, res) {
  if (err) throw err;
  console.log("Se ha insertado correctamente!");
  db.close();
});

//---------------------------InsertTasks---------------------------

var dbo = db.db("mydb");
var myobj = [
  { uid: 'ABC456', date: '2018-12-02', subject: 'PBE', name: 'CriticalDesign'},
  { uid: 'DEF123', date: '2018-11-31', subject: 'RP', name: 'ControlOnline'},
  { uid: 'ABC456', date: '2018-12-19', subject: 'PSAVC', name: 'Parcial'},
  { uid: 'DEF123', date: '2018-12-04', subject: 'DSBM', name: 'MemoriaGrup23'},
  { uid: 'ABC456', date: '2018-11-31', subject: 'RP', name: 'ControlOnline'}
];
dbo.collection("tasks").insertMany(myobj, function(err, res) {
  if (err) throw err;
  console.log("Se ha insertado correctamente!");
  db.close();
});

//---------------------------InsertTimetables---------------------------

var dbo = db.db("mydb");
var myobj = [
  { uid: 'DEF123', day: 'Tue', hour: '08:00:00', subject: 'Lab DSBM', room: 'C5-S101A'},
  { uid: 'ABC456', day: 'Tue', hour: '12:00:00', subject: 'RP', room: 'A4-104'},
  { uid: 'DEF123', day: 'Wed', hour: '15:00:00', subject: 'Lab PBE', room: 'C3-S103'},
  { uid: 'ABC456', day: 'Tue', hour: '10:00:00', subject: 'PSAVC', room: 'A4-104'}
];
dbo.collection("timetables").insertMany(myobj, function(err, res) {
  if (err) throw err;
  console.log("Se ha insertado correctamente!");
  db.close();
});

//---------------------------InsertMarks---------------------------

var dbo = db.db("mydb");
var myobj = [
  { uid: 'ABC456', subject: 'PBE', name: 'Entrega1', mark: 9},
  { uid: 'DEF123', subject: 'RP', name: 'ControlOnline', mark: 10},
  { uid: 'ABC456', subject: 'PSAVC', name: 'Parcial', mark: 5.45},
  { uid: 'DEF123', subject: 'PBE', name: 'Entrega1', mark: 8.5},
  { uid: 'ABC456', subject: 'RP', name: 'ControlOnline', mark: 8.56}
];
dbo.collection("marks").insertMany(myobj, function(err, res) {
  if (err) throw err;
  console.log("Se ha insertado correctamente!");
  db.close();
});

});
