const express = require('express')
const app = express()
const mongoose = require('mongoose')

//cnx db
const mongoUrl = "mongodb+srv://amel2021:amel2021@cluster1.jktri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(express.json())

mongoose.connect (mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    err ? console.log(err) : console.log('database is connected')
})

const port = 5000
app.listen( port, (err) =>{
    err ? console.log(err) : console.log('server is running on port 5000')
})


const createAndSavePerson = (done) => {
    let faten = new Person({ name: 'faten', age: 25, favoriteFoods: ['sushi'] })
    faten.save((err, data) => {
        err ? console.log(err) : done(null, data)
    })
  };
 
  let arrayOfPeople = [
    { name: 'John', age: 105, favoriteFoods: ['salad', 'burritos'] },
    { name: 'Mary', age: 30, favoriteFoods: ['salad', 'burritos'] },
    { name: 'chahrazed', age: 23, favoriteFoods: ['spaghetti','salad',] },
    { name: 'salah', age: 26, favoriteFoods: ['mechwi', 'burritos'] },
    { name: 'mahmoud', age: 15, favoriteFoods: ['salad', 'pizza'] }
  ];
  
  var createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, createdPeople) => {
        err ? console.log(err) : done(null, createdPeople)
    });
  
  };

  var findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, arrayOfResults) => {
        err ? console.log(err) : done(null, arrayOfResults)
    });
  };
  
  //6 Use model.findOne() to Return a Single Matching Document from Your Database
  var findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: { $all: [food] } }, (err, result) => {
        err ? console.log(err) : done(null, result)
    })
  
  }
  
  //7 Use model.findById() to Search Your Database By _id
  var findPersonById = (personId, done) => {
    Person.findOne(personId, (err, result) => {
        err ? console.log(err) : done(null, result)
    });
  };
  
  //8 Perform Classic Updates by Running Find, Edit, then Save
  var findEditThenSave = (personId, done) => {
    var foodToAdd = 'hamburger';
    Person.findById(personId, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            result.age = 25,
                result.favoriteFoods.push(foodToAdd),
                result.save((err, updatedRecord) => {
                    err ? console.log(err) : done(null, updatedRecord)
                })
        }
    })
  };
  
  //9 Perform New Updates on a Document Using model.findOneAndUpdate()
  var findAndUpdate = (personName, done) => {
    var ageToSet = 20;
    Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedRecord) => {
        err ? console.log(err) : done(null, updatedRecord)
  
    });
  };
  
  //10 Delete One Document Using model.findByIdAndRemove
  var removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, deletedRecord) => {
        err ? console.log(err) : done(null, deletedRecord)
    });
  };
  
  //11 MongoDB and Mongoose - Delete Many Documents with model.remove()
  var removeManyPeople = (done) => {
    var nameToRemove = 'Mary';
    Person.remove({ name: nameToRemove }, (err, jsonStatus) => {
        err ? console.log(err) : done(null, jsonStatus)
    });
  };
  
  //12 Chain Search Query Helpers to Narrow Search Results
  var queryChain = (done) => {
    var foodToSearch = "burritos";
    Person.find({ favoriteFoods: { $all: [foodToSearch] } })
        .sort({ name: 'asc' })
        .limit(3)
        .select('-age')
        .exec((err, filteredResults) => {
            err ? console.log(err) : done(null, filteredResults)
        });
  };