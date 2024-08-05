import '../css/normalize.css';
import '../css/style.css';
import '../css/matheditor.css';
import TexField from './TexField.js';

window.addEventListener("load", (e)=>{
	const app = new TexField({});
    app.addNote(window.innerWidth*0.5, window.innerHeight*0.5);
	window.app = app
});