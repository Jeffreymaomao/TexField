import {
    createAndAppendElement,
    hash,
    getTime,
    findParentWithSelector
} from './Tool.js';

class MathEditor {
    constructor(config = {}) {
        this.id = config.id || hash(Date.now().toString());
	    this.dom = {};
        this.dom.parent = config.parent || document.body;
        this.createTime = getTime();
        this.id_prefix = this.config?.id_prefix || this.id;
        this._id_num = 1;
        this.focusId = null;
        this.mathfields = {};
        this.states = {};
        this.isComposing = false;
        this.katex = window.katex;
        if(!this.katex) throw Error("KaTeX not defined!!!");

        if(!window.MathEditors){
            window.MathEditors = [];
        } else{
            window.MathEditors.forEach(matheditor=>{
                Object.values(matheditor.mathfields).forEach((mathfield)=>{
                    mathfield.blur();
                });
            });
        }
        window.MathEditors.push(this);
        window.needFocusUpDown = false;
        this.initializeDom();
        if(config.states) this.loadStates(config.states, config.order);
    }

    createId(id) {
        this._id_num += 1;
        return `${this.id_prefix}-${this._id_num - 1}`;
    }

    initializeDom() {
        this.dom.container = createAndAppendElement(this.dom.parent, "div", {
            class: "mathnote-container",
            id: this.id
        });

        this.dom.blocks = {};
        this.dom.labels = {};
        this.createEquationDom();
    }

    createEquationDom() {
        const id = this.createId();
        const state = {
        	id: id,
        	latex: '',
        };

        const block = this.addMathModeArea(state);

        if (!this.dom.container.lastChild || !this.dom.blocks[this.focusId] || !this.dom.blocks[this.focusId].nextSibling) {
            this.dom.container.appendChild(block); // the container is empty || focus block not found || focus block next is empty
        } else if (this.dom.blocks[this.focusId].nextSibling) {
            this.dom.container.insertBefore(block, this.dom.blocks[this.focusId].nextSibling); // focus block next is not empty
        }
        this.orderLabelNum();
        this.states[id] = state;
        return true;
    }

    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    addMathModeArea(state){
        const blockId = state.id;
        const mathBlock = createAndAppendElement(null, "div", {
            class: "mathnote-block",
            tabIndex: 0,
            id: blockId
        });
        const mathTextArea = createAndAppendElement(mathBlock, 'textarea', {
            class: 'mathnote-math-textarea',
            autocapitalize: 'off',
            autocomplete: 'off',
            autocorrect: 'off',
            spellcheck: 'false',
            id: `${blockId}-mathmode-textarea`,
            placeholder: 'Input some LaTeX...',
            tabIndex: -1,
            rows: 1,
            value: 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}',
        });

        const mathRenderLatexArea = createAndAppendElement(mathBlock, 'div', {
            class: 'mathnote-latex'
        });

        const checkIsEmpty = ()=>{
            if(mathTextArea.value.trim()===''){
                mathRenderLatexArea.classList.add('isEmpty');
            }else{
                mathRenderLatexArea.classList.remove('isEmpty');
            }
        }
        // ------

        // math block events
        mathBlock.addEventListener('focus',function(e) {
            mathBlock.classList.add('focus');
            mathRenderLatexArea.classList.remove('isEmpty');
            this.focusId = blockId;
            mathTextArea.focus(); // (remark-1) After block focus, focus move to textarea
            checkIsEmpty();
        }.bind(this), false);

        mathBlock.addEventListener('blur',function(e) {
            mathBlock.classList.remove('focus');
        }.bind(this), false);

        mathBlock.addEventListener('keydown', function(e) {
            this.mathBlockKeydownEvent(e, mathBlock, mathTextArea);
        }.bind(this), false);
        // ------
        // math textarea events
        mathTextArea.addEventListener('input', function(e) {
            this.adjustTextAreaSize(mathTextArea);
            this.renderLaTex(mathTextArea, mathRenderLatexArea);
            checkIsEmpty();
            state.latex = mathTextArea.value;
        }.bind(this), false);

        mathTextArea.addEventListener('keydown', function(e) {
            this.mathTextAreaKeydownEvent(e, mathBlock, mathTextArea);
        }.bind(this), false);

        mathTextArea.addEventListener('focus', function(e) {
            mathBlock.classList.add('focus');
        }.bind(this), false);

        mathTextArea.addEventListener('blur', function(e) {
            mathBlock.classList.remove('focus');

            // using a setTimeout function to wait (if) textarea focus
            setTimeout(()=>{
                // !!! since after click block, textarea focus (at remark-1)
                if(document.activeElement===mathTextArea) return;
                mathBlock.classList.remove('editing');
            },0);
        }.bind(this), false);
        // ------
        this.dom.blocks[blockId] = mathBlock;
        setTimeout(()=>{
            this.adjustTextAreaSize(mathTextArea);
            this.renderLaTex(mathTextArea, mathRenderLatexArea);
            mathBlock.focus();
            this.focusId = blockId;
        },0);
        const label = this.createLabelDom(blockId);
        mathBlock.appendChild(label);
        return mathBlock;
    }

    renderLaTex(mathTextArea, mathRenderLatexArea){
        try {
            mathRenderLatexArea.classList.remove("error");
            this.katex.render(mathTextArea.value, mathRenderLatexArea, {
                displayMode: true,
                output: 'mathml', // 'html', 'mathml', 'htmlAndMathml'
                throwOnError: true
            });
        } catch(err){
            const katexParseError = err.message;
            mathRenderLatexArea.classList.add("error");
            mathRenderLatexArea.innerText = katexParseError.replace('KaTeX parse error:','');
        }
    }

    adjustTextAreaSize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.width = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
        textarea.style.width = (textarea.scrollWidth) + 'px';
    }

    mathTextAreaKeydownEvent(e, mathBlock, mathTextArea) {
        // This is for textarea (LaTeX editor)
        if (e.key === 'Tab') {
            // tab 
            e.preventDefault();
            const start = mathTextArea.selectionStart;
            const end = mathTextArea.selectionEnd;

            const value = mathTextArea.value;
            mathTextArea.value = value.substring(0, start) + '\t' + value.substring(end);
            mathTextArea.selectionStart = mathTextArea.selectionEnd = start + 1;
        }
    }

    mathBlockKeydownEvent(e, mathBlock, mathTextArea) {
        // This is for block (math mode)
        if ((e.ctrlKey || e.metaKey) && e.key==='/'){
            const editing = mathBlock.classList.toggle('editing');
            if(editing){
                // when it is editing
                this.adjustTextAreaSize(mathTextArea);
                mathTextArea.focus();
            } else {
                // when it is not editing
                mathBlock.focus(); // focus move to block
            }
        } else if (e.key==='Enter') {
            if(document.activeElement===mathTextArea) return;
            this.createEquationDom();
        }  else if(e.key==='ArrowUp' || e.key==='ArrowDown') {
            console.log(e.key);
        } else if ((e.ctrlKey || e.metaKey)  && e.key==='Backspace' && !e.shiftKey && !e.altKey){
        } else if((e.ctrlKey || e.metaKey) && e.key==='"' && !e.shiftKey && !e.altKey){
        }
    }

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    addTextModeArea(matheq, mathfield, _state){
        const id = matheq.id;
        const state = this.states[id] || _state;
        if(!state) return;
        const newMatheq = createAndAppendElement(null, "div", {
            class: "mathnote-block textmode",
            id: id
        });
        matheq.replaceWith(newMatheq);

        const textContainer = createAndAppendElement(newMatheq, "div", {
            class: "mathnote-text-container"
        });

        const textArea = createAndAppendElement(textContainer, "textarea", {
            class: "mathnote-text-textarea",
            autocapitalize: 'off',
            id: `${id}-textmode-textarea`,
            rows: 1,
            value: state.text || ''
        });
        const adjustTextAreaWidth = ()=>{
            state.text = textArea.value;
            state.isEmpty = state.text==='';
            textArea.style.height = 'auto';
            textArea.style.width = 'auto';
            textArea.style.height = (textArea.scrollHeight) + 'px';
            textArea.style.width = (textArea.scrollWidth) + 'px';
        }
        setTimeout(adjustTextAreaWidth, 100);

        textArea.addEventListener("keydown", function(e) {
            this.handleTextKeydown(e, textArea, newMatheq);
        }.bind(this), false);

        textArea.addEventListener("focus", function(e) {
            newMatheq.classList.add("focus");
        }.bind(this), false);

        textArea.addEventListener("blur", function(e) {
            newMatheq.classList.remove("focus");
        }.bind(this), false);

        textArea.addEventListener('compositionstart', function() {
            this.isComposing = true;
        }.bind(this), false);

        textArea.addEventListener('compositionend', function() {
            this.isComposing = false;
        }.bind(this), false);

        textArea.addEventListener("input", adjustTextAreaWidth.bind(this), false);

        mathfield.blur();
        mathfield = null;
        textArea.focus();
        setTimeout(function(){
            if(state.text) return;
            textArea.value = "";
            state.text = textArea.value;
            state.isEmpty = true;
        }, 0);

        this.orderLabelNum();
        this.dom.blocks[id] = newMatheq;
        this.mathfields[id] = textArea;
        delete state.latex;
    }

    //////////////////////////////////////////////////////

    createLabelDom(id){
        const labelId = `${id}-label-num`;

        const label = createAndAppendElement(null, 'div', {
            class: 'mathnote-label katex'
        });

        const mathDom = createAndAppendElement(label, 'math');
        mathDom.setAttribute('xmlns','http://www.w3.org/1998/Math/MathML')
        mathDom.setAttribute('display','block');

        const semantics = createAndAppendElement(mathDom, 'semantics', {
        });

        const labelLeaf = createAndAppendElement(semantics, 'mrow',{
            class: '',
        });

        const labelLeftBrace = createAndAppendElement(labelLeaf, 'mo',{
            class: '',
            stretchy: false,
            textContent: '('
        });

        const labelNum = createAndAppendElement(labelLeaf, 'mn',{
            class: '',
            id: labelId,
            textContent: '0'
        });

        const labelRightBrace = createAndAppendElement(labelLeaf, 'mo',{
            class: '',
            stretchy: false,
            textContent: ')'
        });
        this.dom.labels[labelId] = label.querySelector(`#${labelId}`);
        return label;
    }

    orderLabelNum(){
        requestAnimationFrame(function(){
            Array.from(this.dom.container.querySelectorAll(".matheq-label-num")).forEach((numLabel,index)=>{
                numLabel.textContent = `${index+1}`;
            });
        }.bind(this));
    }

    handleTextKeydown(event, textArea, textModeMatheq) {
        const focusState = this.states[this.focusId];
        if(this.isComposing) return;

        if (event.key==='ArrowUp' || event.key==='ArrowDown') {
            const cursorPosition = textArea.selectionStart;
            const hasPreviousLine = cursorPosition > 0;
            const hasNextLine = cursorPosition < textArea.value.length;
            if (event.key === 'ArrowUp' && !hasPreviousLine) {
                this.moveFocusUpDown(event, textModeMatheq);
            } else if (event.key === 'ArrowDown' && !hasNextLine) {
                this.moveFocusUpDown(event, textModeMatheq);
            }
        } else if (event.key==='Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
            event.preventDefault();
            this.createEquationDom();
        }  else if (focusState.isEmpty && event.key==='Backspace' && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey){
            this.deleteFocus();
        } else if(focusState.isEmpty && (event.ctrlKey || event.metaKey) && event.key==='/') {
            const id = this.focusId;
            const state = this.states[id];
            const {matheq, mathfield} = this.addMathModeArea(state);
            textModeMatheq.replaceWith(matheq);
            this.orderLabelNum();
            mathfield.focus();
            delete state.text
        }
    }

    deleteFocus(){
        const deleteId = this.focusId;
        const previosMatheq = this.dom.blocks[deleteId]?.previousSibling;
        if(!previosMatheq) return;
        this.dom.blocks[deleteId].remove();
        const previosId = previosMatheq.id;
        this.focusId = previosId;
        delete this.dom.blocks[deleteId];
        delete this.states[deleteId];
        delete this.mathfields[deleteId];
        this.mathfields[previosId].focus();
    }

    moveFocusUpDown(event, block) {
        if (event.key==='ArrowDown' && block.nextSibling) {
        	const nextId = block.nextSibling.id;
        	this.mathfields[nextId]?.focus();
        	this.focusId = nextId;
        } else if (event.key==='ArrowUp' && block.previousSibling) {
        	const previosId = block.previousSibling.id;
        	this.mathfields[previosId]?.focus();
        	this.focusId = previosId;
        }
    }

    loadStates(states, order=null){
        this.mathfields = {};
        this.dom.container.innerHTML = '';
        // ---
        const progressState = (state)=>{
            const id = state.id;
            const id_num = parseInt(id.split('-').pop());
            if(id_num >= this._id_num) this._id_num = id_num+1;
            const {matheq, mathfield} = this.addMathModeArea(state);
            this.dom.container.appendChild(matheq);
            this.states[id] = state;

            if(state.latex){
                mathfield.latex(state.latex);
            } else if (state.text) {
                this.addTextModeArea(matheq, mathfield, state);
            }
        }
        // ---
        if(order){
            order.forEach(id=>{
                progressState(states[id]);
            });
        } else {
            Object.values(states).forEach((state)=>{
                progressState(state);
            });
        }

        this.orderLabelNum();
    }
}

export default MathEditor;