FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('MainLayout', {main: 'homePage'});
	}
});

FlowRouter.route('/insertcomic', {
	name: 'insertcomic',
	action() {
		BlazeLayout.render('MainLayout', {main: 'insertComic'});
	}
});

FlowRouter.route('/library', {
	name: 'library',
	action() {
		BlazeLayout.render('MainLayout', {main: 'libraryPage'});
	}
});

FlowRouter.route('/myuploads', {
	name: 'myuploads',
	action() {
		BlazeLayout.render('MainLayout', {main: 'myUploadsPage'});
	}
});

var comicRoutes = FlowRouter.group({
	prefix: '/comic',
	name: 'comic'
});

comicRoutes.route('/:comicId', {
	name: 'comic_details',
	action() {
		BlazeLayout.render('MainLayout', {main: 'comicDetails'});
	}
});

comicRoutes.route('/:comicId/insertissue', {
	name: 'insertissue',
	action() {
		BlazeLayout.render('MainLayout', {main: 'insertIssue'});
	}
});

comicRoutes.route('/:comicId/issue/:number', {
	name: 'comic_viewer',
	action() {
		BlazeLayout.render('MainLayout', {main: 'comicViewer'});
	}
});


FlowRouter.route('/testdropzone', {
	name: 'testdropzone',
	action() {
		BlazeLayout.render('MainLayout', {main: 'c_CDropzone'});
	}
});