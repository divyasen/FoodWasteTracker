//Adde all necessary rquires
const express = require('express');
const app = express();
const mysql = require('mysql');
//Middleware for parsing get and post requests
var bodyParser = require('body-parser');
//We are using ejs as our expression languge, so we set that here
app.set('view engine', 'ejs');
//Connect to the db, make sure these configs align with what is set
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'food_waste_tracker',
  port : '3306'
});
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//This is where we store all filos being sent to the public
app.use(express.static('public'));
//This is where we connect to the db
connection.connect();


//Serve the index page
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/views/index.html" );
})

//Serve the sources page
app.get('/sources', function (req, res) {
   res.sendFile( __dirname + "/views/sources.html" );
})

//Serve the about page
app.get('/about', function (req, res) {
   res.sendFile( __dirname + "/views/about.html" );
})

app.get('/search', function(req ,res) {
//Grab the JSON object that was passed in the client
var foodSubGroup = JSON.parse(req.query.foodGroup);
var fsgList = [];
var mass = 0;
var data = {};
//Create a list of all the FSG igs
for( var ind in foodSubGroup){
	fsgList.push(ind);
}

//Query for all the IDS to recieve the price its associated with
connection.query('SELECT fsg_id, avg(unit_price_g_avg) AS price FROM price GROUP BY fsg_id HAVING fsg_id IN (' + fsgList.toString() + ");", function(err, rows) {
	if (err){
		throw err;
	}
	//This is where we calculate the combined mass of the food
	for(var ind in foodSubGroup){
		mass += parseFloat(foodSubGroup[ind]);
	}
	//Multiply by 2.5, to signify one meal waste extrapolated to an entire day
	mass *= 2.5;
	//We multipplu by the decimal because we are converting it to pounds
	data.day = Math.round(mass * .00220462);
	mass *= 7;
	data.week = Math.round(mass * .00220462);
	mass *= 4.34524;
	data.month = Math.round(mass * .00220462);
	mass *= 12;
	data.year = Math.round(mass * .00220462); 
	data.price = 0;
	//We multiply the mass by the price here
	for(var ind in rows){
		var temp = rows[ind]	
		//We divbide by 100, because the database is price  per 100 grams
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



app.listen(80, function() {
  console.log('listening on 80')
})



