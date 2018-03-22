Template.myUploadsPage.helpers({
	h_Comics: function(){
		return Comics.find({uploaderId: Meteor.userId()});
	},
});