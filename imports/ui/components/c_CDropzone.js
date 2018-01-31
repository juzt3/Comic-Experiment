Template.c_CDropzone.onCreated(function() {
	this.currentUpload = new ReactiveVar(false);
	this.uploads = [];
	this.uploadCount = 0;
});

Template.c_CDropzone.helpers({
	currentUpload() {
		return Template.instance().currentUpload.get();
	}
});

Template.c_CDropzone.events({
	'dropped .dropzone': function(e, template) {
		console.log("Archivo/s soltado/s...");


		a = FS.Utility.eachFile(e, function(file){
			console.log("Tratando de guardar archivo: "+ file.name);
			upload = ComicPages.insert({
				file: file
			}, false);

			upload.on('start', function(){
				template.currentUpload.set(this);
				template.uploads.push(this);
			});

			upload.on('end', function(error, fileObj){
				if(error){
					console.log('Error during upload: ' + error);
				}else{
					console.log('File "' + fileObj.name + '" successfully uploaded');
				}
				template.currentUpload.set(false);
				template.uploadCount++;
				console.log(template.uploadCount + " " + template.uploads.length);
				if(template.uploadCount == template.uploads.length){
					_.each(template.uploads, function(fileUpload){
						console.log(fileUpload.file.name + ": " + fileUpload.config.fileId);
					});
				}
			});
			upload.start();
		});
	}
});