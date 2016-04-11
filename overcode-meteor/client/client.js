Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');
RubricEntries = new Mongo.Collection('rubricEntries');
CorrectTestResults = new Mongo.Collection('CorrectTestResults');

Template.rubric.helpers({
    'rubricEntries': function() {
        return RubricEntries.find({});
    }
});

Template.registerHelper('useNewView', function() {
    var use_new = Session.get('useNewView');
    if (use_new === undefined) return true;
    return use_new;
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
        var correct_results = CorrectTestResults.findOne();
        if (correct_results === undefined) return;

        var results = []
        for (var i = 0; i < ordered_testcases.length; i++) {
            var test = ordered_testcases[i];
            results.push({
                test: test,//.slice(6), // remove 'print '
                output: this.test_input_outputs[test],
                correct: this.error_vector[i],
                correct_output: correct_results[test]
            });
        }
        return results
    },
    "getScore": function() {
        return get_score_and_comments(this).score;
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
    },
    'firstUngraded': function() {
        var one_stack = Stacks.findOne({ graded: false })
        return one_stack ? one_stack.id : undefined;
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

var set_all_vectors_checkbox = function() {
    if ($('.error-vector-checkbox').get().every(function(el) {
        return $(el).prop('checked');
    })) {
        $('#all-error-vectors').prop('checked', true);
    } else {
        $('#all-error-vectors').prop('checked', false);
    }
}

Template.filterPanel.helpers({
    "solutions": getAllSolutions,
    "errorVectors": function() {
        var stacks = getAllSolutions();

        var results = []
        var distinct_error_vectors = {};
        stacks.forEach(function(item){
            var error_vector = item.error_vector;
            var error_vector_string = error_vector.toString();

            if (distinct_error_vectors[error_vector_string] === undefined) {
                distinct_error_vectors[error_vector_string] = {
                    error_vector: error_vector,
                    num_passed: item.num_passed_tests,
                    total_num: item.total_num_tests,
                    solution_count: item.count
                }
                results.push(distinct_error_vectors[error_vector_string]);
            } else {
                distinct_error_vectors[error_vector_string].solution_count += item.count;
            }
        });

        results.sort(function(e1, e2) {
            // sort in descending order of number of passed tests
            return e2.num_passed - e1.num_passed || e2.solution_count - e1.solution_count;
        });

        // Also make sure the session variables are set
        // TODO: this is probably NOT the right place to put this
        var error_vector_strings = Object.keys(distinct_error_vectors);
        Session.set('allErrorVectors', error_vector_strings);
        // Session.set('checkedErrorVectors', error_vector_strings);
        // $('#all-error-vectors').prop('checked', true);

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
    // "pairs": function() {
    //     var results = []
    //     for (var test in this) {
    //         if (! this.hasOwnProperty(test)) continue;
    //         results.push({
    //             'test': test.slice(6), // remove 'print '
    //             'result': this[test]
    //         });
    //     }
    //     return results
    // }
    "validOutput": function() {
        return this.output !== '';
    }
});

Template.rubricRow.helpers({
    "shouldBeChecked": function() {
        var stack_data = Template.parentData(1);
        if (!stack_data) {
            return false;
        }
        var target_deduction = {
            value: this.pointValue,
            text: this.text
        }

        for (var i = 0; i < stack_data.deductions.length; i++) {
            var d = stack_data.deductions[i];
            if (d.value == target_deduction.value && d.text == target_deduction.text) {
                return true;
            }
        }
        return false;
        // var deduction_string = this.pointValue + ' ' + this.text
        // return stack_data.comment.indexOf(deduction_string) !== -1
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

Template.stacey_body.onRendered(function() {
    setColumnHeights();
    $(window).on('resize', setColumnHeights);
});
Template.stacey_body.events({
    "click .toggle-views": function(event){
        var use_new = Session.get('useNewView');
        console.log(use_new)
        if (use_new === false) {
            Session.set('useNewView',true);
        } else {
            Session.set('useNewView',false);
        }
        console.log(Session.get('useNewView'))
    }
})

Template.registerHelper('log',function(){
    console.log('template logging',this);
});

Template.registerHelper('inFilteredSet', function() {
    var checked_error_vectors = Session.get('checkedErrorVectors');
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
    $('.solution-list').scrollTop(0);
};

// var get_score_from_comment = function(comment) {
//     var deduction_pattern = /[+-]?\d+/g;
//     var matches = comment.match(deduction_pattern);
//     if (matches === null) return;

//     // console.log('matches:', matches);
//     var score_deltas = matches.map(function(el) {
//         return parseInt(el);
//     });
//     // console.log('parsed matches:', score_deltas);
//     var score_delta_sum = 0;
//     for (var i = 0; i < score_deltas.length; i++) {
//         score_delta_sum += score_deltas[i];
//     }

//     var max_score = Stacks.findOne().total_num_tests;
//     var score = score_delta_sum > 0 ? score_delta_sum : max_score + score_delta_sum;
//     console.log('calculated score:', score);
//     return score;
// }

// var update_grade = function(input, score_or_comment) {
//     var form = input.parents('.grade');
//     var _id = form.data('record-id');
//     var stack_id = form.data('id');

//     var score = form.find('.score-input').val();
//     var comment = form.find('.comment-input').val();

//     if (score_or_comment == 'comment') {
//         var calculated_score = get_score_from_comment(comment);
//         // TODO: this line causes issues sometimes with handlers triggering each other
//         form.find('.score-input').val(calculated_score);
//         score = calculated_score
//     }

//     var grade_obj = { id: stack_id, score: score, comment: comment };

//     Stacks.update(_id, { $set: {
//         score: score,
//         graded: score !== '',
//         comment: comment
//     }}, function(err, num_updated) {
//         grade_update_callback(err, grade_obj);
//     });
// }

// var grade_update_callback = function(err, object) {
//     if (err){
//         // returns error if no matching object found
//         alert('Error syncing grade: ',err)
//         return;
//     }
//     Meteor.call('writeGrade', object);
// };

var get_score_and_comments = function(stack) {
    var calculated_score = stack.total_num_tests;
    var all_comments_text = [];
    if (stack.comment !== undefined) {
        all_comments_text.push(stack.comment);
    }
    stack.deductions.forEach(function(d) {
        all_comments_text.push(d.value.toString() + ' ' + d.text);
        calculated_score += d.value;
    });
    calculated_score += stack.fudge_factor || 0;
    return { 'score': Math.max(calculated_score, 0), 'comment': all_comments_text.join('; ') };
}

var calculate_and_write_grade = function(stack_id) {
    var stack = Stacks.findOne({ id: stack_id });
    if (stack === undefined) return;

    // start at full credit
    // var calculated_score = stack.total_num_tests;
    // var all_comments_text = [];
    // if (stack.comment !== undefined) {
    //     all_comments_text.push(stack.comment);
    // }
    // stack.deductions.forEach(function(d) {
    //     all_comments_text.push(d.value.toString + ' ' + d.text);
    //     calculated_score += d.value;
    // });

    // calculated_score += stack.fudge_factor;
    // comment_text += all_comments_text.join('\n');
    // console.log('comments:', comment_text, 'calculated_score:', calculated_score);
    var r = get_score_and_comments(stack);
    var grade_obj = { id: stack_id, score: r.score, comment: r.comment };
    // console.log(grade_obj);
    Meteor.call('writeGrade', grade_obj);
}

Template.solution.events({
    // "click .closer-to": function(event) {
    //     var clickedStack = $(event.currentTarget).data('closer');
    //     setClickedStack(clickedStack);
    // },
    "click .pin-button": function(event) {
        var clickedStackID = parseInt($(event.currentTarget).data('id'));
        setClickedStack(clickedStackID);
    },
    "change .fudge-input": function(event) {
        var fudge_input = $(event.target);
        // update_grade(fudge_input, 'score');
        var form = fudge_input.parents('.grade');
        var _id = form.data('record-id');
        Stacks.update(
            { _id: _id },
            { $set: { 'fudge_factor': parseInt(fudge_input.val()) }},
            function(err, num_updated) {
                calculate_and_write_grade(form.data('id'));
            });
    },
    "change .comment-input": function(event) {
        var comment_input = $(event.target);
        // console.log('form:', comment_input.parents('.grade'));

        var form = comment_input.parents('.grade');
        var _id = form.data('record-id');
        Stacks.update(
            { _id: _id },
            { $set: { 'comment': comment_input.val() }},
            function(err, num_updated) {
                calculate_and_write_grade(form.data('id'));
            });

        // update_grade(comment_input, 'comment');
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
        var point_input = form.find('.deduction-value-input');
        var text_input = form.find('.deduction-text-input');
        var point_value = point_input.val();
        var text = text_input.val();

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

        var deduction_item = { deductions: {
            value: parseInt(deduction_value),
            text: deduction_text
        }};

        // console.log('deduction:', deduction_item);

        var form = parent_row.parents('.grade');
        var _id = form.data('record-id');
        var stack_id = form.data('id');

        if (checked) {
            Stacks.update({ _id: _id }, {
                $push: deduction_item
            }, function(err, num_updated) {
                calculate_and_write_grade(stack_id);
            });
        } else {
            Stacks.update({ _id: _id }, {
                $pull: deduction_item
            }, function(err, num_updated) {
                calculate_and_write_grade(stack_id);
            });
        }
        // var item_text = deduction_value + ' ' + deduction_text;

        // var grade_form = parent_row.parents('.grade');
        // var comment_box = grade_form.find('.comment-input');
        // var old_comment = comment_box.val();

        // if (checked) {
        //     // Adding a deduction
        //     var new_text = old_comment && !old_comment.endsWith('; ') ? '; ': '';
        //     new_text += item_text;
        //     comment_box.val(old_comment + new_text);
        // } else {
        //     // removing a deduction
        //     var new_text1 = old_comment.replace(item_text + '; ', '');
        //     var new_text2 = new_text1.replace(item_text, '');

        //     comment_box.val(new_text2);
        // }
        // update_grade(comment_box, 'comment');
    },
    "click .remove-deduction": function(event) {
        event.preventDefault();
        // stopPropagation makes the dropdown stay open
        event.stopPropagation();

        RubricEntries.remove({ _id: this._id });
        var all_stacks = Stacks.find({}).fetch();
        for (var i = 0; i < all_stacks.length; i++) {
            var stack = all_stacks[i];
            var deductions = stack.deductions;
            for (var j = 0; j < deductions.length; j++) {
                if (deductions[j].value == this.pointValue && deductions[j].text == this.text) {
                    var deduction_item = { value: parseInt(this.pointValue), text: this.text };
                    Stacks.update({ _id: stack._id }, {
                        $pull: { deductions: deduction_item}
                    });
                }
            }
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
            Session.set('checkedErrorVectors', currently_checked);
        }

        set_all_vectors_checkbox();
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
