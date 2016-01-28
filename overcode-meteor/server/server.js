Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');
Variables = new Mongo.Collection('variables');

Meteor.startup(function () {

    Stacks.remove({});
    Phrases.remove({});
    Variables.remove({});

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

    variables.forEach(function(variable) {
        Variables.insert(variable);
    });
});

