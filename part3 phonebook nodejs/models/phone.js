const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url).then(result=>{
    console.log('Succesfully connected to MongoDB')
}).catch((error)=>{
    console.log('error while connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
    date: Date,
  });

  personSchema.set('toJSON', {
    transform: (document, returnedObj)=>{
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
  })

  module.exports = mongoose.model('Person', personSchema)