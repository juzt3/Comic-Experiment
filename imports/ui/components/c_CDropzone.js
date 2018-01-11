Template.c_CDropzone.onCreated(function() {
	this.currentUpload = new ReactiveVar(false);
	this.uploads = [];
});

Template.c_CDropzone.helpers({
	currentUpload() {
		return Template.instance().currentUpload.get();
	}
});

Template.c_CDropzone.events({
	'dropped .dropzone': function(e, template) {
		console.log("Archivo/s soltado/s...");
		FS.Utility.eachFile(e, function(file){
			console.log("Tratando de guardar archivo: "+ file.name);
			upload = ComicPages.insert({
				file: file
			}, false);

			upload.on('start', function(){
				template.currentUpload.set(this);
			});

			upload.on('end', function(error, fileObj){
				if(error){
					console.log('Error during upload: ' + error);
				}else{
					template.uploads.push(this);
					console.log('File "' + fileObj.name + '" successfully uploaded');
				}
				template.currentUpload.set(false);
			});
			upload.start();
		});
		_.sortBy(template.uploads, function(u){ return u.file.name});
		console.log(template.uploads);
	}
});