Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');

var getPhraseFromID = function(phraseID) {
    return Phrases.findOne({ id: phraseID });
};

var clicked = function(){
    var clickedStack = Session.get('clickedStack');
    return clickedStack !== undefined && this.id == clickedStack.id
}

var sharedWithClickedStack = function(phraseID){
    var clickedStack = Session.get('clickedStack');
    if (clickedStack === undefined) {
        return false;
    }
    return clickedStack.phraseIDs.indexOf(phraseID) >= 0
};

Template.solution.helpers({
    "getPhraseFromID": getPhraseFromID,
    "clicked": clicked,
    "createSpace": function() {
        var diff = this.indentDiff !== undefined ? Math.abs(this.indentDiff / 4) : 0;
        var space = " ".repeat(this.indent - diff);
        if (this.indentDiff !== undefined) {
            var character = this.indentDiff > 0 ? "&rarr;" : "&larr;"
            space += character.repeat(diff);
        }
        return space
    },
    "hasDifferentIndent": function() {
        // whether or not this line appears in the reference solution
        // with different indentation (in other words, whether the indent
        // should be visually distinguished)

        // this is { phraseID, indent }
        // var clickedStack = Session.get('clickedStack');
        // if (clickedStack === undefined) {
        //     return false;
        // }
        // var is_shared = false;
        // var matches_exactly = false;
        // var indentation_difference;
        // clickedStack.lines.forEach(function(l) {
        //     if (l.phraseID == this.phraseID) {
        //         is_shared = true;
        //         if (l.indent == this.indent) {
        //             matches_exactly = true;
        //         } else if ( !matches_exactly && (indentation_difference === undefined)) {
        //             indentation_difference = l.indent - this.indent;
        //         }
        //     }
        // }, this); // second argument is bound to this within the callback

        // if (is_shared && !matches_exactly) {
        //     this.indentDiff = indentation_difference;
        //     return true;
        // }
        return false;
    },
    "sharedWithClickedStack": sharedWithClickedStack
});

// Template.filteredSolutions.helpers({
//     "filteredSolutions": function() {
//         var clickedStack = Session.get('clickedStack');
//         if (clickedStack === undefined) {
//             return;
//         }
//         return Stacks.find({
//             id: { $in: clickedStack.closest_stacks }
//         });
//     }
// });

// Template.solutionsList.helpers({
//     "solutions": function() {
//         return Stacks.find({}, {sort: {'count': -1}}).fetch();
//     }
// });


var getAllSolutions = function() {
    return Stacks.find({}).fetch();
}

var findClosestStack = function(stack) {
    var stack_to_dist = stack.correct_stack_distances;
    var best_metric = 0;
    var best_stack;
    for (var key in stack_to_dist) {
        if (!stack_to_dist.hasOwnProperty(key)) continue;
        if (stack_to_dist[key] > best_metric) {
            best_metric = stack_to_dist[key];
            best_stack = key;
        }
    }
    return best_stack;
}

var getIncorrectsInOrder = function() {
    var pinnedCorrectStack = Session.get('pinnedCorrectStack');
    if (pinnedCorrectStack === undefined) {
        return getAllSolutions();
    }

    var field_name = 'correct_stack_distances.' + pinnedCorrectStack.id;
    var sort_dict = {};
    sort_dict[field_name] = -1;

    var orderedIncorrects = Stacks.find({ correct: false }, { sort: sort_dict }).fetch();

    // find the closest correct stack
    // orderedIncorrects.forEach(function(s) {
    //     var closest = findClosestStack(s);
    //     if (closest !== undefined && closest != pinnedCorrectStack.id) {
    //         s.closest = closest;
    //     }
    // });
    return orderedIncorrects;
}

var getCorrectsInOrder = function() {
    var pinnedIncorrectStack = Session.get('pinnedIncorrectStack');
    if (pinnedIncorrectStack === undefined || pinnedIncorrectStack.correct) {
        return Stacks.find({ correct: true }).fetch();
    }

    var distances = pinnedIncorrectStack.correct_stack_distances;
    var correct_stacks = Stacks.find({ correct: true }).fetch();
    correct_stacks.sort(function(s1, s2) {
        return distances[s2.id] - distances[s1.id]
    });

    return correct_stacks;
}

Template.correctSolutionsList.helpers({
    "solutions": getCorrectsInOrder
});

Template.incorrectSolutionsList.helpers({
    "solutions": getIncorrectsInOrder
});

var setColumnHeights = function() {
    $('.solution-list').css({
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

var setClickedStack = function(clickedStackID) {
    var clickedStack = Stacks.findOne({ id: clickedStackID });
    var whichStack = clickedStack.correct ? 'pinnedCorrectStack': 'pinnedIncorrectStack';

    var previousClickedStack = Session.get('clickedStack');
    if (previousClickedStack !== undefined && previousClickedStack.id === clickedStack.id) {
        Session.set('clickedStack', undefined);
        return;
    }

    Session.set(whichStack, clickedStack);
    Session.set('clickedStack', clickedStack);
};

// Template.solutionCorrect.events({
//     "click .showRaw": function(event) {
//         // var solnum = this.members[0];
//         // console.log(this);
//         Meteor.call('getRawCode', this.members, function(err, result) {
//             console.log('got result:', result);
//             // TODO: how do I actually render this???
//         });
//     },
//     "click .stack": function(event) {
//         var clickedStackID = parseInt($(event.currentTarget).prop('id'));
//         setClickedStack(clickedStackID);
//     }
// });

Template.solution.events({
    // "click .closer-to": function(event) {
    //     var clickedStack = $(event.currentTarget).data('closer');
    //     setClickedStack(clickedStack);
    // },
    "click .pin-button": function(event) {
        var clickedStackID = parseInt($(event.currentTarget).data('id'));
        setClickedStack(clickedStackID);
    },
    "change .score-input": function(event) {
        var score_input = $(event.target);
        var score = score_input.val();
        // var comment = form.find('.comment-input').val();
        var _id = score_input.data('record-id');

        var gradestatus = score === '' ? 'unchecked' : 'check';
        Stacks.update(
            _id,
            { $set: { score: score, gradestatus: gradestatus }},
            gradeUpdateCallback
        );
    },
    "change .comment-input": function(event) {
        var comment_input = $(event.target);
        var comment = comment_input.val();
        var _id = comment_input.data('record-id');
        Stacks.update(_id, { $set: {comment: comment }}, gradeUpdateCallback);
    }
});

var gradeUpdateCallback = function(err, object) {
    if (err){
        // returns error if no matching object found
        alert('Error syncing grade: ',err)
    } else {
        // console.log('success',object);
    }
};

// Template.body.events({
//     "submit .grade": function(event) {
//         event.preventDefault();

//         var form = $(event.target);
//         var score = form.find('.score-input').val();
//         var comment = form.find('.comment-input').val();
//         var _id = form.data('record-id');

//         var gradestatus = score === '' ? 'unchecked' : 'check';
//         Stacks.update(
//             _id, 
//             { $set: { score: score, comment: comment, gradestatus: gradestatus }},
//             gradeUpdateCallback
//         );
//     }
// });
