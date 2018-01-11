Template.c_CListItem.helpers({
	h_IssueCover: function(){
		return ComicPages.findOne(this.issue.pages[0]);
	},
	h_ComicId: function(){
		return FlowRouter.getParam("comicId");
	}
})