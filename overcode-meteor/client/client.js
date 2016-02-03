Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');
// Variables = new Mongo.Collection('variables');


Template.solution.helpers({
    "getPhraseFromID": function(phraseID) {
        return Phrases.findOne({ id: phraseID });
    },
    "createSpace": function(indent) {
        return " ".repeat(indent);
    },
    "clicked": function(stackID){
        var clickedStack = Session.get('clickedStack');
        return clickedStack !== undefined && stackID == clickedStack.id
    },
    "sharedWithClickedStack": function(phraseID){
        var clickedStack = Session.get('clickedStack');
        if (clickedStack === undefined) {
            return false;
        }
        return clickedStack.phraseIDs.indexOf(phraseID) >= 0
    }
});

Template.filteredSolutions.helpers({
    "filteredSolutions": function() {
        var clickedStack = Session.get('clickedStack');
        if (clickedStack === undefined) {
            // return Stacks.find({}, { sort: {'count': -1} }).fetch();
            return;
        }
        return Stacks.find({
            id: { $in: clickedStack.closest_stacks }
        });
    }
});

Template.solutionsList.helpers({
    "solutions": function() {
        return Stacks.find({}, {sort: {'count': -1}}).fetch();
    }
});

Template.pinnedStack.helpers({
    "getStack": function() {
        return Session.get('clickedStack');
    }
});

// unused
Template.correctSolutionsList.helpers({
    "solutions": function() {
        return Stacks.find({}, { sort: {'count': -1} }).fetch();
    }
});

// unused
Template.incorrectSolutionsList.helpers({
    "solutions": function() {
        return Stacks.find({}, { sort: {'count_closest_stacks': 1} }).fetch();
    },
    "closestToClickedCorrect": function(closest_stacks){
        // TODO: update to get object out of session directly
        var clickedStack = Session.get('clickedStackID');
        if (clickedStack === undefined) {
            return true;
        }
        return closest_stacks.indexOf(clickedStack)>=0
    }
});

Template.body.onRendered(function() {
    console.log('body rendered');

    console.log('window height:', window.innerHeight);
    $('.filtered, .unfiltered').height(window.innerHeight);
});

Template.registerHelper('log',function(){
    console.log('template logging',this);
});

Template.solution.events({
    "click .stack": function(event){
        var clickedStackID = parseInt($(event.currentTarget).prop('id'));
        var clickedStack = Stacks.findOne({id: clickedStackID});
        Session.set('clickedStack', clickedStack);
    }
});

Template.pinnedStack.events({
    "click .remove": function(event) {
        Session.set('clickedStack', undefined);
    }
});
