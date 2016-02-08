Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');
// Variables = new Mongo.Collection('variables');


var getPhraseFromID = function(phraseID) {
    return Phrases.findOne({ id: phraseID });
};

var createSpace = function() {
    // this is { phraseID, indent }
    return " ".repeat(this.indent);
};

var clicked = function(stackID){
    var clickedStack = Session.get('clickedStack');
    return clickedStack !== undefined && stackID == clickedStack.id
}

Template.solutionFiltered.helpers({
    "getPhraseFromID": getPhraseFromID,
    "createSpace": createSpace,
    "clicked": clicked,
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
    "sharedWithClickedStack": function(phraseID){
        var clickedStack = Session.get('clickedStack');
        if (clickedStack === undefined) {
            return false;
        }
        return clickedStack.phraseIDs.indexOf(phraseID) >= 0
    }
});

Template.solutionUnfiltered.helpers({
    "getPhraseFromID": getPhraseFromID,
    "createSpace": createSpace,
    "clicked": clicked,
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

var setColumnHeights = function() {
    $('.filtered, .unfiltered').css({
        'height': window.innerHeight,
        // TODO: instead of a hardcoded 100px buffer, set this dynamically
        // to be the height of the last stack. Tried to do so but ran into
        // problems with the stacks not being rendered(? or something) yet.
        'padding-bottom': window.innerHeight - 100
    });
};

Template.body.onRendered(function() {
    setColumnHeights();
    $(window).on('resize', setColumnHeights);
});

Template.registerHelper('log',function(){
    console.log('template logging',this);
});

Template.solutionsList.events({
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

Template.solutionUnfiltered.events({
    "click .showRaw": function(event) {
        // var solnum = this.members[0];
        // console.log(this);
        Meteor.call('getRawCode', this.members, function(err, result) {
            console.log('got result:', result);
            // TODO: how do I actually render this???
        });
    }
})
