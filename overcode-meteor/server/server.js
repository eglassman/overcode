var fs = Npm.require('fs');
var path = Npm.require('path');

Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');
RubricEntries = new Mongo.Collection('rubricEntries');

// tiny collection for ease of syncing...
CorrectTestResults = new Mongo.Collection('CorrectTestResults');

var RELOAD = true; //false;

var DATA_DIR_NAME = 'flatten'
//var LOGGING_DIR_NAME = 'logging'
var ELENA_PATH = '/Users/elena/publicCodeRepos/'
var STACEY_PATH = '/Users/staceyterman/'

// var base_path = ELENA_PATH
var base_path = STACEY_PATH

var results_path = path.join(base_path, 'overcode_data/', DATA_DIR_NAME, 'output/');
var data_path = path.join(base_path, 'overcode_data/', DATA_DIR_NAME, 'data/');
var logging_path = path.join(base_path, 'overcode/logging/log.txt');

Meteor.methods({
    "writeGrade": function(grade_object) {
        var grade_file_path = logging_path;

        var stack = Stacks.findOne({ id: grade_object.id });
        for (var i = 0; i < stack.members.length; i++) {
            var sol_id = stack.members[i];

            var d = new Date();
            var timestamp = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

            var fields = [
                sol_id,
                grade_object.score || '',
                grade_object.comment || '',
                timestamp,
            ];

            var str_to_write = fields.join(',') + '\n';

            fs.appendFile(grade_file_path, str_to_write);
        }
    }
});

Meteor.startup(function () {
    var solutions_path = path.join(results_path, 'solutions.json');
    var phrases_path = path.join(results_path, 'phrases.json');
    var solutions = JSON.parse(fs.readFileSync(solutions_path));
    var phrases = JSON.parse(fs.readFileSync(phrases_path));

    if (RELOAD) {
        RubricEntries.remove({});
        Stacks.remove({});
        Phrases.remove({});

        CorrectTestResults.remove({});
        var correct = JSON.parse(fs.readFileSync(path.join(results_path, 'correctOutput.json')).toString());
        CorrectTestResults.insert(correct);

        solutions.forEach(function(sol) {
            sol.graded = false;
            var raw_solutions = [];
            for (var i = 0; i < sol.members.length; i++) {
                // TODO: make asynchronous? would need to be wrapped with fancy
                // meteor magic
                var solnum = sol.members[i];
                var file_path = path.join(data_path, solnum + '.py');
                var raw = fs.readFileSync(file_path);
                raw_solutions.push(raw.toString());
            }
            sol.rawSolutions = raw_solutions;
            // var error_vector = [];
            // for (i = 0; i < 25; i++) {
            //     error_vector.push(Math.random()>0.5);
            // }
            // sol.error_vector = error_vector;
            Stacks.insert(sol);
        });

        phrases.forEach(function(phrase) {
            var highlighted_line = hljs.highlight('python', phrase.code).value;
            var subscripted_line = highlighted_line.replace(/___(\d+)/g, function(match, digit) {
                return "<sub>" + digit + "</sub>";
            });
            phrase.code = subscripted_line;
            Phrases.insert(phrase);
        });
    }
});

