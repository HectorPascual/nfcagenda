var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://<user>:<admin1>@ds147450.mlab.com:47450/pbe-project";

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
/*
  //------------------Insert--------------------------

    var myobj = [
      { uid : 'ABC123', name : 'Òscar Lorente Corominas'},
      { uid : 'DEF456', name : 'Hector Pascual Haba'},
      { uid : 'GHI789', name : 'Albert Risco Patiño'},
      { uid : 'JKL012', name : 'Miquel Martinez Blanco'},
      { uid : 'MNO345', name : 'JR Fernández Rull'}
    ];
dbo.collection("students").insertMany(myobj, function(err, res) {
  if (err) throw err;
  console.log("Se ha insertado correctamente!");
  db.close();
});

//---------------------------InsertTasks---------------------------

var dbo = db.db("mydb");
var myobj = [
  { uid: 'ABC456', date: '2018-12-07', subject: 'PBE', name: 'CriticalDesign'},
  { uid: 'DEF123', date: '2018-12-19', subject: 'RP', name: 'ControlOnline'},
  { uid: 'GHI789', date: '2018-12-19', subject: 'RP', name: 'ControlOnline'},
  { uid: 'JKL012', date: '2019-01-06', subject: 'DSBM', name: 'MemoriaGrup23'},
  { uid: 'MNO345', date: '2019-03-21', subject: 'PSAVC', name: 'Final'},

  { uid: 'ABC456', date: '2019-01-06', subject: 'DSBM', name: 'MemoriaGrup23'},
  { uid: 'DEF123', date: '2018-12-07', subject: 'PBE', name: 'CriticalDesign'},
  { uid: 'GHI789', date: '2019-03-21', subject: 'PSAVC', name: 'Final'},
  { uid: 'JKL012', date: '2018-12-07', subject: 'PBE', name: 'CriticalDesign'},
  { uid: 'MNO345', date: '2018-12-19', subject: 'RP', name: 'ControlOnline'},

  { uid: 'ABC456', date: '2019-03-21', subject: 'PSAVC', name: 'Final'},
  { uid: 'DEF123', date: '2019-03-21', subject: 'PSAVC', name: 'Final'},
  { uid: 'GHI789', date: '2018-12-07', subject: 'PBE', name: 'CriticalDesign'},
  { uid: 'JKL012', date: '2018-12-19', subject: 'RP', name: 'ControlOnline'},
  { uid: 'MNO345', date: '2019-01-06', subject: 'DSBM', name: 'MemoriaGrup23'},

  { uid: 'ABC456', date: '2018-12-19', subject: 'RP', name: 'ControlOnline'},
  { uid: 'DEF123', date: '2019-01-06', subject: 'DSBM', name: 'MemoriaGrup23'},
  { uid: 'GHI789', date: '2019-01-06', subject: 'DSBM', name: 'MemoriaGrup23'},
  { uid: 'JKL012', date: '2019-03-21', subject: 'PSAVC', name: 'Final'},
  { uid: 'MNO345', date: '2018-12-07', subject: 'PBE', name: 'CriticalDesign'}
];
dbo.collection("tasks").insertMany(myobj, function(err, res) {
  if (err) throw err;
  console.log("Se ha insertado correctamente!");
  db.close();
});
*/
//---------------------------InsertTimetables---------------------------

var dbo = db.db("mydb");
var myobj = [

  { uid: 'ABC456', day: 'Tue', day_number: 2, hour: '08:00', subject: 'Lab DSBM', room: 'C5-S101A'},
  { uid: 'DEF123', day: 'Thu', day_number: 4, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
  { uid: 'GHI789', day: 'Thu', day_number: 4, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
  { uid: 'JKL012', day: 'Tue', day_number: 2, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
  { uid: 'MNO345', day: 'Tue', day_number: 2, hour: '08:00', subject: 'Lab DSBM', room: 'C5-S101A'},

  { uid: 'ABC456', day: 'Thu', day_number: 4, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
  { uid: 'DEF123', day: 'Wed', day_number: 3, hour: '15:00', subject: 'Lab PBE', room: 'C3-S103'},
  { uid: 'GHI789', day: 'Thu', day_number: 4, hour: '08:00', subject: 'PBE', room: 'A3-001'},
  { uid: 'JKL012', day: 'Thu', day_number: 4, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
  { uid: 'MNO345', day: 'Tue', day_number: 2, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},

  { uid: 'ABC456', day: 'Tue', day_number: 2, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
  { uid: 'DEF123', day: 'Tue', day_number: 2, hour: '08:00', subject: 'Lab DSBM', room: 'C5-S101A'},
  { uid: 'GHI789', day: 'Tue', day_number: 2, hour: '08:00', subject: 'Lab DSBM', room: 'C5-S101A'},
  { uid: 'JKL012', day: 'Thu', day_number: 4, hour: '08:00', subject: 'PBE', room: 'A3-001'},
  { uid: 'MNO345', day: 'Thu', day_number: 4, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},

  { uid: 'ABC456', day: 'Thu', day_number: 4, hour: '08:00', subject: 'PBE', room: 'A3-001'},
  { uid: 'DEF123', day: 'Thu', day_number: 4, hour: '08:00', subject: 'PBE', room: 'A3-001'},
  { uid: 'GHI789', day: 'Tue', day_number: 2, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
  { uid: 'JKL012', day: 'Tue', day_number: 2, hour: '08:00', subject: 'Lab DSBM', room: 'C5-S101A'},
  { uid: 'MNO345', day: 'Wed', day_number: 3, hour: '15:00', subject: 'Lab PBE', room: 'C3-S103'},

  { uid: 'ABC456', day: 'Wed', day_number: 3, hour: '15:00', subject: 'Lab PBE', room: 'C3-S103'},
  { uid: 'DEF123', day: 'Tue', day_number: 2, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
  { uid: 'GHI789', day: 'Wed', day_number: 3, hour: '15:00', subject: 'Lab PBE', room: 'C3-S103'},
  { uid: 'JKL012', day: 'Wed', day_number: 3, hour: '15:00', subject: 'Lab PBE', room: 'C3-S103'},
  { uid: 'MNO345', day: 'Thu', day_number: 4, hour: '08:00', subject: 'PBE', room: 'A3-001'}
];
dbo.collection("timetables").insertMany(myobj, function(err, res) {
  if (err) throw err;
  console.log("Se ha insertado correctamente!");
  db.close();
});
/*
//---------------------------InsertMarks---------------------------

var dbo = db.db("mydb");
var myobj = [

  { uid: 'ABC456', subject: 'PBE', name: 'Entrega1', mark: 9},
  { uid: 'DEF123', subject: 'PBE', name: 'Entrega2', mark: 0},
  { uid: 'GHI789', subject: 'RP', name: 'ControlOnline', mark: 10},
  { uid: 'JKL012', subject: 'PBE', name: 'Entrega2', mark: 8},
  { uid: 'MNO345', subject: 'RP', name: 'ControlOnline', mark: 8.56},

  { uid: 'ABC456', subject: 'RP', name: 'ControlOnline', mark: 4.1},
  { uid: 'DEF123', subject: 'PSAVC', name: 'Parcial', mark: 5.45},
  { uid: 'GHI789', subject: 'PBE', name: 'Entrega2', mark: 5.9},
  { uid: 'JKL012', subject: 'PBE', name: 'Entrega1', mark: 9},
  { uid: 'MNO345', subject: 'PBE', name: 'Entrega2', mark: 7.5},

  { uid: 'ABC456', subject: 'PSAVC', name: 'Parcial', mark: 2.7},
  { uid: 'DEF123', subject: 'PBE', name: 'Entrega1', mark: 4.3},
  { uid: 'GHI789', subject: 'PBE', name: 'Entrega1', mark: 2.5},
  { uid: 'JKL012', subject: 'PSAVC', name: 'Parcial', mark: 2.9},
  { uid: 'MNO345', subject: 'PBE', name: 'Entrega1', mark: 4.95},

  { uid: 'ABC456', subject: 'PBE', name: 'Entrega2', mark: 9.3},
  { uid: 'DEF123', subject: 'RP', name: 'ControlOnline', mark: 10},
  { uid: 'GHI789', subject: 'PSAVC', name: 'Parcial', mark: 8.3},
  { uid: 'JKL012', subject: 'RP', name: 'ControlOnline', mark: 9.5},
  { uid: 'MNO345', subject: 'PSAVC', name: 'Parcial', mark: 6.2}
];
dbo.collection("marks").insertMany(myobj, function(err, res) {
  if (err) throw err;
  console.log("Se ha insertado correctamente!");
  db.close();
});
*/
});
