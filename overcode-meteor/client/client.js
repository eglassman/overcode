Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');
// Variables = new Mongo.Collection('variables');


Template.solution.helpers({
    "getPhraseFromID": function(phraseID) {
        return Phrases.findOne({ id: phraseID });
    },
    "createSpace": function() {
        // this is { phraseID, indent }
        return " ".repeat(this.indent);
    },
    "hasDifferentIndent": function() {
        // whether or not this line appears in the reference solution
        // with different indentation (in other words, whether the indent
        // should be visually distinguished)

        // this is { phraseID, indent }
        var clickedStack = Session.get('clickedStack');
        if (clickedStack === undefined) {
            return false;
        }
        var is_shared = false;
        var matches_exactly = false;
        clickedStack.lines.forEach(function(l) {
            if (l.phraseID == this.phraseID) {
                is_shared = true;
                if (l.indent == this.indent) {
                    matches_exactly = true;
                }
            }
        }, this); // second argument is bound to this within the callback

        return is_shared && !matches_exactly
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
