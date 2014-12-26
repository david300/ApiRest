module.exports = function(app) {

    var user = require('../models/user.js');

    //GET - Return all users in the DB
    findAllusers = function(req, res) {
        
        //res.addHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        
        console.log("Traeme todos");
        
        user.find(function(err, users) {
            if(!err) {
                res.send(users);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };
    
    
    app.get('/testServices/Users/getAll', findAllusers);
}