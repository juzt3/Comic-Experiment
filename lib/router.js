FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('MainLayout', {main: 'c_ComicGrid'});
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

comicRoutes.route('/:comicId/issue/:number', {
	name: 'comic_viewer',
	action() {
		BlazeLayout.render('MainLayout', {main: 'comicViewer'});
	}
});

FlowRouter.route('/insertcomic', {
	name: 'insertcomic',
	action() {
		BlazeLayout.render('MainLayout', {main: 'insertComic'});
	}
});

FlowRouter.route('/testdropzone', {
	name: 'testdropzone',
	action() {
		BlazeLayout.render('MainLayout', {main: 'c_CDropzone'});
	}
});