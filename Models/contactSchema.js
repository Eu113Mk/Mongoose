const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const personSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    age: String,
    favoriteFoods: [String]
    
})

module.exports = Person = mongoose.model("person", personSchema)