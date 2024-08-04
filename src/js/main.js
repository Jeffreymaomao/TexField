import '../css/normalize.css';
import '../css/style.css';
import Freemath from './Freemath.js';

window.addEventListener("load", (e)=>{
	const app = new Freemath({});
    app.addNote(window.innerWidth*0.5, window.innerHeight*0.5);
	window.app = app
});