Template.c_CCardHorizontal.helpers({
	h_ComicCover: function(){
		return ComicPages.findOne(this.issues[0].pages[0]);
	}
});