import TexField from '../../src/js/TexField.js';
import askOllama from './plugin.ai.js';

import {createAndAppendElement} from '../../src/js/Tool.js';

const visited = localStorage.getItem('visited');
window.addEventListener("load", (e)=>{
    document.querySelector('h1').innerText = 'TexField';
    
    const app = new TexField({});
    app.addNote(window.innerWidth*0.5, window.innerHeight*0.5);

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

    const helpContainer = document.querySelector('#help');
    helpContainer.style.display = '';
    if(!visited) {
        helpContainer.classList.remove('hide');
        localStorage.setItem('visited', true);
    }

    helpContainer.style.transition = '0.5s ease-in-out';
    const closeButton = createAndAppendElement(helpContainer, 'div', {
        class: 'close',
    });
    closeButton.addEventListener('click', ()=>{
        helpContainer.classList.add('hide');
    });
    help.addEventListener('click', ()=>{
        helpContainer.classList.toggle('hide');
    });
});