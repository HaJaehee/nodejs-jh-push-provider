/**
*jh-push-provider.js
*Created by HJH on 2015-05-15 at 00:12 

*Modified by HJH on 2015-06-01 at 22:53
   added database query code
	added multi push message code
*/

var gcm = require('node-gcm');
//load node-gcm module

var mysql = require('mysql');
//load mysql module

// create a message with default values
var message = new gcm.Message();

// or with object values
var message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        key1: '안녕하세요.',
        key2: 'embeded soft push demo'
    }
});

var server_access_key = 'AIzaSyA0pi-beq3_bvjFbndnEaM4W9bh4_9o6zI';
var sender = new gcm.Sender(server_access_key);
var registrationIds = [];


var dbconnection = mysql.createConnection ({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'device_registration'
	});//database connection option define

dbconnection.connect (function(err)
	{
		if(err)
		{
			console.error('mysql connection error');
			console.error('error');
			throw err;
		}
	});//database connection function


dbconnection.query('select device_reg_id from device',function
	(err,rows){
	//console.log(rows);
	// At least one required
	if (rows.length != 0)
	{
		for (var i = 0 ; i < rows.length ; i++)
		{	
			registrationIds.push(rows[i].device_reg_id);
			console.log(rows[i].device_reg_id);
		}
		/**
 		* Params: message-literal, registrationIds-array, No. of retries, callback-function
 		**/
		sender.send(message, registrationIds, 4, function (err, result) {
			console.log(result);
		});
		return;
	}
});
dbconnection.end();

