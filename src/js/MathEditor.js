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
        this.id_prefix = config?.id_prefix || this.id;
        this._id_num = 1;
        this.focusId = null;
        this.focusing = false;
        this.states = {};
        this.isComposing = false;
        this.katex = window.katex;
        if(!this.katex) throw Error("KaTeX not defined!!!");
        if(!window.MathEditors) window.MathEditors = [];

        this.katexOutput = 'html';// 'html', 'mathml', 'htmlAndMathml'
        this.katexOutput = 'htmlAndMathml';// 'html', 'mathml', 'htmlAndMathml'
        window.MathEditors.push(this);
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
            value: state.latex || '',
        });
        const mathRenderLatexArea = createAndAppendElement(mathBlock, 'div', {
            class: 'mathnote-latex'
        });
        const checkIsEmpty = ()=>{
            if(mathTextArea.value.trim()===''){
                mathRenderLatexArea.classList.add('isEmpty');
            } else{
                mathRenderLatexArea.classList.remove('isEmpty');
            }
        }
        const label = this.createLabelDom(blockId);
        mathBlock.appendChild(label);

        this.orderLabelNum();
        checkIsEmpty();

        // ------

        // math block events
        mathBlock.addEventListener('focus',function(e) {
            mathBlock.classList.add('focus');
            mathRenderLatexArea.classList.remove('isEmpty');
            this.focusId = blockId;
            this.focusing = true;

            // (remark-1) If editing => After block focus, focus move to textarea
            if(mathBlock.classList.contains('editing')) mathTextArea.focus();

            checkIsEmpty();
        }.bind(this), false);

        mathBlock.addEventListener('blur',function(e) {
            this.focusing = false;
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
            this.focusing = true;
            mathBlock.classList.add('focus');
        }.bind(this), false);

        mathTextArea.addEventListener('blur', function(e) {
            this.focusing = false;
            mathBlock.classList.remove('focus');
            // using a setTimeout function to wait (if) textarea focus
            setTimeout(()=>{
                // !!! since after click block, textarea focus (at remark-1)
                if(document.activeElement===mathTextArea) return;
                mathBlock.classList.remove('editing');
            },0);
        }.bind(this), false);
        // ------

        setTimeout(()=>{
            this.adjustTextAreaSize(mathTextArea);
            this.renderLaTex(mathTextArea, mathRenderLatexArea);
            mathBlock.focus();
            this.focusId = blockId;
        },0);

        this.dom.blocks[blockId] = mathBlock;
        this.states[blockId] = state;
        return mathBlock;
    }

    renderLaTex(mathTextArea, mathRenderLatexArea){
        try {
            mathRenderLatexArea.classList.remove("error");
            this.katex.render(mathTextArea.value, mathRenderLatexArea, {
                fleqn: true,
                displayMode: true,
                output: this.katexOutput,
                throwOnError: true,
                trust: true
            });
        } catch(err){
            if(!err instanceof this.katex.ParseError) return;
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
        } else if(document.activeElement===mathTextArea){
            // ------------------------------------------------------------------------
            return; // following is some action, so editing (textarea focus) => return;
            // ------------------------------------------------------------------------
        } else if (e.key==='ArrowUp' || e.key==='ArrowDown') {
            this.moveFocusUpDown(e, mathBlock);
        } else if (this.focusId && e.key==='Enter' && !e.shiftKey && !e.altKey) {
            this.createEquationDom();
        } else if (this.focusId && e.key==='Backspace' && !e.shiftKey && !e.altKey){
            this.deleteFocus();
        } else if (
                !mathBlock.classList.contains('editing')
                && !e.ctrlKey
                && !e.metaKey
            ) {
            if(['Backspace', 'CapsLock', 'Escape', 'Enter', 
                'Meta', 'Alt', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 
                'Tab', 'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'Delete',
                'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
            ].includes(e.key)) return;
            const editing = mathBlock.classList.toggle('editing');
            this.adjustTextAreaSize(mathTextArea);
            mathTextArea.focus();
        }
    }

    //////////////////////////////////////////////////////

    createLabelDom(id){
        const label = createAndAppendElement(null, 'div', {
            class: 'mathnote-label'
        });
        // label.innerHTML = this.katex.renderToString("(0)", {output: 'mathml'});
        return label;
    }

    orderLabelNum(){
        requestAnimationFrame(function(){
            Array.from(this.dom.container.querySelectorAll(".mathnote-label")).forEach((numLabel,index)=>{
                numLabel.innerHTML = this.katex.renderToString(`(${index+1})`, {output: this.katexOutput});;
            });
        }.bind(this));
    }

    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    deleteFocus(){
        const deleteId = this.focusId;
        const previosBlock = this.dom.blocks[deleteId]?.previousSibling;
        if(!previosBlock) return;
        this.dom.blocks[deleteId].remove();
        const previosId = previosBlock.id;
        this.focusId = previosId;
        delete this.dom.blocks[deleteId];
        delete this.states[deleteId];
        previosBlock.focus();
    }

    moveFocusUpDown(event, block) {
        const nextBlock = block.nextSibling;
        const previosBlock = block.previousSibling;
        
        if (event.key==='ArrowDown' && nextBlock) {
        	nextBlock.focus();
        	this.focusId = nextBlock.id;
        } else if (event.key==='ArrowUp' && previosBlock) {
        	previosBlock.focus();
        	this.focusId = previosBlock.id;
        }
    }

    loadStates(states, order=null){
        this.dom.container.innerHTML = '';
        // ---
        const progressState = (state)=>{
            // console.log(state)
            const id = state.id;
            const id_num = parseInt(id.split('-').pop());
            if(id_num >= this._id_num) this._id_num = id_num+1;

            const block = this.addMathModeArea(state);
            this.dom.container.appendChild(block);
            this.states[id] = state;
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