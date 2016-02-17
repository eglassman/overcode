Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');
// Variables = new Mongo.Collection('variables');


var getPhraseFromID = function(phraseID) {
    return Phrases.findOne({ id: phraseID });
};

var clicked = function(stackID){
    var clickedStack = Session.get('clickedStack');
    return clickedStack !== undefined && stackID == clickedStack.id
}

var sharedWithClickedStack = function(phraseID){
    var clickedStack = Session.get('clickedStack');
    if (clickedStack === undefined) {
        return false;
    }
    return clickedStack.phraseIDs.indexOf(phraseID) >= 0
};

Template.solutionIncorrect.helpers({
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

Template.solutionCorrect.helpers({
    "getPhraseFromID": getPhraseFromID,
    "clicked": clicked,
    "createSpace": function() {
        // this is { phraseID, indent }
        return " ".repeat(this.indent);
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

Template.solutionsList.helpers({
    "solutions": function() {
        return Stacks.find({}, {sort: {'count': -1}}).fetch();
    }
});

// Template.pinnedStack.helpers({
//     "getStack": function() {
//         return Session.get('clickedStack');
//     }
// });

var getAllSolutions = function() {
    return Stacks.find({}).fetch();
}

// var findCrossoverInfo = function(orderedIncorrects) {
//     var clickedStack = Session.get('clickedStack');
//     for (var i = 0; i < orderedIncorrects.length; i++) {
//         var this_stack = orderedIncorrects[i];
//         var stack_to_dist = this_stack.correct_stack_distances;
//         var current_metric = stack_to_dist[clickedStack.id]
//         for (var key in stack_to_dist) {
//             if (!stack_to_dist.hasOwnProperty(key)) continue;
//             if (stack_to_dist[key] > current_metric) {
//                 // console.log('checking stack', this_stack, 'current metric:', current_metric);
//                 // crossover_index = i;
//                 // console.log('found better key:', key, 'setting index to:', crossover_index);
//                 // break;
//                 return { index: i, betterKey: key };
//             }
//         }
//     }
//     return null;
// }

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

    // find crossover point
    // var crossover_info = findCrossoverInfo(orderedIncorrects);
    // var separator = { isSeparator: true, betterKey: crossover_info.betterKey };
    // if (crossover_info !== null) {
    //     orderedIncorrects.splice(crossover_info.index, 0, separator);
    // }
    orderedIncorrects.forEach(function(s) {
        var closest = findClosestStack(s);
        if (closest !== undefined && closest != pinnedCorrectStack.id) {
            s.closest = closest;
        }
    })
    // console.log(orderedIncorrects);
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
    // console.log('correct stacks in order:', closest_stacks);

    return correct_stacks;
}

Template.correctSolutionsList.helpers({
    "solutions": getCorrectsInOrder//getAllSolutions
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
    Session.set(whichStack, clickedStack);
    Session.set('clickedStack', clickedStack);
};

// Template.solutionsList.events({
//     "click .stack": function(event) {
//         var clickedStackID = parseInt($(event.currentTarget).prop('id'));
//         setClickedStack(clickedStackID);
//     }
// });

// Template.correctSolutionsList.events({
//     "click .stack": function(event) {
//         var clickedStackID = parseInt($(event.currentTarget).prop('id'));
//         setClickedStack(clickedStackID);
//     }
// });

// Template.pinnedStack.events({
//     "click .remove": function(event) {
//         Session.set('clickedStack', undefined);
//     }
// });

Template.solutionCorrect.events({
    "click .showRaw": function(event) {
        // var solnum = this.members[0];
        // console.log(this);
        Meteor.call('getRawCode', this.members, function(err, result) {
            console.log('got result:', result);
            // TODO: how do I actually render this???
        });
    },
    "click .stack": function(event) {
        var clickedStackID = parseInt($(event.currentTarget).prop('id'));
        setClickedStack(clickedStackID);
    }
});

Template.solutionIncorrect.events({
    "click .closer-to": function(event) {
        var clickedStack = $(event.currentTarget).data('closer');
        setClickedStack(clickedStack);
    },
    "click .stack": function(event) {
        var clickedStackID = parseInt($(event.currentTarget).prop('id'));
        setClickedStack(clickedStackID);
    }
});
