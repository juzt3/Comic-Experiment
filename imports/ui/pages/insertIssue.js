Template.insertIssue.events({
	'submit #insertissue'(event, template){
		event.preventDefault();
		Comics.update(FlowRouter.getParam("comicId"), {
			$push: {
				issues: {
					name: $("#name").val(),
					pages: Session.get("upIds")
				}
			}
		});
		Session.set("upIds", []);
		return true;
	}
});