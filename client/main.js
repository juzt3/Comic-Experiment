import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

SimpleSchema.setDefaultMessages({
	initialLanguage: 'en',
	messages: {
		en: {
			uploadError: '{{value}}', //File-upload
		},
	}
});

//$.material.init()

import './main.html';

//Collections
import '/imports/collections';

//Pages
import '/imports/ui/pages';

/*
Meteor.startup(function(){
	//Cambio de lenguage de la UI
	TAPi18n.setLanguage("es");
});
*/