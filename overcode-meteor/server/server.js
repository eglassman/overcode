var fs = Npm.require('fs');
var path = Npm.require('path');

Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');
RubricEntries = new Mongo.Collection('rubricEntries');

// tiny collection for ease of syncing...
CorrectTestResults = new Mongo.Collection('CorrectTestResults');

var RELOAD = true; //false;

var DATA_DIR_NAME = 'user_test'
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

        var entries = [{"_id":"FwvJLEnkixqeGE2tT","pointValue":"-3","text":"fails to mutate inner lists correctly (e.g. [::-1] with for each loop)"},{"_id":"KDBFNcNKx8tr624qG","pointValue":"-1","text":"mixing up indices and elements"},{"_id":"Ls76N4DobYYqft5rf","pointValue":"-2","text":"manual reverse has wrong index"},{"_id":"MAtLYjN6xSYw2foET","pointValue":"-2","text":"var = L.reverse() --\u003e L.reverse()"},{"_id":"PKbfe4TxS7hWjP6Ni","pointValue":"-5","text":"sort in reverse instead of reverse"},{"_id":"RDJxcmy5HLX44XNka","pointValue":"-1","text":"function returns something"},{"_id":"Wx3cmxbtnHauct24J","pointValue":"-2","text":"needed to make a deepcopy of original list"},{"_id":"YRRBMvrKP9tfAZ4ca","pointValue":"-2","text":"index out of bounds"},{"_id":"Z5kDPAEi68QEcBse6","pointValue":"-1","text":"does not handle empty lists"},{"_id":"c45svq6czJcojac7a","pointValue":"-2","text":"sort in reverse instead of reverse"},{"_id":"eDzHk7bBAKffg9Gh7","pointValue":"-1","text":"violates docstring"},{"_id":"kQzvinvWMcsggwCgy","pointValue":"-3","text":"reverses inner lists multiple times"},{"_id":"kiTtEWqr5doz2GqQu","pointValue":"-3","text":"makes a copy of input list but correctly mutates the copy"},{"_id":"pyS7SwRTySfhwaYCc","pointValue":"-3","text":"function terminates early"},{"_id":"qWstyxX6RwCkxAW4r","pointValue":"-3","text":"fails to mutate overal list correctly (e.g. [::-1])"},{"_id":"rjveWh9aBkL4Xw58r","pointValue":"-1","text":"minor error with minor reverse"},{"_id":"ru3JyNtR5qpqcANMh","pointValue":"-5","text":"does not reverse inner lists"},{"_id":"tmfaX8dwpDeHr9PSj","pointValue":"-8","text":"shuffles instead of swaps"},{"_id":"vRNxN5RvLXabNt3tJ","pointValue":"-3","text":"reverses some inner lists but not all"},{"_id":"wfTEPubCG8eRMsLMu","pointValue":"+1","text":"attempt to reverse outer list"},{"_id":"zZesXpwN5TAZFw3ne","pointValue":"-5","text":"does not reverse overall list"}]
        for (var i = 0; i < entries.length; i++) {
            RubricEntries.insert(entries[i]);
        }

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
            sol.deductions = [];
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

