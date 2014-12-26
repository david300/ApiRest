//File: routes/chats.js
module.exports = function(app) {

  var chat = require('../models/chat.js');

    //GET - Return all chats in the DB
    findAllchats = function(req, res) {
        
        //res.addHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        
        console.log("Traeme todos");
        
        chat.find(function(err, chats) {
            if(!err) {
                res.send(chats);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };
    
    findByTitle = function(req, res){
        chat.find(req.params.title, function(err, chats){
            if(!err){
                res.send(chats);
            }else{
                console.log('ERROR: ' + err);
            }
        });
    };
    
    //GET - Return a chat with specified ID
    findById = function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        
        console.log("Find: " + req.params.id);
        chat.findById(req.params.id, function(err, chat) {
            if(!err) {
                res.send(chat);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };
    
    //POST - Insert a new chat in the DB
    addchat = function(req, res) {
        console.log('POST');
        console.log(req.body);

        var chat = new chat({
            title:    req.body.title,
            year:     req.body.year,
            country:  req.body.country,
            poster:   req.body.poster,
            seasons:  req.body.seasons,
            genre:    req.body.genre,
            summary:  req.body.summary  
        });

        chat.save(function(err) {
            if(!err) {
                console.log('Created');
            } else {
                console.log('ERROR: ' + err);
            }
        });

        res.send(chat);
    };
    
    //PUT - Update a register already exists
    updatechat = function(req, res) {
        chat.findById(req.params.id, function(err, chat) {
            chat.title   = req.body.title;
            chat.year    = req.body.year;
            chat.country = req.body.country;
            chat.poster  = req.body.poster;
            chat.seasons = req.body.seasons;
            chat.genre   = req.body.genre;
            chat.summary = req.body.summary;

            chat.save(function(err) {
                if(!err) {
                    console.log('Updated');
                } else {
                    console.log('ERROR: ' + err);
                }
                res.send(chat);
            });
        });
    }
    
    //DELETE - Delete a chat with specified ID
    deletechat = function(req, res) {
        console.log("Try to delete: " + req.params.id);
        chat.findById(req.params.id, function(err, chat) {
            chat.remove(function(err) {
                if(!err) {
                    console.log('Removed');
                } else {
                    console.log('ERROR: ' + err);
                }
            })
        });
        
    }
    
    //Link routes and functions
    app.get('/chatServices/chats', findAllchats);
    app.get('/chatServices/chat/:id', findById);
    app.get('/chatServices/chat/title/:title', findByTitle);
    app.post('/chatServices/chat', addchat);
    app.put('/chatServices/chat/:id', updatechat);
    app.delete('/chatServices/chat/:id', deletechat);
}