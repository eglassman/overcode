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
    },
    "sharedWithClickedStack": function(phraseID){
        return Session.get('clickedStackPhraseIDs').indexOf(phraseID) >= 0
    }
});

Template.correctSolutionsList.helpers({
    "solutions": function() {
        return Stacks.find({}, { sort: {'count': -1} }).fetch();
    }
});

Template.incorrectSolutionsList.helpers({
    "solutions": function() {
        return Stacks.find({}, { sort: {'count_closest_stacks': 1} }).fetch();
    },
    "closestToClickedCorrect": function(closest_stacks){
        // console.log(closest_stacks)
        // return true
        var clickedStack = Session.get('clickedCorrectStack');
        return closest_stacks.indexOf(clickedStack)>=0
    }
});

Template.registerHelper('log',function(){
    console.log('template logging',this);
});

Template.solution.events({
    "click .correct": function(event){
        console.log('correct solution clicked',event,event.currentTarget)
        var clickedCorrectStackID = parseInt($(event.currentTarget).prop('id'));
        var clickedStackPhraseIDs = $(event.currentTarget).data('phraseids');
        clickedStackPhraseIDs = clickedStackPhraseIDs.split(',').map(function(x){return parseInt(x);});
        Session.set('clickedCorrectStack',clickedCorrectStackID)
        Session.set('clickedStackPhraseIDs', clickedStackPhraseIDs)
    }
})
