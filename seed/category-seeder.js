var Category = require('../model/category')
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/medicare')
console.log("Starting init category");

var categories = [
    new Category({
        imagePath:"health.jpg",
        name:"Health",
        description:"Health"
    }),
    new Category({
        imagePath:"cosmetics.jpg",
        name:"Cosmetics",
        description:"Cosmetics"
    }),
    new Category({
        imagePath:"dietary.jpg",
        name:"Dietary Supplements",
        description:"Dietary Supplements"
    }),
    new Category({
        imagePath:"allergy-icon-flu.jpg",
        name:"Cough, Cold, Fever",
        description:"Cough, Cold, Fever"
    }),
    new Category({
        imagePath:"Nutrition.jpg",
        name:"Nutrition",
        description:"Nutrition"
    }),
    new Category({
        imagePath:"medicine.jpg",
        name:"Medicine",
        description:"Medicine"
    }),
    new Category({
        imagePath:"mouth_and_teeth.jpg",
        name:"Mouth & Teeth",
        description:"Mouth & Teeth"
    }),
    new Category({
        imagePath:"medication.jpg",
        name:"Medication",
        description:"Medication"
    })
]

console.log(categories)

let done = 0;


for(let i = 0; i < categories.length; i++){
    console.log("Save Category:" + i);
    categories[i].save(function(err,result){
        console.log(result);
        done++;
        if(done === categories.length){
            console.log("Done");
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

console.log("End init categories");