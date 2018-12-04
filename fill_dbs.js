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
{ uid : '9B60F095', name : 'Òscar Lorente Corominas'},
{ uid : '84C8D683', name : 'Hector Pascual Haba'},
{ uid : '5B40E995', name : 'Albert Risco Patiño'},
{ uid : '1B64F395', name : 'Miquel Martinez Blanco'},
{ uid : '166FBFBE', name : 'JR Fernández Rull'}
];
dbo.collection("students").insertMany(myobj, function(err, res) {
if (err) throw err;
console.log("Se ha insertado correctamente!");
db.close();
});

//---------------------------InsertTasks---------------------------

var dbo = db.db("mydb");
var myobj = [
{ uid: '9B60F095', date: '2018-12-07', subject: 'PBE', name: 'CriticalDesign'},
{ uid: '84C8D683', date: '2018-12-19', subject: 'RP', name: 'ControlOnline'},
{ uid: '5B40E995', date: '2018-12-19', subject: 'RP', name: 'ControlOnline'},
{ uid: '1B64F395', date: '2019-01-06', subject: 'DSBM', name: 'MemoriaGrup23'},
{ uid: '166FBFBE', date: '2019-03-21', subject: 'PSAVC', name: 'Final'},

{ uid: '9B60F095', date: '2019-01-06', subject: 'DSBM', name: 'MemoriaGrup23'},
{ uid: '84C8D683', date: '2018-12-07', subject: 'PBE', name: 'CriticalDesign'},
{ uid: '5B40E995', date: '2019-03-21', subject: 'PSAVC', name: 'Final'},
{ uid: '1B64F395', date: '2018-12-07', subject: 'PBE', name: 'CriticalDesign'},
{ uid: '166FBFBE', date: '2018-12-19', subject: 'RP', name: 'ControlOnline'},

{ uid: '9B60F095', date: '2019-03-21', subject: 'PSAVC', name: 'Final'},
{ uid: '84C8D683', date: '2019-03-21', subject: 'PSAVC', name: 'Final'},
{ uid: '5B40E995', date: '2018-12-07', subject: 'PBE', name: 'CriticalDesign'},
{ uid: '1B64F395', date: '2018-12-19', subject: 'RP', name: 'ControlOnline'},
{ uid: '166FBFBE', date: '2019-01-06', subject: 'DSBM', name: 'MemoriaGrup23'},

{ uid: '9B60F095', date: '2018-12-19', subject: 'RP', name: 'ControlOnline'},
{ uid: '84C8D683', date: '2019-01-06', subject: 'DSBM', name: 'MemoriaGrup23'},
{ uid: '5B40E995', date: '2019-01-06', subject: 'DSBM', name: 'MemoriaGrup23'},
{ uid: '1B64F395', date: '2019-03-21', subject: 'PSAVC', name: 'Final'},
{ uid: '166FBFBE', date: '2018-12-07', subject: 'PBE', name: 'CriticalDesign'},

{ uid: '9B60F095', date: '2018-12-13', subject: 'LabDSBM', name: 'Memoria'},
{ uid: '84C8D683', date: '2018-12-13', subject: 'LabDSBM', name: 'Memoria'},
{ uid: '5B40E995', date: '2018-12-13', subject: 'LabDSBM', name: 'Memoria'},
{ uid: '1B64F395', date: '2018-12-13', subject: 'LabDSBM', name: 'Memoria'},
{ uid: '166FBFBE', date: '2018-12-13', subject: 'LabDSBM', name: 'Memoria'},

{ uid: '9B60F095', date: '2018-12-22', subject: 'LabRP', name: 'PracticaRP'},
{ uid: '84C8D683', date: '2018-12-22', subject: 'LabRP', name: 'PracticaRP'},
{ uid: '5B40E995', date: '2018-12-22', subject: 'LabRP', name: 'PracticaRP'},
{ uid: '1B64F395', date: '2018-12-22', subject: 'LabRP', name: 'PracticaRP'},
{ uid: '166FBFBE', date: '2018-12-22', subject: 'LabRP', name: 'PracticaRP'},

{ uid: '9B60F095', date: '2018-12-19', subject: 'LabPBE', name: 'CriticalDesign'},
{ uid: '84C8D683', date: '2018-12-19', subject: 'LabPBE', name: 'CriticalDesign'},
{ uid: '5B40E995', date: '2018-12-19', subject: 'LabPBE', name: 'CriticalDesign'},
{ uid: '1B64F395', date: '2018-12-19', subject: 'LabPBE', name: 'CriticalDesign'},
{ uid: '166FBFBE', date: '2018-12-19', subject: 'LabPBE', name: 'CriticalDesign'},

{ uid: '9B60F095', date: '2018-12-18', subject: 'TD', name: 'Test'},
{ uid: '84C8D683', date: '2018-12-18', subject: 'TD', name: 'Test'},
{ uid: '5B40E995', date: '2018-12-18', subject: 'TD', name: 'Test'},
{ uid: '1B64F395', date: '2018-12-18', subject: 'TD', name: 'Test'},
{ uid: '166FBFBE', date: '2018-12-18', subject: 'TD', name: 'Test'}

];
dbo.collection("tasks").insertMany(myobj, function(err, res) {
if (err) throw err;
console.log("Se ha insertado correctamente!");
db.close();
});

//---------------------------InsertTimetables---------------------------

var dbo = db.db("mydb");
var myobj = [
//-----------------------------------------Monday----------------------------------------------------
{ uid: '9B60F095', day: 'Mon', day_number: 1, hour: '08:00', subject: 'LabRP', room: 'D3-006'},
{ uid: '84C8D683', day: 'Mon', day_number: 1, hour: '08:00', subject: 'LabRP', room: 'D3-006'},
{ uid: '5B40E995', day: 'Mon', day_number: 1, hour: '08:00', subject: 'LabRP', room: 'D3-006'},
{ uid: '1B64F395', day: 'Mon', day_number: 1, hour: '08:00', subject: 'LabRP', room: 'D3-006'},
{ uid: '166FBFBE', day: 'Mon', day_number: 1, hour: '08:00', subject: 'LabRP', room: 'D3-006'},

{ uid: '9B60F095', day: 'Mon', day_number: 1, hour: '10:00', subject: 'TD', room: 'A4-104'},
{ uid: '84C8D683', day: 'Mon', day_number: 1, hour: '10:00', subject: 'TD', room: 'A4-104'},
{ uid: '5B40E995', day: 'Mon', day_number: 1, hour: '10:00', subject: 'TD', room: 'A4-104'},
{ uid: '1B64F395', day: 'Mon', day_number: 1, hour: '10:00', subject: 'TD', room: 'A4-104'},
{ uid: '166FBFBE', day: 'Mon', day_number: 1, hour: '10:00', subject: 'TD', room: 'A4-104'},

{ uid: '9B60F095', day: 'Mon', day_number: 1, hour: '13:00', subject: 'DSBM', room: 'A4-104'},
{ uid: '84C8D683', day: 'Mon', day_number: 1, hour: '13:00', subject: 'DSBM', room: 'A4-104'},
{ uid: '5B40E995', day: 'Mon', day_number: 1, hour: '13:00', subject: 'DSBM', room: 'A4-104'},
{ uid: '1B64F395', day: 'Mon', day_number: 1, hour: '13:00', subject: 'DSBM', room: 'A4-104'},
{ uid: '166FBFBE', day: 'Mon', day_number: 1, hour: '13:00', subject: 'DSBM', room: 'A4-104'},

//-----------------------------------------Tuesday----------------------------------------------------
{ uid: '9B60F095', day: 'Tue', day_number: 2, hour: '08:00', subject: 'LabDSBM', room: 'C5-S101A'},
{ uid: '84C8D683', day: 'Tue', day_number: 2, hour: '08:00', subject: 'LabDSBM', room: 'C5-S101A'},
{ uid: '5B40E995', day: 'Tue', day_number: 2, hour: '08:00', subject: 'LabDSBM', room: 'C5-S101A'},
{ uid: '1B64F395', day: 'Tue', day_number: 2, hour: '08:00', subject: 'LabDSBM', room: 'C5-S101A'},
{ uid: '166FBFBE', day: 'Tue', day_number: 2, hour: '08:00', subject: 'LabDSBM', room: 'C5-S101A'},

{ uid: '9B60F095', day: 'Tue', day_number: 2, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
{ uid: '84C8D683', day: 'Tue', day_number: 2, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
{ uid: '5B40E995', day: 'Tue', day_number: 2, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
{ uid: '1B64F395', day: 'Tue', day_number: 2, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
{ uid: '166FBFBE', day: 'Tue', day_number: 2, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},

{ uid: '9B60F095', day: 'Tue', day_number: 2, hour: '12:00', subject: 'RP', room: 'A4-104'},
{ uid: '84C8D683', day: 'Tue', day_number: 2, hour: '12:00', subject: 'RP', room: 'A4-104'},
{ uid: '5B40E995', day: 'Tue', day_number: 2, hour: '12:00', subject: 'RP', room: 'A4-104'},
{ uid: '1B64F395', day: 'Tue', day_number: 2, hour: '12:00', subject: 'RP', room: 'A4-104'},
{ uid: '166FBFBE', day: 'Tue', day_number: 2, hour: '12:00', subject: 'RP', room: 'A4-104'},

//-----------------------------------------Wednesday----------------------------------------------------
{ uid: '9B60F095', day: 'Wed', day_number: 3, hour: '15:00', subject: 'LabPBE', room: 'C3-S103'},
{ uid: '84C8D683', day: 'Wed', day_number: 3, hour: '15:00', subject: 'LabPBE', room: 'C3-S103'},
{ uid: '5B40E995', day: 'Wed', day_number: 3, hour: '15:00', subject: 'LabPBE', room: 'C3-S103'},
{ uid: '1B64F395', day: 'Wed', day_number: 3, hour: '15:00', subject: 'LabPBE', room: 'C3-S103'},
{ uid: '166FBFBE', day: 'Wed', day_number: 3, hour: '15:00', subject: 'LabPBE', room: 'C3-S103'},

//-----------------------------------------Thursday----------------------------------------------------
{ uid: '9B60F095', day: 'Thu', day_number: 4, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
{ uid: '84C8D683', day: 'Thu', day_number: 4, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
{ uid: '5B40E995', day: 'Thu', day_number: 4, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
{ uid: '1B64F395', day: 'Thu', day_number: 4, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
{ uid: '166FBFBE', day: 'Thu', day_number: 4, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},

{ uid: '9B60F095', day: 'Thu', day_number: 4, hour: '12:00', subject: 'TD', room: 'A4-104'},
{ uid: '84C8D683', day: 'Thu', day_number: 4, hour: '12:00', subject: 'TD', room: 'A4-104'},
{ uid: '5B40E995', day: 'Thu', day_number: 4, hour: '12:00', subject: 'TD', room: 'A4-104'},
{ uid: '1B64F395', day: 'Thu', day_number: 4, hour: '12:00', subject: 'TD', room: 'A4-104'},
{ uid: '166FBFBE', day: 'Thu', day_number: 4, hour: '12:00', subject: 'TD', room: 'A4-104'},

//-----------------------------------------Friday----------------------------------------------------
{ uid: '9B60F095', day: 'Fri', day_number: 5, hour: '08:00', subject: 'DSBM', room: 'A4-104'},
{ uid: '84C8D683', day: 'Fri', day_number: 5, hour: '08:00', subject: 'DSBM', room: 'A4-104'},
{ uid: '5B40E995', day: 'Fri', day_number: 5, hour: '08:00', subject: 'DSBM', room: 'A4-104'},
{ uid: '1B64F395', day: 'Fri', day_number: 5, hour: '08:00', subject: 'DSBM', room: 'A4-104'},
{ uid: '166FBFBE', day: 'Fri', day_number: 5, hour: '08:00', subject: 'DSBM', room: 'A4-104'},

{ uid: '9B60F095', day: 'Fri', day_number: 5, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
{ uid: '84C8D683', day: 'Fri', day_number: 5, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
{ uid: '5B40E995', day: 'Fri', day_number: 5, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
{ uid: '1B64F395', day: 'Fri', day_number: 5, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},
{ uid: '166FBFBE', day: 'Fri', day_number: 5, hour: '10:00', subject: 'PSAVC', room: 'A4-104'},

{ uid: '9B60F095', day: 'Fri', day_number: 5, hour: '11:00', subject: 'RP', room: 'A4-104'},
{ uid: '84C8D683', day: 'Fri', day_number: 5, hour: '11:00', subject: 'RP', room: 'A4-104'},
{ uid: '5B40E995', day: 'Fri', day_number: 5, hour: '11:00', subject: 'RP', room: 'A4-104'},
{ uid: '1B64F395', day: 'Fri', day_number: 5, hour: '11:00', subject: 'RP', room: 'A4-104'},
{ uid: '166FBFBE', day: 'Fri', day_number: 5, hour: '11:00', subject: 'RP', room: 'A4-104'}
];
dbo.collection("timetables").insertMany(myobj, function(err, res) {
if (err) throw err;
console.log("Se ha insertado correctamente!");
db.close();
});

//---------------------------InsertMarks---------------------------

var dbo = db.db("mydb");
var myobj = [

{ uid: '9B60F095', subject: 'PBE', name: 'Entrega1', mark: 9},
{ uid: '84C8D683', subject: 'PBE', name: 'Entrega2', mark: 0},
{ uid: '5B40E995', subject: 'RP', name: 'ControlOnline', mark: 10},
{ uid: '1B64F395', subject: 'PBE', name: 'Entrega2', mark: 8},
{ uid: '166FBFBE', subject: 'RP', name: 'ControlOnline', mark: 8.56},

{ uid: '9B60F095', subject: 'RP', name: 'ControlOnline', mark: 4.1},
{ uid: '84C8D683', subject: 'PSAVC', name: 'Parcial', mark: 5.45},
{ uid: '5B40E995', subject: 'PBE', name: 'Entrega2', mark: 5.9},
{ uid: '1B64F395', subject: 'PBE', name: 'Entrega1', mark: 9},
{ uid: '166FBFBE', subject: 'PBE', name: 'Entrega2', mark: 7.5},

{ uid: '9B60F095', subject: 'PSAVC', name: 'Parcial', mark: 2.7},
{ uid: '84C8D683', subject: 'PBE', name: 'Entrega1', mark: 4.3},
{ uid: '5B40E995', subject: 'PBE', name: 'Entrega1', mark: 2.5},
{ uid: '1B64F395', subject: 'PSAVC', name: 'Parcial', mark: 2.9},
{ uid: '166FBFBE', subject: 'PBE', name: 'Entrega1', mark: 4.95},

{ uid: '9B60F095', subject: 'PBE', name: 'Entrega2', mark: 9.3},
{ uid: '84C8D683', subject: 'RP', name: 'ControlOnline', mark: 10},
{ uid: '5B40E995', subject: 'PSAVC', name: 'Parcial', mark: 8.3},
{ uid: '1B64F395', subject: 'RP', name: 'ControlOnline', mark: 9.5},
{ uid: '166FBFBE', subject: 'PSAVC', name: 'Parcial', mark: 6.2},

{ uid: '9B60F095', subject: 'LabPBE', name: 'Puzzle', mark: 6},
{ uid: '84C8D683', subject: 'LabPBE', name: 'Puzzle', mark: 3},
{ uid: '5B40E995', subject: 'LabPBE', name: 'Puzzle', mark: 2},
{ uid: '1B64F395', subject: 'LabPBE', name: 'Puzzle', mark: 9},
{ uid: '166FBFBE', subject: 'LabPBE', name: 'Puzzle', mark: 8.7},

{ uid: '9B60F095', subject: 'LabRP', name: 'MemoriaRP', mark: 4.9},
{ uid: '84C8D683', subject: 'LabRP', name: 'MemoriaRP', mark: 5.9},
{ uid: '5B40E995', subject: 'LabRP', name: 'MemoriaRP', mark: 7.1},
{ uid: '1B64F395', subject: 'LabRP', name: 'MemoriaRP', mark: 6.3},
{ uid: '166FBFBE', subject: 'LabRP', name: 'MemoriaRP', mark: 2.1},

{ uid: '9B60F095', subject: 'TD', name: 'Test', mark: 5.2},
{ uid: '84C8D683', subject: 'TD', name: 'Test', mark: 7.5},
{ uid: '5B40E995', subject: 'TD', name: 'Test', mark: 9.7},
{ uid: '1B64F395', subject: 'TD', name: 'Test', mark: 3.4},
{ uid: '166FBFBE', subject: 'TD', name: 'Test', mark: 5},

{ uid: '9B60F095', subject: 'LabDSBM', name: 'Memoria', mark: 1.7},
{ uid: '84C8D683', subject: 'LabDSBM', name: 'Memoria', mark: 10},
{ uid: '5B40E995', subject: 'LabDSBM', name: 'Memoria', mark: 9.8},
{ uid: '1B64F395', subject: 'LabDSBM', name: 'Memoria', mark: 6.7},
{ uid: '166FBFBE', subject: 'LabDSBM', name: 'Memoria', mark: 8.0}
];
dbo.collection("marks").insertMany(myobj, function(err, res) {
if (err) throw err;
console.log("Se ha insertado correctamente!");
db.close();
});

});
