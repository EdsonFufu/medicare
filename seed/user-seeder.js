var User = require('../model/user')
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/medicare')
console.log("Starting init users");
var users = [
    new User({
        _id:1,
        imagePath:"https://i-cf65.ch-static.com/content/dam/cf-consumer-healthcare/panadol/en_eg/Products/455x455-Advance-eng%20eg_new.jpg",
        fullname:"Edson Fufu",
        email:"eddy20062010@gmal.com",
        password:"admin",
        userRole:"ADMIN",
        isActive:true
    }),
    new User({
        _id:2,
        imagePath:"https://i-cf65.ch-static.com/content/dam/cf-consumer-healthcare/panadol/en_eg/Products/455x455-Advance-eng%20eg_new.jpg",
        fullname:"Jacklin Samson",
        email:"jacklin.samson19@gmal.com",
        password:"jacklin",
        userRole:"ADMIN",
        isActive:true
    })
]

console.log(users)

let done = 0;


for(let i = 0; i < users.length; i++){
    console.log("Save User:" + i);
    users[i].save(function(err,result){
        console.log(result);
        done++;
        if(done === users.length){
            console.log("Done");
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

console.log("End init users");