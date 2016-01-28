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
        return stackID==Session.get('clickedStackID')
    },
    "sharedWithClickedStack": function(phraseID){
        var referenceIDs = Session.get('clickedStackPhraseIDs');
        if (referenceIDs === undefined) {
            return false;
        }
        return Session.get('clickedStackPhraseIDs').indexOf(phraseID) >= 0
    }
});

Template.solutionsList.helpers({
    "solutions": function() {
        var stackID = Session.get('clickedStackID');
        if (stackID === undefined) {
            return Stacks.find({}, { sort: {'count': -1} }).fetch();
        }
        return Stacks.find({ $or: [
                { id: stackID },
                // stupid hack: Meteor doesn't support $eq, apparently, so use
                // $in instead
                { closest_stacks: {$elemMatch: {$in: [stackID]}} }
        ]}, { sort: {'count': -1} }).fetch();
    }
});

Template.pinnedStack.helpers({
    "getStack": function() {
        var stackID = Session.get('clickedStackID');
        if (stackID === undefined) {
            return;
        }
        return Stacks.findOne({ id: stackID });
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
        var clickedStack = Session.get('clickedStackID');
        if (clickedStack === undefined) {
            return true;
        }
        return closest_stacks.indexOf(clickedStack)>=0
    }
});

Template.registerHelper('log',function(){
    console.log('template logging',this);
});

Template.solution.events({
    "click .stack": function(event){
        console.log('solution clicked')
        var clickedStackID = parseInt($(event.currentTarget).prop('id'));
        var clickedStackPhraseIDs = $(event.currentTarget).data('phraseids');
        clickedStackPhraseIDs = clickedStackPhraseIDs.split(',').map(function(x) {
            return parseInt(x);
        });
        Session.set('clickedStackID', clickedStackID)
        Session.set('clickedStackPhraseIDs', clickedStackPhraseIDs)
    }
});

Template.pinnedStack.events({
    "click .remove": function(event) {
        console.log('pinned stack clicked');
        Session.set('clickedStackID', undefined);
        Session.set('clickedStackPhraseIDs', undefined);
    }
});
