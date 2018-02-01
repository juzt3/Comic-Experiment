Template.c_CDropzone.onCreated(function() {
	this.currentUpload = new ReactiveVar(false);
	this.uploads = [];
	this.uploadCount = 0;
	this.upIds = [];
	Session.set("upIds", []);
});

Template.c_CDropzone.helpers({
	currentUpload() {
		return Template.instance().currentUpload.get();
	}
});

Template.c_CDropzone.events({
	'dropped .dropzone': function(e, template) {
		FS.Utility.eachFile(e, function(file){
			upload = ComicPages.insert({
				file: file
			}, false);

			upload.on('start', function(){
				template.currentUpload.set(this);
				template.uploads.push(this);
				template.upIds.push(this.config.fileId);
			});

			upload.on('end', function(error, fileObj){
				if(error){
					console.log('Error during upload: ' + error);
				}
				template.currentUpload.set(false);
				template.uploadCount++;
				if(template.uploadCount == template.uploads.length){
					Session.set("upIds", template.upIds);
				}
			});
			upload.start();
		});
	}
});