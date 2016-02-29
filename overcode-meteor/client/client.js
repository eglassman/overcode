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

Template.gradedCount.helpers({
    'numGraded': function() {
        return Stacks.find({ graded: true }).count();
    },
    'totalNum': function() {
        return Stacks.find({}).count();
    }
});

var getAllSolutions = function() {
    return Stacks.find({}, { sort: { id: 1 }}).fetch();
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
    var clickedStack = Session.get('clickedStack');
    if (clickedStack === undefined) {
        return getAllSolutions();
    }
    var distances = clickedStack.stack_distances;

    var orderedIncorrects = Stacks.find({ correct: false }).fetch();
    orderedIncorrects.sort(function(s1, s2) {
        return distances[s2.id] - distances[s1.id]
    });

    return orderedIncorrects;
}

var getCorrectsInOrder = function() {
    var clickedStack = Session.get('clickedStack');
    if (clickedStack === undefined) {
        return getAllSolutions();
    }
    var distances = clickedStack.stack_distances;

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

    var previousClickedStack = Session.get('clickedStack');
    if (previousClickedStack !== undefined && previousClickedStack.id === clickedStack.id) {
        Session.set('clickedStack', undefined);
        return;
    }
    Session.set('clickedStack', clickedStack);
};

var update_grade = function(input, score_or_comment) {
    var form = input.parents('.grade');
    var _id = form.data('record-id');
    var stack_id = form.data('id');

    var score = form.find('.score-input').val();
    var comment = form.find('.comment-input').val();

    var grade_obj = { id: stack_id, score: score, comment: comment };

    Stacks.update(_id, { $set: {
        score: score,
        graded: score !== '',
        comment: comment
    }}, function(err, num_updated) {
        grade_update_callback(err, grade_obj);
    });
}

var grade_update_callback = function(err, object) {
    if (err){
        // returns error if no matching object found
        alert('Error syncing grade: ',err)
        return;
    }
    Meteor.call('writeGrade', object);
};

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
        update_grade(score_input, 'score');
    },
    "change .comment-input": function(event) {
        var comment_input = $(event.target);
        update_grade(comment_input, 'comment');
    },
    "dblclick .stack": function(event) {
        var stack = $(event.currentTarget);
        stack.parent().find('.raw-solution').toggleClass('hidden');
    }
});

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
//             grade_update_callback
//         );
//     }
// });
