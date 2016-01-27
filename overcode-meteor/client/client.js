Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');
Variables = new Mongo.Collection('variables');


Template.solution.helpers({
    "getPhraseFromID": function(phraseID) {
        return Phrases.findOne({ id: phraseID });
    },
    "createSpace": function(indent) {
        return " ".repeat(indent);
    },
    "clicked": function(stackID){
        return stackID==Session.get('clickedCorrectStack')
    }
});

Template.incorrectSolutionsList.helpers({
    "closestToClickedCorrect": function(closest_stacks){
        // console.log(closest_stacks)
        // return true
        var clickedStack = Session.get('clickedCorrectStack');
        return closest_stacks.indexOf(clickedStack)>=0
    }
})

Template.registerHelper('log',function(){
    console.log('template logging',this);
});
Template.registerHelper('solutions',function(){
    return Stacks.find({}).fetch();
});

Template.solution.events({
    "click .correct": function(event){
        console.log('correct solution clicked',event,event.currentTarget)
        var clickedCorrectStackID = parseInt($(event.currentTarget).prop('id'));
        Session.set('clickedCorrectStack',clickedCorrectStackID)
    }
})
