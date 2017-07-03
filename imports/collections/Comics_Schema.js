ComicPages = new FS.Collection("comic_pages", {
		stores: [new FS.Store.GridFS("comic_pages")],
});

ComicPages.allow({
	insert: function(){
		return true;
	},
	download: function() {
		return true;
	}
});

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
		optional: true,
		autoform: {
			placeholder: "Ej: Marvel Zombies #1",
		}
	},
	pages: {
		type: [String],
		label: "Paginas del Comic",
	},
	"pages.$": {
		autoform: {
			afFieldInput: {
				type: "cfs-files",
				collection: "comic_pages",
				label: "Cargue aqui las paginas del comic" ,
				accept: 'image/*'
			},
		}
	},
});

Schemas.Comics = new SimpleSchema({
	name: {
		type: String,
		label: "Nombre del Comic",
		max: 30,
		optional: true,
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
		type: [Schemas.Issues],
		label: "Libros",
	}
});

Comics.attachSchema(Schemas.Comics);