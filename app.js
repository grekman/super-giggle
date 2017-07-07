var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;

var app = express();
var productRouter = express.Router();

// var urlEncodedParser = bodyParser.urlencoded({extended:false});
var jsonParser = bodyParser.json();


// productRouter.route("/").get(function(request, response){
//   response.send("Список товаров");
// });
// productRouter.route("/:id").get(function(request, response){
//   response.send(`Товар ${request.params.id}`);
// });

app.use(function(request, response, next){
  var now = new Date();
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
  console.log(data);
  fs.appendFile("server.log", data + "\n");
  next();
});

app.use(express.static(__dirname + "/public"));

// app.post("/register", urlEncodedParser, function (request, response) {
app.post("/user", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
  response.json(`${request.body.userName} - ${request.body.password} - ${request.body.userAge} - OK!`);
});

app.post("/calc", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
  var resultForUser = Number(request.body.userNumber)*5;
  response.json(`${resultForUser} - OK!`);
});

app.post("/text", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
  fs.appendFile(`${request.body.fileName}.txt`, request.body.userText  + "\n");
  response.json(`Done`);
});


app.post("/readfilein", jsonParser, function (request,response){
  if(!request.body) return response.sendStatus(400);
  console.log(request.body);

  fs.readdir("./userfiles", function(err, items) {
      console.log(items);
      response.json(items);
      for (var i=0; i<items.length; i++) {
          console.log(items[i]);
      }
  });
});

app.post("/readfileout", jsonParser, function (request,response){
  if(!request.body) return response.sendStatus(400);
  console.log(request.body);

  fs.readFile("./userfiles/"+request.body.userFile, function(err, content) {
      console.log(content);
      response.json(content.toString());
      // for (var i=0; i<items.length; i++) {
      //     console.log(items[i]);
      // }
  });
});

app.post("/product", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
  // MongoClient.connect("mongodb://user1:Qwerty123@ds139942.mlab.com:39942/t20171", function (err, db) {
  //
  //   db.collection('Products', function (err, collection) {
  //   //
  //     collection.insert(request.body)
  //   //     firstName: request.body.productName,
  //   //     lastName: request.body.imageUrl,
  //   //     request.body.imageUrl : request.body.imageUrl
  //   //
  //   //   });
  //   )};
  // )};
  response.json(`${request.body.productName} - ${request.body.imageUrl} - ${request.body.productPrice} - OK!`);
});


// app.use("/products", productRouter);

app.get("/", function(request, response){
  console.log("Route /");
  response.send("<h3>Tasks solutions</h3><a href=http://localhost:3000/register.html>task1</a><br><a href=http://localhost:3000/calculate.html>task2</a><br><a href=http://localhost:3000/savetext.html>task3</a><br><a href=http://localhost:3000/readfile.html>task4</a><br><a href=http://localhost:3000/writetodb.html>task5</a>");
});

// app.get("/products/:productId", function (request, response) {
//   response.send("productId: " + request.params["productId"])
// });

// app.get("/categories/:categoryId/products/:productId", function (request, response) {
//   var catId = request.params["categoryId"];
//   var prodId = request.params["productId"];
//   response.send(`Категория: ${catId}    Товар: ${prodId}`);
// });
//
// app.get("/book/:pageName.:pageExt", function (request, response) {
//   var pageName = request.params["pageName"];
//   var pageExt = request.params["pageExt"];
//   response.send(`Запрошенный файл: ${pageName}.${pageExt}`);
// });



app.listen(3000);
