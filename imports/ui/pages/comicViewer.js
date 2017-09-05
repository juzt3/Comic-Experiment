Template.comicViewer.helpers({
	comic: function(){
		return Comics.findOne();
	},
	pages: function(){
		a = Template.comicViewer.__helpers.get('comic').call() && ComicPages.find({_id: {$in: Template.comicViewer.__helpers.get('comic').call().issues[0].pages}});
		console.log(a);
		return Template.comicViewer.__helpers.get('comic').call() && ComicPages.find({_id: {$in: Template.comicViewer.__helpers.get('comic').call().issues[0].pages}});
	}
});