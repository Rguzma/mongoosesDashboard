const express = require('express');

const app = express();
app.use( express.urlencoded({extended:true}) );

app.set('views',__dirname + '/views');
app.set('views engine', 'ejs' );

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoosesSchema', {useNewUrlParser: true});


const {MongooseModel} = require ('./models/MongooseModel');

//To create form
app.get ('/mongoose/new', function(request, response){///aqui estamos creando las rutas.
	response.render('newMongoose.ejs' );

});

//To edit form
app.get ('/mongooses/edit/:_id', function(request, response){
    console.log("The mongoose id requested is: ", request.params._id);
    let id = request.params._id;
    console.log(id);
    MongooseModel.findById(id)
    .then(data => response.render("mongooseEdit.ejs", {mongooses:data}))
    .catch(err => response.json(err));
});
// app.get ('/mongooses/edit/:_id', function(request, response){
//     console.log("The mongoose id requested is: ", request.params._id);
//     MongooseModel.find({_id: request.params._id}, function(err,response){
//     if (err) {console.log(err);}
//     response.render('mongooseEdit.ejs', {mongooses:response[0]})
//     });
// });




//To index
app.get ('/', function(request, response){
        // console.log("info del get "+request+" or ")
        MongooseModel.findAll()
        .then(data => response.render("index.ejs", {mongooses:data}))
        .catch(err => response.render('index.ejs'));
    

});

//Create Mongoose
app.post( '/mongooses', function( request, response ){
    let mName = request.body.mName;
    let age = request.body.age;
            newMongoose = {
                mName,
                age
            };

            MongooseModel.save(newMongoose)
                .then( newData => console.log('new mongoose: ', newData))
                .catch(err => console.log(err));
            response.redirect('/')
});
//Update Mongoose
app.post( '/mongooses/:_id', function( request, response ){
    let id = request.params._id;
    let mName = request.body.mName;
    let age = request.body.age;
            updateMongoose = {
                mName,
                age
            };

            MongooseModel.update(updateMongoose, id)
                .then( newData => console.log('update mongoose: ', newData))
                .catch(err => console.log(err));
            response.redirect('/')
});
//Delete Mongoose
app.post( '/mongooses/destroy/:_id', function( request, response ){
    let id = request.params._id;
    MongooseModel.delete(id)
    .then(response.redirect("/"))
    .catch(err => response.json(err));
});



app.listen(8080, function (){//este es el cierre

	console.log("the user server is running in port 8080");
});