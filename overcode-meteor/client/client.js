Stacks = new Mongo.Collection('stacks');

Template.solutionsList.helpers({
	"solutions": function () {
		return Stacks.find({}).fetch();
	}
})

Template.registerHelper('log',function(){
    console.log('template logging',this);
});