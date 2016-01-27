Stacks = new Mongo.Collection('stacks');
Phrases = new Mongo.Collection('phrases');
Variables = new Mongo.Collection('variables');

Template.solutionsList.helpers({
	"solutions": function () {
		return Stacks.find({}).fetch();
	}
});

Template.solution.helpers({
    "getPhraseFromID": function(phraseID) {
        return Phrases.findOne({ id: phraseID });
    },
    "createSpace": function(indent) {
        return " ".repeat(indent);
    }
});

Template.registerHelper('log',function(){
    console.log('template logging',this);
});