Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');
RubricEntries = new Mongo.Collection('rubricEntries');

Template.rubric.helpers({
    'rubricEntries': function() {
        return RubricEntries.find({});
    }
});


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
    "sharedWithClickedStack": sharedWithClickedStack,
    "testResultInformation": function() {
        var ordered_testcases = this.testcases;

        var results = []
        for (var i = 0; i < ordered_testcases.length; i++) {
            var test = ordered_testcases[i];
            results.push({
                test: test,
                output: this.test_input_outputs[test],
                correct: this.error_vector[i]
            });
        }
        return results
    }
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

var arrays_equal = function(arr1, arr2) {
    if (arr1.length != arr2.length) return false;
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

var contains_array = function(array_of_arrays, el) {
    for (var i = 0; i < array_of_arrays.length; i++) {
        if (arrays_equal(array_of_arrays[i], el)) return true;
    }
    return false;
}

Template.filterPanel.helpers({
    "solutions": getAllSolutions,
    "errorVectors": function() {
        var stacks = getAllSolutions();

        var results = []
        var distinct_error_vectors = [];
        stacks.forEach(function(item){
            var error_vector = item.error_vector;
            if (! contains_array(distinct_error_vectors, error_vector)){
                distinct_error_vectors.push(error_vector);
                results.push({
                    error_vector: error_vector,
                    num_passed: item.num_passed_tests,
                    total_num: item.total_num_tests
                });
            }
        })
        // console.log(distinct_error_vectors)
        results.sort(function(e1, e2) {
            // sort in descending order of number of passed tests
            return e2.num_passed - e1.num_passed
        });
        var error_vector_strings = distinct_error_vectors.map(function(el) {
            return el.toString()
        });

        // Also make sure the session variables are set
        // TODO: this is probably NOT the right place to put this
        Session.set('allErrorVectors', error_vector_strings);
        var currently_checked = Session.get('checkedErrorVectors');
        if (currently_checked === undefined) {
            Session.set('checkedErrorVectors', error_vector_strings);
        }

        return results
    },
    "renderVector": function() {
        var icons = ""
        for(var i = 0; i < this.error_vector.length; i++) {
            if (this.error_vector[i]) {
                icons += '<span class="test-indicator color-correct glyphicon glyphicon-ok"></span> ';
            } else {
                icons += '<span class="test-indicator color-incorrect glyphicon glyphicon-minus"></span> ';
            }
        }
        return icons;
    },
    "shouldBeChecked": function() {
        var currently_checked = Session.get('checkedErrorVectors');
        return currently_checked !== undefined && currently_checked.includes(this.error_vector.toString());
    }
});

Template.correctSolutionsList.helpers({
    "solutions": getCorrectsInOrder
});

Template.incorrectSolutionsList.helpers({
    "solutions": getIncorrectsInOrder
});

Template.testResults.helpers({
    "pairs": function() {
        var results = []
        for (var test in this) {
            if (! this.hasOwnProperty(test)) continue;
            results.push({
                'test': test.slice(6), // remove 'print '
                'result': this[test]
            });
        }
        return results
    }
});

Template.rubricRow.helpers({
    "shouldBeChecked": function() {
        var stack_data = Template.parentData(1);
        if (!stack_data || stack_data.comment === undefined) {
            return false;
        }
        var deduction_string = this.pointValue + ' ' + this.text
        return stack_data.comment.indexOf(deduction_string) !== -1
    }
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

Template.registerHelper('inFilteredSet', function() {
    var checked_error_vectors = Session.get('checkedErrorVectors');
    // console.log(this.error_vector.toString());
    return checked_error_vectors !== undefined &&
        checked_error_vectors.includes(this.error_vector.toString());
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
    "click .show-raw": function(event) {
        var button = $(event.currentTarget);
        button.parents('.stack-wrapper').find('.raw-solution').toggleClass('hidden');
        button.toggleClass('not-shown shown');
        var btn_text = (button.hasClass('shown') ? 'Hide' : 'Show') + ' raw solution(s)';
        button.text(btn_text);
    },
    "click .show-test-results": function(event) {
        var button = $(event.currentTarget);
        button.parents('.stack-wrapper').find('.test-results').toggleClass('hidden');
        button.toggleClass('not-shown shown');
        var btn_text = (button.hasClass('shown') ? 'Hide' : 'Show') + ' test results';
        button.text(btn_text);
    }
});

Template.rubric.events({
    "click .add-deduction": function(event) {
        event.preventDefault();

        var form = $(event.target).parents('.form-group');
        console.log('form group:', form);
        var point_input = form.find('.deduction-value-input');
        var text_input = form.find('.deduction-text-input');
        var point_value = point_input.val();
        var text = text_input.val();

        // console.log('point value:', point_value, 'text:', text);

        if (point_value && text) {
            RubricEntries.insert({ pointValue: point_value, text: text });
            point_input.val('');
            text_input.val('');
        }
    },
    "change .deduction-checkbox": function(event) {
        var checkbox = $(event.target);
        var checked = checkbox.prop('checked');

        var parent_row = $(checkbox.parents('.row').get(0));
        var deduction_value = parent_row.find('.deduction-value').text().trim();
        var deduction_text = parent_row.find('.deduction-text').text().trim();

        var item_text = deduction_value + ' ' + deduction_text;

        var grade_form = parent_row.parents('.grade');
        var comment_box = grade_form.find('.comment-input');
        var old_comment = comment_box.val();

        if (checked) {
            // Adding a deduction
            var new_text = old_comment && !old_comment.endsWith('; ') ? '; ': '';
            new_text += item_text;
            comment_box.val(old_comment + new_text);
            comment_box.trigger('change');
        } else {
            // removing a deduction
            var new_text1 = old_comment.replace(item_text + '; ', '');
            var new_text2 = new_text1.replace(item_text, '');

            comment_box.val(new_text2);
            comment_box.trigger('change');
        }

    }
});

Template.filterPanel.events({
    "change .error-vector-checkbox": function(event) {
        var target = $(event.currentTarget);
        var vec = target.data('vector');
        var currently_checked = Session.get('checkedErrorVectors');

        if (target.prop('checked')) {
            if (currently_checked === undefined) {
                Session.set('checkedErrorVectors', [vec]);
            } else {
                if (! currently_checked.includes(vec)) {
                    currently_checked.push(vec);
                    Session.set('checkedErrorVectors', currently_checked)
                }
            }
        } else {
            currently_checked.splice(currently_checked.indexOf(vec), 1);
            $('#all-error-vectors').prop('checked', false);
            Session.set('checkedErrorVectors', currently_checked);
        }

        // var test = [vec, vec]
        // console.log(test)
    },
    "change #all-error-vectors": function(event) {
        if ($('#all-error-vectors').prop('checked')) {
            $('.error-vector-checkbox').prop('checked', true);
            Session.set('checkedErrorVectors', Session.get('allErrorVectors'));
        } else {
            $('.error-vector-checkbox').prop('checked', false);
            Session.set('checkedErrorVectors', []);
        }
    }
})
