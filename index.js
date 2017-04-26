const express = require('express');
const app = express();
const mysql = require('mysql');
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
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


app.get('/sources', function (req, res) {
   res.sendFile( __dirname + "/views/sources.html" );
})


app.get('/about', function (req, res) {
   res.sendFile( __dirname + "/views/about.html" );
})

app.get('/search', function(req ,res) {
var foodSubGroup = JSON.parse(req.query.foodGroup);
var fsgList = [];
var mass = 0;
var data = {};
for( var ind in foodSubGroup){
	fsgList.push(ind);
}


connection.query('SELECT fsg_id, avg(unit_price_g_avg) AS price FROM price GROUP BY fsg_id HAVING fsg_id IN (' + fsgList.toString() + ");", function(err, rows) {
	if (err){
		throw err;
	}
	
	for(var ind in foodSubGroup){
		mass += parseFloat(foodSubGroup[ind]);
	}
	mass *= 2.5;
	data.day = Math.round(mass * .00220462);
	mass *= 7;
	data.week = Math.round(mass * .00220462);
	mass *= 4.34524;
	data.month = Math.round(mass * .00220462);
	mass *= 12;
	data.year = Math.round(mass * .00220462); 
	data.price = 0;
	for(var ind in rows){
		var temp = rows[ind]	
		data.price += parseFloat(foodSubGroup[temp["fsg_id"]]) * parseFloat(temp["price"])/100;
	
	}
	data.price *= 2.5 * 7 * 4.34524 * 12;
	data.price = data.price.toFixed(2);
	res.render(__dirname + "/views/stat",{data: data})

})

})
app.get('/test', function(req, res) {
   res.sendFile(__dirname + "/views/stat.html");

})



app.listen(3000, function() {
  console.log('listening on 3000')
})



