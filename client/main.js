import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//Collections
import '/imports/collections';

//Pages
import '/imports/ui/pages';

Meteor.startup(function(){
	//Cambio de lenguage de la UI
	TAPi18n.setLanguage("es");
});