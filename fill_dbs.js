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
  { uid: 'ABC456', name: 'Òscar Lorente Corominas'},
  { uid: '7GHFF0', name: 'Hector Pascual Haba'},
];
dbo.collection("students").insertMany(myobj, function(err, res) {
  if (err) throw err;
  console.log("Se ha insertado correctamente!");
  db.close();
});

});
