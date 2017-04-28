# Food Waste Tracker

## Introduction
The following instructions will help install the webserver and database on the baremetal
to have the Food Waste Tracker running as a standalone website.

## Installing the MySQL server
```
sudo apt-get update
sudo apt-get install mysql-server
```
Configure the MySQL server to your likings during the installation.

## Importing the database
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
```./db_import.sh -u YOUR_USERNAME -p YOUR_PASSWORD ```
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

## Installing the webserver
1. Ensure that both Node.js and npm is installed on the machine.
```
sudo apt-get update
sudo apt-get install npm
```

2. Determine the MySQL server's listening port from the configuration file's entry for `[mysqld]`.
```
/etc/mysql/my.cnf
```

3. Change the fields `user`, `root`, `port` of the mysql configuration in the FoodWasteTracker's index.js:
```
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'YOUR_USER_NAME',
password : 'YOUR_PASSWORD',
database : 'food_waste_tracker',
port : 'PORT_NUMBER_MYSQL_IS_LISTENING_ON'
});
```

4. Unzip the tar file, and follow the readme there to install the db.
```
tar -xzvf FoodWasteTracker_SQL.tar.gz
```

5. Now install all the dependencies
```
npm install
```

6. Then run the webserver in the background
```
sudo npm start&
```

7. If the program takes control of the shell, hit CTRL-C in order to stop it.
8. Now type in ```jobs```, it should show you the webserver running in the background. 
9. It should now be running on the machine at port 80. 

## In case of failure
1. Ensure that MySQL is running
```
sudo service mysql status
sudo service mysql stop
sudo service mysql start
```
2. Ensure that the port of webserver isn't already in use
