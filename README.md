# Food Waste Tracker

## Introduction
The following instructions will help install the webserver and database on the baremetal
to have the Food Waste Tracker running as a standalone website.

## Installing the webserver
1. Ensure that both node/npm and mysql are installed on the machine.
```
sudo apt-get install npm
```
This installs both Node.js and npm.

2. Change the fields `user`, `root`, `port` of the mysql configuration in the FoodWasteTracker's index.js:
```
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'YOUR_USER_NAME',
password : 'YOUR_PASSWORD',
database : 'food_waste_tracker',
port : 'PORT_NUMBER_MYSQL_IS_LISTENING_ON'
});
```

3. Unzip the tar file, and follow the readme there to install the db.
```
tar -xzvf FoodWasteTracker_SQL.tar.gz
```

4. Now install all the dependencies
```
npm install
```

5. Then run the webserver in the backgroud
```
sudo npm start&
```

6. If the program takes control of the shell, hit CTRL-C in order to stop it.
7. Now type in ```jobs```, it should show you the webserver running in the background. 
8. It should now be running on the machine at port 80. 
9. If it fails, make sure that:
	Mysql is running
	The port of webserver isn't already in use

## Installing the database
Food Waste Tracker Database README

Typical usage:

1.  Copy this "FoodWasteTracker_MySQL.tar.gz" archive to the machine
    hosting and running your MySQL server.

2.  Extract the installation files:
```
tar -xvzf FoodWasteTracker_MySQL.tar.gz
```

3.  Import the database and populate it by using one of the following commands:
	* Through a MySQL user **requiring** a password:
```./db_import.sh -u YOUR_USERNAME> -p YOUR_PASSWORD ```
	* Through a MySQL user **without** a password:
```./db_import.sh -u YOUR_USERNAME```

Verbose mode may also be activated with the `-v` flag
```
./db_import.sh -u YOUR_USERNAME -v
```

A detailed view of the import script's usage may be displayed with the `-h` flag
```
./db_import.sh -h
```
