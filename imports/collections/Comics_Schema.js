import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import Grid from 'gridfs-stream';
import { MongoInternals } from 'meteor/mongo';
import fs from 'fs';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
SimpleSchema.extendOptions(['autoform']);

let gfs;
if (Meteor.isServer) {
	gfs = Grid(
		MongoInternals.defaultRemoteCollectionDriver().mongo.db,
		MongoInternals.NpmModule
	);
}

ComicPages = new FilesCollection({
  collectionName: 'comic_pages',
  allowClientCode: false,
  debug: Meteor.isServer && process.env.NODE_ENV === 'development',
  onBeforeUpload(file) {
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) return true;
    return 'Please upload image, with size equal or less than 10MB';
  },
  onAfterUpload(image) {
    // Move file to GridFS
    Object.keys(image.versions).forEach(versionName => {
      const metadata = { versionName, imageId: image._id, storedAt: new Date() }; // Optional
      const writeStream = gfs.createWriteStream({ filename: image.name, metadata });

      fs.createReadStream(image.versions[versionName].path).pipe(writeStream);

      writeStream.on('close', Meteor.bindEnvironment(file => {
        const property = `versions.${versionName}.meta.gridFsFileId`;

        // If we store the ObjectID itself, Meteor (EJSON?) seems to convert it to a
        // LocalCollection.ObjectID, which GFS doesn't understand.
        this.collection.update(image._id, { $set: { [property]: file._id.toString() } });
        this.unlink(this.collection.findOne(image._id), versionName); // Unlink files from FS
      }));
    });
  },
  interceptDownload(http, image, versionName) {
    // Serve file from GridFS
    const _id = (image.versions[versionName].meta || {}).gridFsFileId;
    if (_id) {
      const readStream = gfs.createReadStream({ _id });
      readStream.on('error', err => { throw err; });
      readStream.pipe(http.response);
    }
    return Boolean(_id); // Serve file from either GridFS or FS if it wasn't uploaded yet
  },
  onAfterRemove(images) {
    // Remove corresponding file from GridFS
    images.forEach(image => {
      Object.keys(image.versions).forEach(versionName => {
        const _id = (image.versions[versionName].meta || {}).gridFsFileId;
        if (_id) gfs.remove({ _id }, err => { if (err) throw err; });
      });
    });
  }
});

if (Meteor.isServer) {
  ComicPages.denyClient();
}

Comics = new Mongo.Collection("comics");

Comics.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	}
});

var Schemas = {};

Schemas.Issues = new SimpleSchema({
	name: {
		type: String,
		label: "Nombre del Libro",
		max: 30,
		autoform: {
			placeholder: "Ej: Marvel Zombies #1",
		}
	},
	pages: {
		type: Array,
		label: "Paginas del Comic",
	},
	"pages.$": {
		type: String,
		autoform: {
			afFieldInput: {
				type: "fileUpload",
				collection: "comic_pages",
			},
		}
	},
});

Schemas.Comics = new SimpleSchema({
	name: {
		type: String,
		label: "Nombre del Comic",
		max: 30,
		autoform: {
			placeholder: "Ej: Marvel Zombies"
		}
	},
	summary: {
		type: String,
		label: "Resumen",
		max: 1000,
		autoform: {
			afFieldInput: {
				type: "textarea"
    			}
		}
	},
	issues: {
		type: Array,
		label: "Libros",
		optional: true,
	},
	"issues.$": {
		type: Schemas.Issues
	}
}, { tracker: Tracker });

Comics.attachSchema(Schemas.Comics);