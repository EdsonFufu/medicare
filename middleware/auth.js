const jwt = require('jwt-then');

module.exports = (req, res, next) => {
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        console.log("Not logged in!")
        var err = new Error("Not logged in!");
        res.render('403',{ layout:"layout-plain",title:'403'});
    }
};

