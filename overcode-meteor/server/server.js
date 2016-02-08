var fs = Npm.require('fs');
var path = Npm.require('path');

Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');
// Variables = new Mongo.Collection('variables');

var DATA_DIR_NAME = 'template_test'
var results_path = path.join('/Users/staceyterman/overcode_data/', DATA_DIR_NAME, 'output/');
var data_path = path.join('/Users/staceyterman/overcode_data/', DATA_DIR_NAME, 'data/');

Meteor.methods({
    "getRawCode": function(members) {
        console.log('asked for code for:', members);
        var results = [];
        for (var i = 0; i < members.length; i++) {
            // TODO: do this asynchronously in parallel rather than
            // synchrounously in series - probably want to use the npm 'async'
            // package.
            var solnum = members[i];
            var file_path = path.join(data_path, solnum + '.py');
            var raw = fs.readFileSync(file_path);
            results.push(raw.toString());
        }
        // console.log(results);
        return results
    }
});

Meteor.startup(function () {
    var solutions_path = path.join(results_path, 'solutions.json');
    var phrases_path = path.join(results_path, 'phrases.json');
    var solutions = JSON.parse(fs.readFileSync(solutions_path));
    var phrases = JSON.parse(fs.readFileSync(phrases_path));

    Stacks.remove({});
    Phrases.remove({});
    // Variables.remove({});

    solutions.forEach(function(sol) {
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

    // variables.forEach(function(variable) {
    //     Variables.insert(variable);
    // });
});

