import '../css/normalize.css';
import '../css/katex-0.16.11.min.css';
import '../css/matheditor.css';
import '../css/style.css';

import TexField from './TexField.js';
import {createAndAppendElement} from './Tool.js';


window.addEventListener("load", (e)=>{
	const app = new TexField({});
	app.addNote(window.innerWidth*0.5, window.innerHeight*0.5);
	// window.app = app;
	const linkContainer = createAndAppendElement(app.dom.container, 'div', {
		class: 'link-container'
	});
	const github = createAndAppendElement(linkContainer, 'a', {
		class: 'link-github',
		href: 'https://github.com/Jeffreymaomao/TexField',
		target: '_blank',
		draggable: false,
		title: 'GitHub'
	});
	const help = createAndAppendElement(linkContainer, 'a', {
		class: 'link-help',
		href: '#',
		draggable: false,
		title: 'Help'
	});
});