Template.c_CCardVertical.helpers({
	h_ComicCover: function(){
		return ComicPages.findOne(this.issues && this.issues[0].pages[0]);
	}
});