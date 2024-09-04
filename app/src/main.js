import TexField from '../../src/js/TexField.js';
import askOllama from './plugin.ai.js';

window.addEventListener("load", (e) => {
    const app = new TexField({});
    app.addNote(window.innerWidth * 0.5, window.innerHeight * 0.5);
    window.app = app;
    app.askChatGPT = ()=>{askOllama(app)}
});