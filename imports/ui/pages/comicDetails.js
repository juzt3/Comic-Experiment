Template.comicDetails.helpers({
	Comic: function(){
		var id = FlowRouter.getParam("comicId");
		return Comics.findOne(id);
	},
	h_ComicCover: function(){
		return ComicPages.findOne(Template.comicDetails.__helpers.get('Comic').call().issues && Template.comicDetails.__helpers.get('Comic').call().issues[0].pages[0]);
	}
});