var express = require('express');
var app = express();
var viewsPath = __dirname + '/public/views/';
module.exports=function(app){
    app.get('/' ,function(req, res){
        res.sendFile(viewsPath + 'index.html', (err, html) => {
            if(err){
                res.end("NOT FOUND");
                console.log(viewsPath + '/public/views/index.html NOT FOUND');
            }
        });
    });
    app.get('/info' ,function(req, res){
        res.sendFile(viewsPath + '/info.html', (err, html) => {
            if(err){
                res.end("NOT FOUND");
                console.log(viewsPath + 'index.html NOT FOUND');
            }
        });
    });
    app.get('/project' ,function(req, res){
        res.sendFile(viewsPath + '/project.html', (err, html) => {
            if(err){
                res.end("NOT FOUND");
                console.log(viewsPath + 'index.html NOT FOUND');
            }
        });
    });
    app.get('/contact' ,function(req, res){
        res.sendFile(viewsPath + '/contact.html', (err, html) => {
            if(err){
                res.end("NOT FOUND");
                console.log(viewsPath + 'index.html NOT FOUND');
            }
        });
    });
    app.get('/portal' ,function(req, res){
        res.sendFile(viewsPath + '/portal.html', (err, html) => {
            if(err){
                res.end("NOT FOUND");
                console.log(viewsPath + 'index.html NOT FOUND');
            }
        });
    });
    app.get('/chat' ,function(req, res){
        res.sendFile(viewsPath + '/chat.html', (err, html) => {
            if(err){
                res.end("NOT FOUND");
                console.log(viewsPath + 'chat.html NOT FOUND');
            }
        });
    });
    // app.get('*', function(req,res){
    //     res.redirect('/');
    //     console.log("PAGE NOT FOUND");
    //  });
};