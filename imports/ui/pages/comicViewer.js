Template.comicViewer.helpers({
	comic: function(){
		id = FlowRouter.getParam("comicId");
		return Comics.findOne(id);
	},
	pages: function(){
		return Template.comicViewer.__helpers.get('comic').call() && ComicPages.find({_id: {$in: Template.comicViewer.__helpers.get('comic').call().issues[FlowRouter.getParam("number")].pages}});
	}
});