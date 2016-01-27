Stacks = new Mongo.Collection('stacks');

Meteor.startup(function () {
    // code to run on server at startup
    //Stacks.insert
    console.log(solutions)
    solutions.forEach(function(sol){
        Stacks.insert(sol);
    })
    
});

