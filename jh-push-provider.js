/**
*jh-push-provider.js
*Created by HJH on 2015-05-15 at 00:12 
*/

var gcm = require('node-gcm');

// create a message with default values
var message = new gcm.Message();

// or with object values
var message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        key1: '안녕하세요.',
        key2: 'saltfactory push demo'
    }
});

var server_access_key = 'AIzaSyA0pi-beq3_bvjFbndnEaM4W9bh4_9o6zI';
var sender = new gcm.Sender(server_access_key);
var registrationIds = [];

var registration_id = 'APA91bEjduujv3ggv3haKdPYR3v4XkcNIV3KJR6QEDq91LoqaQSWAXB42ZOVs6eNma98cqN4Dzf6n_Cj1xwqPAnemRfEcLhDdQCOFIC_u69wT_FultYc6kfQpDjP0CifUgKG66tcdOSCrz_vYB0bwihEp41UbtExCjpwgttvIUyXyOdzSTL-33Y';
// At least one required
registrationIds.push(registration_id);

/**
 * Params: message-literal, registrationIds-array, No. of retries, callback-function
 **/
sender.send(message, registrationIds, 4, function (err, result) {
    console.log(result);
});
