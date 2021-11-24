const mongoose = require( 'mongoose' );
const mongoosesSchema = new mongoose.Schema({
    mName: String,
    age: String,
})

const Mongoose = mongoose.model('mongooses', mongoosesSchema);

const MongooseModel = {
    save: function(newMongoose){
        return Mongoose.create(newMongoose);
    },
    findAll: function(){
        return Mongoose.find();
    },
    findById: function(id){
        return Mongoose.findById(id);
    },
    update: function(updateMongoose, id){
        console.log("break the object: "+updateMongoose.mName+" "+updateMongoose.age);
        return Mongoose.findByIdAndUpdate({_id: id}, {$set: {mName: updateMongoose.mName, age:updateMongoose.age}});
    },

    delete: function(id){
        return Mongoose.findByIdAndRemove(id);
    }

}


module.exports = {
    MongooseModel
};