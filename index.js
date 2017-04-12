const express = require('express');
const app = express();
const mysql = require('mysql');
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'food_waste_tracker',
  port : '3307'
});
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

connection.connect();



app.get('/', function (req, res) {
   res.sendFile( __dirname + "/views/index.html" );
})

app.get('/', function(req ,res) {
var foodSubGroup = req.query.foodGroup;
var mass = req.query.mass;
mass = mass /100;

connection.query('SELECT avg(unit_price_g_avg) AS price FROM price WHERE fsg_id=' + foodGroup, function(err, rows) {
	if (err)
		throw err;
	res.send(rows[0]);
})

})

app.listen(3000, function() {
  console.log('listening on 3000')
})



