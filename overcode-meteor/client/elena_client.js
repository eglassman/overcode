Template.elena_rubric.helpers({
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


Template.elena_solution.helpers({
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
    "sharedWithPreviousStack": function(){
        var current_stack_id = Template.parentData(1).id;
        var previous_stack_id = Template.parentData(1).previous_stack_id;
        var previousStack = Stacks.findOne({id: previous_stack_id});
        //console.log('Template.parentData(1)',Template.parentData(1))
        //console.log('Template.parentData(2)',Template.parentData(2))
        return previousStack.phraseIDs.indexOf(this.phraseID) >= 0
    },
    "testResultInformation": function() {
        var ordered_testcases = this.testcases;
        var correct_results = CorrectTestResults.findOne();
        if (correct_results === undefined) return;

        var results = []
        for (var i = 0; i < ordered_testcases.length; i++) {
            var test = ordered_testcases[i];
            results.push({
                test: test.slice(6), // remove 'print '
                output: this.test_input_outputs[test],
                correct: this.error_vector[i],
                correct_output: correct_results[test]
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

Template.elena_gradedCount.helpers({
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

var isTrue = function(arg){return (arg === 'true')}

var getSolutionsInOrder = function() {

    //return Stacks.find({}).fetch();

    var checked_error_vectors = Session.get('checkedErrorVectors');
    //console.log(checked_error_vectors)
    //console.log(checked_error_vectors[0])
    if (checked_error_vectors==undefined){
        return Stacks.find({}).fetch();
    } else {
        //iterate over checked_error_vectors
        var filteredSolutions = [];
        for (var i=0; i<checked_error_vectors.length; i++){
            var err_vec_split = checked_error_vectors[i].split(',');
            var parsed_error_vector = err_vec_split.map(isTrue);
            filteredSolutions = filteredSolutions.concat(Stacks.find({error_vector: parsed_error_vector}).fetch());
        }
        //console.log('filteredSolutions',filteredSolutions)
    }

    var max_value = 0;
    var max_pair = -1;
    var max_index = -1;
    console.log('max_value',max_value)
    console.log('max_pair',max_pair)
    console.log('max_index',max_index)

    console.log('filteredSolutions, pre iteration',filteredSolutions)
    for (var i in filteredSolutions){
        var origin_sol_id = filteredSolutions[i].id;
        for (var sol_id in filteredSolutions[i].stack_distances){
            var distance_between_solutions = filteredSolutions[i].stack_distances[sol_id];
            if (distance_between_solutions >= max_value && origin_sol_id!=sol_id){
                max_value = distance_between_solutions;
                max_pair = [origin_sol_id,sol_id];
                max_index = i; //index of origin_sol_id in filteredSolutions
                console.log('max_value',max_value)
                console.log('max_pair',max_pair)
                console.log('max_index',max_index)
            }
        }
    }
    var starting_solution_index = max_index;
    
    var orderedSolutions = [];

    if (filteredSolutions.length>0) {
        //orderedSolutions.push(filteredSolutions[0]);
        console.log('starting_solution_index',starting_solution_index);
        console.log('filteredSolutions[starting_solution_index]',filteredSolutions[starting_solution_index]);
        orderedSolutions.push(filteredSolutions[starting_solution_index]); //arbitrarily choosing first of two
        //filteredSolutions.splice(0,1); //remove the solution we just added
        filteredSolutions.splice(starting_solution_index,1);
    }

    while (filteredSolutions.length>0 && orderedSolutions.length>0){
        console.log('orderedSolutions',orderedSolutions)
        var prevSol = orderedSolutions[orderedSolutions.length-1];
        console.log('prevSol',prevSol)
        var distances_from_prevSol = prevSol.stack_distances;
        var max_value = 0;
        var max_index = -1;
        for (var i in filteredSolutions){
            var filtered_solution_id = filteredSolutions[i].id;
            var distance_between_solutions = distances_from_prevSol[filtered_solution_id];
            if (distance_between_solutions>=max_value){
                max_value = distance_between_solutions;
                max_index = i;
            }
        }
        //previous_stack_id being added
        var sol_to_push = filteredSolutions[max_index];
        sol_to_push.previous_stack_id = prevSol.id; //o.m.g.
        orderedSolutions.push(sol_to_push);
        filteredSolutions.splice(max_index,1);
    }

    //var orderedSolutions = filteredSolutions;
    // orderedSolutions.sort(function(s1, s2) {
    //     return distances[s2.id] - distances[s1.id]
    // });

    Session.set('clickedStack',orderedSolutions[0]);

    return orderedSolutions;
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

Template.elena_filterPanel.helpers({
    "solutions": getAllSolutions,
    "percentGraded": function(){
        //console.log('percentGraded this',this['error_vector'])
        //console.log(Stacks.find({error_vector: this['error_vector']}).fetch())
        var numTotal = Stacks.find({error_vector: this['error_vector']}).count();
        var numGraded = Stacks.find({error_vector: this['error_vector'],graded: true}).count();
        return Math.round(100*numGraded/numTotal);
    },
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
        Session.set('checkedErrorVectors', error_vector_strings);
        $('#all-error-vectors').prop('checked', true);

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

Template.elena_solutionsList.helpers({
    "solutions": getSolutionsInOrder
});

Template.elena_testResults.helpers({
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

Template.elena_rubricRow.helpers({
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

// var inFilteredSet = function() {
//     var checked_error_vectors = Session.get('checkedErrorVectors');
//     return checked_error_vectors !== undefined &&
//         checked_error_vectors.includes(this.error_vector.toString());
// }

//Template.registerHelper('inFilteredSet', inFilteredSet);

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

var get_score_from_comment = function(comment) {
    var deduction_pattern = /[+-]?\d+/g;
    var matches = comment.match(deduction_pattern);
    if (matches === null) return;

    // console.log('matches:', matches);
    var score_deltas = matches.map(function(el) {
        return parseInt(el);
    });
    // console.log('parsed matches:', score_deltas);
    var score_delta_sum = 0;
    for (var i = 0; i < score_deltas.length; i++) {
        score_delta_sum += score_deltas[i];
    }

    var max_score = Stacks.findOne().total_num_tests;
    var score = score_delta_sum > 0 ? score_delta_sum : max_score + score_delta_sum;
    console.log('calculated score:', score);
    return score;
}

var update_grade = function(input, score_or_comment) {
    var form = input.parents('.grade');
    var _id = form.data('record-id');
    var stack_id = form.data('id');

    var score = form.find('.score-input').val();
    var comment = form.find('.comment-input').val();

    if (score_or_comment == 'comment') {
        var calculated_score = get_score_from_comment(comment);
        // TODO: this line causes issues sometimes with handlers triggering each other
        form.find('.score-input').val(calculated_score);
        score = calculated_score
    }

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

Template.elena_solution.events({
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

Template.elena_rubric.events({
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
    },
    "click .remove-deduction": function(event) {
        event.preventDefault();
        // stopPropagation makes the dropdown stay open
        event.stopPropagation();

        RubricEntries.remove({ _id: this._id });
    }
});

Template.elena_filterPanel.events({
    "click .hide-graded": function(event){
        $('.graded').toggle();
        //console.log('hide-graded clicked')
        var button = $(event.currentTarget);
        //console.log('button',button)
        var btn_text = (button.hasClass('shown') ? 'Show' : 'Hide') + ' graded<br>solution(s)';
        button.toggleClass('not-shown shown');
        //console.log('button',button)
        button.html(btn_text);
    },
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

        var currentDiv = $(".stack-wrapper:first");
        $('html, body').animate({scrollLeft: $(currentDiv).offset().left-410}, 800);
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
