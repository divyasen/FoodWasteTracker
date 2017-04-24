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
  port : '3306'
});
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

connection.connect();



app.get('/', function (req, res) {
   res.sendFile( __dirname + "/views/index.html" );
})

app.get('/search', function(req ,res) {
var foodSubGroup = req.query.foodGroup;
var mass = req.query.mass;
mass = 2.7 * 7 * mass /100;

connection.query('SELECT avg(unit_price_g_avg) AS price FROM price WHERE fsg_id=' + foodSubGroup, function(err, rows) {
	if (err){
		throw err;
	}
	console.log(rows[0].price);
//	res.send(rows[0]);
	res.render(__dirname + "/views/stat",
		rows[0]
		
		
	)

})

})
app.get('/test', function(req, res) {
   res.sendFile(__dirname + "/views/stat.html");

})



app.listen(3000, function() {
  console.log('listening on 3000')
})



