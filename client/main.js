import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import SimpleSchema from 'simpl-schema';
import materialize from 'materialize-css';
import 'materialize-css/sass/materialize.scss';

SimpleSchema.extendOptions(['autoform']);

SimpleSchema.setDefaultMessages({
	initialLanguage: 'en',
	messages: {
		en: {
			uploadError: '{{value}}', //File-upload
		},
	}
});

/*
Meteor.startup(function(){
	T9n.setLanguage('es');
});
*/

//Para cuando quiera usarse Materialize en vez de Boostrap
AutoForm.setDefaultTemplate('materialize');

import './main.html';

//Collections
import '/imports/collections';

//Components
import '/imports/ui/components';

//Pages
import '/imports/ui/pages';

UI.registerHelper('stringTrimm', function(stringToShorten, maxCharsAmount){
	if(stringToShorten.length > maxCharsAmount){
		return stringToShorten.substring(0, maxCharsAmount) + '...';
	}
	return stringToShorten;
});

UI.registerHelper('equals', function (a, b) {
	return a === b;
});