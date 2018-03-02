const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const url = require('url');
const sessions = require('express-session');
const errorHandler = require('errorhandler');

const app = express();
require(path.join(__dirname + '/routes.js'))(app);

app.set('port', process.env.PORT || 9600);
app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/public');

app.use(bodyParser.json());


http.createServer(app).listen(app.get('port'),function(){
  console.log("Server listening on port: " + app.get('port'))
});

users = [];
//Server receives a new connection
app.on("connection", function(sock) {
    console.log("User has joined the chat!");
    
    //User sends a message
    sock.on("message", function(json) {
        users.forEach(function(sock) {
            if (sock.readyState == 1) {
                sock.send(json);
            }
        });
    });

    //Error handler
    sock.on("error", function(e) {
        console.log(e);
    });

    //User disconnects or leaves for any reason. 
    sock.on("close", function(e) {
        for (var a = 0; a < users.length; a++) {
            if (users[a].readyState == 3) {
                users.splice(a, 1);
                console.log("USERS : %s", users.length);
            }
        }
        console.log("User has left the chat!");
    });

    sock.on("pong", function(e) {
        sock.isAlive = true;
    });

    sock.isAlive = true;
    users.push(sock);
});

//Pings the list of users currently connected
var ping = setInterval(function() {
    users.forEach(function(sock) {
        if (!sock.isAlive) {
            sock.terminate();
        }

        sock.isAlive = false;
        sock.ping();
    });
}, 30000);

console.log("Listening on port 3001...");