(()=>{"use strict";var t={710:(t,e,n)=>{n.d(e,{A:()=>s});var o=n(601),i=n.n(o),a=n(314),r=n.n(a)()(i());r.push([t.id,"/* ---- */\n\n.mathnote-container {\n    display: block;\n    width: 100%;\n    border-style: solid;\n    border-color: gray;\n    border-width: 0.5px 0px;\n}\n\n/**********************************\n * mathnote one block (math mode) *\n **********************************/\n\n.mathnote-latex {\n    --padding-width: 12px;\n    --background-color: rgb(245,245,245);\n    --border-color: rgb(100,100,100);\n    --error-text-color: rgb(200,30,30);\n    --error-border-color: rgb(200,30,30);\n    --dark-error-color: rgb(200,100,100);\n}\n\n/** ---\n * LaTeX is not editing (default)\n ** --- */\n\n.mathnote-block {\n    border-color: gray;\n    border-style: solid;\n    border-width: 0.5px 1px;\n    min-height: 47px;\n}\n\n.mathnote-block.focus {\n    outline: 1px solid rgb(10,100,200);\n}\n\n.mathnote-block .mathnote-math-textarea {\n    /* textarea in math-mode*/\n    overflow: hidden;\n    vertical-align: middle;\n    white-space: nowrap;\n    resize: none;\n    border: none;\n    outline: none;\n    \n    height: auto;\n    width: auto;\n    background-color: transparent;\n    min-width: 200px;\n    padding: 15px 15px;\n    font: 14px 'Menlo', monospace;\n    -moz-tab-size : 4;\n      -o-tab-size : 4;\n         tab-size : 4;\n    /* when it is not editing */\n    display: none;\n}\n\n.mathnote-block .mathnote-latex {\n    display: block;\n    position: relative;\n    transform: none;\n    border: none;\n    background-color: transparent;\n    min-width: 200px;\n    vertical-align: bottom;\n    padding: 15px 15px;\n    cursor: text;\n    transition: height, transform 0.05s ease-out;\n    cursor: pointer;\n    user-select: none;\n}\n\n.mathnote-block .mathnote-latex::after {\n    display: none;\n    transition: height, transform 0.05s ease-out;\n}\n\n.mathnote-block .mathnote-latex.error{\n    max-width: 100%;\n    white-space: wrap;\n    color: var(--error-text-color);\n}\n\n.mathnote-block .mathnote-latex.isEmpty::before {\n    content: 'Empty LaTeX';\n    font: 14px 'Menlo', monospace;\n    color: #bbb;\n}\n\n/** ---\n * LaTeX is editing\n ** --- */\n\n /* When the LaTeX is editing => show textarea & LaTeX block */\n\n.mathnote-block.editing .mathnote-math-textarea {\n    display: block;\n    position: relative;\n}\n\n.mathnote-block.editing .mathnote-latex {\n    position: absolute;\n    bottom: 100%;\n    left: 0%;\n    transform: translate(0, -10px);\n    border-radius: 6px;\n    padding: var(--padding-width);\n    min-width: 45px;\n    background-color: var(--background-color);\n    border: 1px solid var(--border-color);\n}\n\n.mathnote-block.editing .mathnote-latex::after {\n    content: \"\";\n    display: block;\n    position: absolute;\n    transform: rotate(45deg);\n    left: var(--padding-width);\n    bottom: calc(2px - var(--padding-width));\n    width: calc(var(--padding-width) * 1.414);\n    height: calc(var(--padding-width) * 1.414);\n    background-color: var(--background-color);\n    border-bottom: 1px solid var(--border-color);\n    border-right: 1px solid var(--border-color);\n    cursor: text;\n}\n\n\n.mathnote-block.editing .mathnote-latex.error {\n    border-color: var(--error-border-color);\n    color: var(--error-border-color);\n}\n\n.mathnote-block.editing .mathnote-latex.error::after {\n    background-color: var(--background-color);\n    border-bottom: 1px solid var(--error-border-color);\n    border-right: 1px solid var(--error-border-color);\n}\n\n/* show label */\n.mathnote-block {\n    padding-right: 35px;\n}\n\n.mathnote-label {\n    position: absolute;\n    padding-right: 2px;\n    right: 0;\n    top: 50%;\n    transform: translate(0, -50%);\n    text-align: middle;\n    cursor: pointer;\n    user-select: none;\n}\n\n/* ---------------- */\n\nbody.dark .mathnote-text-textarea,\nbody.dark .mathnote-math-textarea {\n    background-color: #222;\n    color: #eee;\n}\n\nbody.dark .mathnote-block .mathnote-latex.error{\n    color: rgb(230, 100, 100);\n}\n\nbody.dark .mathnote-block.editing .mathnote-latex,\nbody.dark .mathnote-block.editing .mathnote-latex::after {\n    border-color: rgba(30, 150, 150);\n    background-color: rgb(38, 59, 74);\n    color: rgb(200, 250, 250);\n}\n\nbody.dark .mathnote-block.editing .mathnote-latex,\nbody.dark .mathnote-block.editing .mathnote-latex::after {\n    border-color: rgba(150, 150, 150);\n    background-color: rgb(50,50,50);\n    color: rgb(250, 250, 250);\n}\n\nbody.dark .mathnote-block.editing .mathnote-latex.error,\nbody.dark .mathnote-block.editing .mathnote-latex.error::after {\n    border-color: rgb(200, 30, 30);\n    background-color: rgb(74, 54, 53);\n    color: rgb(230, 201, 197);\n}\n\n/*.mathnote-block.textmode textarea.mathnote-text-textarea {\n    width: 100%;\n    overflow: hidden;\n    resize: none;\n    vertical-align: middle;\n    font-family: 'BiauKai', 'LatinModernRoman', 'Symbola',\n                 'Times New Roman', 'Times', serif;  \n    font-size: 1.15em;\n    border: none;\n    white-space: nowrap;\n}\n\n.mathnote-block.focus {\n    box-shadow: none;\n    border-style: solid;\n    border-radius: 0px;\n    border-color: #6a93d2;\n    border-width: 1px 1px;\n\n    box-shadow: 0 0 2px #6a93d2,\n                0 0 2px #6a93d2;\n}*/\n",""]);const s=r},82:(t,e,n)=>{n.d(e,{A:()=>s});var o=n(601),i=n.n(o),a=n(314),r=n.n(a)()(i());r.push([t.id,"/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}",""]);const s=r},16:(t,e,n)=>{n.d(e,{A:()=>s});var o=n(601),i=n.n(o),a=n(314),r=n.n(a)()(i());r.push([t.id,"* {\n    box-sizing: border-box;\n    position: relative;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    overflow: hidden;\n}\n\n/* --- */\n.freemath-container {\n    cursor: grab;\n}\n\n.freemath-container.dragging {\n    cursor: grabbing;\n}\n\n.freemath-canvas {\n}\n\n.freemath-path-container {\n}\n\n.freemath-note-container {\n}\n\n.note {\n    position: absolute;\n    display: block;\n    white-space: nowrap;\n    margin: 0;\n    padding: 8px;\n    border: 1px solid #888;\n    background-color: white;\n    border-radius: 6px;\n    cursor: move;\n    transform: translate(-50%, -50%);\n}\n\n.freemath-container.drawingPath .note:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n/*    background-color: rgba(250, 250, 250, 0.6);*/\n}\n\n.note.focus {\n    box-shadow: 0 0 6px #fdfa72, 0 0 6px #fdfa72;\n}\n\n/* --- */\n\n@keyframes path-blink {\n    0% {\n        stroke-width: 4px;\n    }\n    50% {\n        stroke-width: 2px;\n    }\n    100% {\n        stroke-width: 4px;\n    }\n}\n\n.path {\n    stroke: #ccc;\n    stroke-width: 2;\n    cursor: pointer;\n}\n\n.path.focus {\n    stroke: #e3e166;\n    stroke-width: 4px;\n}\n\n/* --- dark mode --- */\n\nbody.dark.drawingPath .note:after {\n/*    background-color: rgba(100, 100, 100, 0.6);*/\n}\n\nbody.dark .note {\n    background-color: #222;\n    color: #eee;\n}\n\nbody.dark .mq-editable-field.mq-focused,\nbody.dark .mq-math-mode .mq-editable-field.mq-focused {\n    -webkit-box-shadow: #0278c7 0 0 1px 1px, inset #002b57 0 0 1px 0;\n    -moz-box-shadow: #0278c7 0 0 1px 1px, inset #002b57 0 0 1px 0;\n    box-shadow: #0278c7 0 0 1px 1px, inset #002b57 0 0 1px 0;\n    border-color: #0063bd;\n    border-radius: 1px;\n}\n\nbody.dark .note.focus {\n    box-shadow: 0 0 6px #e3e166, 0 0 6px #e3e166;\n}\n\n\nbody.dark .path {\n    stroke: #999;\n}\n\n/* --- */\n\n@media print {\n    * {\n        -webkit-print-color-adjust: exact ;\n        color-adjust: exact ;\n    }\n}\n\n\n\n\n\n\n\n",""]);const s=r},314:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",o=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),o&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),o&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,o,i,a){"string"==typeof t&&(t=[[null,t,void 0]]);var r={};if(o)for(var s=0;s<this.length;s++){var d=this[s][0];null!=d&&(r[d]=!0)}for(var c=0;c<t.length;c++){var l=[].concat(t[c]);o&&r[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),i&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=i):l[4]="".concat(i)),e.push(l))}},e}},601:t=>{t.exports=function(t){return t[1]}},72:t=>{var e=[];function n(t){for(var n=-1,o=0;o<e.length;o++)if(e[o].identifier===t){n=o;break}return n}function o(t,o){for(var a={},r=[],s=0;s<t.length;s++){var d=t[s],c=o.base?d[0]+o.base:d[0],l=a[c]||0,h="".concat(c," ").concat(l);a[c]=l+1;var u=n(h),m={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==u)e[u].references++,e[u].updater(m);else{var p=i(m,o);o.byIndex=s,e.splice(s,0,{identifier:h,updater:p,references:1})}r.push(h)}return r}function i(t,e){var n=e.domAPI(e);n.update(t);return function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,i){var a=o(t=t||[],i=i||{});return function(t){t=t||[];for(var r=0;r<a.length;r++){var s=n(a[r]);e[s].references--}for(var d=o(t,i),c=0;c<a.length;c++){var l=n(a[c]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}a=d}}},659:t=>{var e={};t.exports=function(t,n){var o=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}},540:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},56:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},825:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,i&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(o,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},113:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(o){var i=e[o];if(void 0!==i)return i.exports;var a=e[o]={id:o,exports:{}};return t[o](a,a.exports,n),a.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0;var o=n(72),i=n.n(o),a=n(825),r=n.n(a),s=n(659),d=n.n(s),c=n(56),l=n.n(c),h=n(540),u=n.n(h),m=n(113),p=n.n(m),g=n(82),b={};b.styleTagTransform=p(),b.setAttributes=l(),b.insert=d().bind(null,"head"),b.domAPI=r(),b.insertStyleElement=u();i()(g.A,b);g.A&&g.A.locals&&g.A.locals;var f=n(16),y={};y.styleTagTransform=p(),y.setAttributes=l(),y.insert=d().bind(null,"head"),y.domAPI=r(),y.insertStyleElement=u();i()(f.A,y);f.A&&f.A.locals&&f.A.locals;var x=n(710),v={};v.styleTagTransform=p(),v.setAttributes=l(),v.insert=d().bind(null,"head"),v.domAPI=r(),v.insertStyleElement=u();i()(x.A,v);x.A&&x.A.locals&&x.A.locals;function w(t,e,n={}){const o=document.createElement(e);return n.class&&(n.class.split(" ").forEach((t=>o.classList.add(t))),delete n.class),n.dataset&&(Object.keys(n.dataset).forEach((t=>o.dataset[t]=n.dataset[t])),delete n.dataset),Object.keys(n).forEach((t=>{o[t]=n[t],o[t]||o.setAttribute(t,n[t])})),Object.keys(n).forEach((t=>{o[t]=n[t]})),t&&t.appendChild(o),o}function k(t){let e=0;for(let n=0;n<t.length;n++){e=(e<<5)-e+t.charCodeAt(n),e|=0}e=Math.abs(e);const n="ABCDEFGHIJKLMNOPQRSTUVWXYZ";let o="";for(;e>0;){o=n[(e+Math.floor(1e3*Math.random()))%26]+o,e=Math.floor(e/26*10)}return o}function E(){const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")} ${String(t.getHours()).padStart(2,"0")}.${String(t.getMinutes()).padStart(2,"0")}.${String(t.getSeconds()).padStart(2,"0")}.${String(t.getMilliseconds()).padStart(2,"0")}`}const L=class{constructor(t={}){if(this.id=t.id||k(Date.now().toString()),this.dom={},this.dom.parent=t.parent||document.body,this.createTime=E(),this.id_prefix=this.config?.id_prefix||this.id,this._id_num=1,this.focusId=null,this.mathfields={},this.states={},this.isComposing=!1,this.katex=window.katex,!this.katex)throw Error("KaTeX not defined!!!");window.MathEditors||(window.MathEditors=[]),window.MathEditors.push(this),window.needFocusUpDown=!1,this.initializeDom(),t.states&&this.loadStates(t.states,t.order)}createId(t){return this._id_num+=1,`${this.id_prefix}-${this._id_num-1}`}initializeDom(){this.dom.container=w(this.dom.parent,"div",{class:"mathnote-container",id:this.id}),this.dom.blocks={},this.dom.labels={},this.createEquationDom()}createEquationDom(){const t={id:this.createId(),latex:""},e=this.addMathModeArea(t);return this.dom.container.lastChild&&this.dom.blocks[this.focusId]&&this.dom.blocks[this.focusId].nextSibling?this.dom.blocks[this.focusId].nextSibling&&this.dom.container.insertBefore(e,this.dom.blocks[this.focusId].nextSibling):this.dom.container.appendChild(e),this.orderLabelNum(),!0}addMathModeArea(t){const e=t.id,n=w(null,"div",{class:"mathnote-block",tabIndex:0,id:e}),o=w(n,"textarea",{class:"mathnote-math-textarea",autocapitalize:"off",autocomplete:"off",autocorrect:"off",spellcheck:"false",id:`${e}-mathmode-textarea`,placeholder:"Input some LaTeX...",tabIndex:-1,rows:1,value:"x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}"}),i=w(n,"div",{class:"mathnote-latex"}),a=()=>{""===o.value.trim()?i.classList.add("isEmpty"):i.classList.remove("isEmpty")},r=this.createLabelDom(e);return n.appendChild(r),this.orderLabelNum(),n.addEventListener("focus",function(t){n.classList.add("focus"),i.classList.remove("isEmpty"),this.focusId=e,n.classList.contains("editing")&&o.focus(),a()}.bind(this),!1),n.addEventListener("blur",function(t){n.classList.remove("focus")}.bind(this),!1),n.addEventListener("keydown",function(t){this.mathBlockKeydownEvent(t,n,o)}.bind(this),!1),o.addEventListener("input",function(e){this.adjustTextAreaSize(o),this.renderLaTex(o,i),a(),t.latex=o.value}.bind(this),!1),o.addEventListener("keydown",function(t){this.mathTextAreaKeydownEvent(t,n,o)}.bind(this),!1),o.addEventListener("focus",function(t){n.classList.add("focus")}.bind(this),!1),o.addEventListener("blur",function(t){n.classList.remove("focus"),setTimeout((()=>{document.activeElement!==o&&n.classList.remove("editing")}),0)}.bind(this),!1),setTimeout((()=>{this.adjustTextAreaSize(o),this.renderLaTex(o,i),n.focus(),this.focusId=e}),0),this.dom.blocks[e]=n,this.states[e]=t,n}renderLaTex(t,e){try{e.classList.remove("error"),this.katex.render(t.value,e,{displayMode:!0,output:"mathml",throwOnError:!0})}catch(t){const n=t.message;e.classList.add("error"),e.innerText=n.replace("KaTeX parse error:","")}}adjustTextAreaSize(t){t.style.height="auto",t.style.width="auto",t.style.height=t.scrollHeight+"px",t.style.width=t.scrollWidth+"px"}mathTextAreaKeydownEvent(t,e,n){if("Tab"===t.key){t.preventDefault();const e=n.selectionStart,o=n.selectionEnd,i=n.value;n.value=i.substring(0,e)+"\t"+i.substring(o),n.selectionStart=n.selectionEnd=e+1}}mathBlockKeydownEvent(t,e,n){if((t.ctrlKey||t.metaKey)&&"/"===t.key){e.classList.toggle("editing")?(this.adjustTextAreaSize(n),n.focus()):e.focus()}else{if(document.activeElement===n)return;"ArrowUp"===t.key||"ArrowDown"===t.key?this.moveFocusUpDown(t,e):(t.ctrlKey||t.metaKey)&&"Enter"===t.key?this.createEquationDom():!t.ctrlKey&&!t.metaKey||"Backspace"!==t.key||t.shiftKey||t.altKey?(t.ctrlKey||t.metaKey)&&'"'===t.key&&!t.shiftKey&&t.altKey:this.deleteFocus()}}createLabelDom(t){const e=`${t}-label-num`,n=w(null,"div",{class:"mathnote-label katex"}),o=w(n,"math");o.setAttribute("xmlns","http://www.w3.org/1998/Math/MathML"),o.setAttribute("display","block");const i=w(o,"semantics",{}),a=w(i,"mrow",{class:""});w(a,"mo",{class:"",stretchy:!1,textContent:"("}),w(a,"mn",{class:"matheq-label-num",id:e,textContent:"0"}),w(a,"mo",{class:"",stretchy:!1,textContent:")"});return this.dom.labels[e]=n.querySelector(`#${e}`),n}orderLabelNum(){requestAnimationFrame(function(){Array.from(this.dom.container.querySelectorAll(".matheq-label-num")).forEach(((t,e)=>{t.textContent=`${e+1}`}))}.bind(this))}addTextModeArea(t,e,n){const o=t.id,i=this.states[o]||n;if(!i)return;const a=w(null,"div",{class:"mathnote-block textmode",id:o});t.replaceWith(a);const r=w(a,"div",{class:"mathnote-text-container"}),s=w(r,"textarea",{class:"mathnote-text-textarea",autocapitalize:"off",id:`${o}-textmode-textarea`,rows:1,value:i.text||""}),d=()=>{i.text=s.value,i.isEmpty=""===i.text,s.style.height="auto",s.style.width="auto",s.style.height=s.scrollHeight+"px",s.style.width=s.scrollWidth+"px"};setTimeout(d,100),s.addEventListener("keydown",function(t){this.handleTextKeydown(t,s,a)}.bind(this),!1),s.addEventListener("focus",function(t){a.classList.add("focus")}.bind(this),!1),s.addEventListener("blur",function(t){a.classList.remove("focus")}.bind(this),!1),s.addEventListener("compositionstart",function(){this.isComposing=!0}.bind(this),!1),s.addEventListener("compositionend",function(){this.isComposing=!1}.bind(this),!1),s.addEventListener("input",d.bind(this),!1),e.blur(),e=null,s.focus(),setTimeout((function(){i.text||(s.value="",i.text=s.value,i.isEmpty=!0)}),0),this.orderLabelNum(),this.dom.blocks[o]=a,this.mathfields[o]=s,delete i.latex}handleTextKeydown(t,e,n){const o=this.states[this.focusId];if(!this.isComposing)if("ArrowUp"===t.key||"ArrowDown"===t.key){const o=e.selectionStart,i=o>0,a=o<e.value.length;("ArrowUp"!==t.key||i)&&("ArrowDown"!==t.key||a)||this.moveFocusUpDown(t,n)}else if("Enter"!==t.key||t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)if(!o.isEmpty||"Backspace"!==t.key||t.shiftKey||t.ctrlKey||t.altKey||t.metaKey){if(o.isEmpty&&(t.ctrlKey||t.metaKey)&&"/"===t.key){const t=this.focusId,e=this.states[t],{matheq:o,mathfield:i}=this.addMathModeArea(e);n.replaceWith(o),this.orderLabelNum(),i.focus(),delete e.text}}else this.deleteFocus();else t.preventDefault(),this.createEquationDom()}deleteFocus(){const t=this.focusId,e=this.dom.blocks[t]?.previousSibling;if(!e)return;this.dom.blocks[t].remove();const n=e.id;this.focusId=n,delete this.dom.blocks[t],delete this.states[t],e.focus()}moveFocusUpDown(t,e){const n=e.nextSibling,o=e.previousSibling;"ArrowDown"===t.key&&n?(n.focus(),this.focusId=n.id):"ArrowUp"===t.key&&o&&(o.focus(),this.focusId=o.id)}loadStates(t,e=null){this.mathfields={},this.dom.container.innerHTML="";const n=t=>{const e=t.id,n=parseInt(e.split("-").pop());n>=this._id_num&&(this._id_num=n+1);const{matheq:o,mathfield:i}=this.addMathModeArea(t);this.dom.container.appendChild(o),this.states[e]=t,t.latex?i.latex(t.latex):t.text&&this.addTextModeArea(o,i,t)};e?e.forEach((e=>{n(t[e])})):Object.values(t).forEach((t=>{n(t)})),this.orderLabelNum()}};const M=class{constructor(t={}){this.dom={},this.translate={x:0,y:0},this._background={type:"dot",size:20,lineStyle:"#aaa",lineWidth:1,color:"white"},this.background=Object.assign({},this._background),this.createTime=E(),this.dom.parent=t.parent||document.body,this.mouseClickStart={x:0,y:0},this.isDraggingCanvas=!1,this.draggingCanvasStart={x:0,y:0},this.currentDraggingNote=null,this.focusNote=null,this.drawingPath=!1,this.pathStart={x:0,y:0,id:null},this.initializeDom(),this.windowSize={x:window.innerWidth,y:window.innerHeight};const e=window.localStorage.getItem("isDarkMode");this.isDarkMode=`${e}`?"true"===e:window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,this.isUserToggleDarkLightMode=!!`${e}`}initializeDom(){this.dom.container=w(this.dom.parent,"div",{class:"freemath-container",style:"display: block; position: fixed; top: 0; left: 0; overflow: hidden; width: 100vw; height: 100vh;"}),this.dom.canvas=w(this.dom.container,"div",{class:"freemath-canvas",style:"display: block; position: fixed;  overflow: hidden; width: 100%; height: 100%;"}),this.dom.noteContainer=w(this.dom.container,"div",{class:"freemath-note-container",style:"display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"}),this.dom.favicon=document.querySelector("#favicon"),this.dom.notes={},this.dom.paths={},this.changeBackground(),this.initializeSVGLayer(),setTimeout((()=>{this.changeDarkLightModeEvent()}),0),this.dom.container.addEventListener("wheel",this.containerWheelEvents.bind(this),{passive:!0}),this.dom.container.addEventListener("dblclick",this.containerDoubleClickEvent.bind(this),!1),this.dom.container.addEventListener("mousedown",this.containerMouseDownEvent.bind(this),!1),this.dom.container.addEventListener("dragenter",this.preventDefaults,!1),this.dom.container.addEventListener("dragover",this.preventDefaults,!1),this.dom.container.addEventListener("drop",this.containerDropEvent.bind(this),!1),window.addEventListener("resize",this.windowResizeEvent.bind(this),!1),document.addEventListener("keydown",this.containerKeyDownEvent.bind(this),!1),document.addEventListener("keyup",this.containerKeyUpEvent.bind(this),!1),document.addEventListener("mousemove",this.containerMouseMoveEvent.bind(this),!1),document.addEventListener("mouseup",this.containerMouseUpEvent.bind(this),!1),window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",this.changeDarkLightModeEvent.bind(this),!1),window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",this.changeDarkLightModeEvent.bind(this),!1)}initializeSVGLayer(){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("overflow","visible"),t.style="display: block; width: 100%; height: 100%; position: absolute; left: 0; top: 0;",this.dom.pathContainer=t,this.dom.canvas.appendChild(t),this.dom.noteContainer.appendChild(t)}changeDarkLightModeEvent(t){this.isUserToggleDarkLightMode&&!t||(this.isDarkMode=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches),this.isDarkMode?(this.dom.favicon.href="./img/TexField.dark.png",this.background.lineStyle="#888",this.background.color="#333",this.changeBackground(),document.body.classList.add("dark")):(this.dom.favicon.href="./img/TexField.light.png",this.background.lineStyle=this._background.lineStyle,this.background.color=this._background.color,this.changeBackground(),document.body.classList.remove("dark"))}preventDefaults(t){t.preventDefault(),t.stopPropagation()}windowResizeEvent(t){const e=this.windowSize;this.translate.x+=.5*(window.innerWidth-e.x),this.translate.y+=.5*(window.innerHeight-e.y),this.moveToTranslation(),this.windowSize={x:window.innerWidth,y:window.innerHeight}}containerDropEvent(t){this.preventDefaults(t);const e=t.dataTransfer.files;if(e.length>0){const t=e[0],n=new FileReader;n.onload=t=>{const e=t.target.result;try{const t=JSON.parse(e);this.loadState(t)}catch(t){console.error(t)}},n.readAsText(t)}}loadState(t){Object.values(this.dom.notes).forEach((t=>{t.remove()})),window.MathEditors=[],this.dom.notes={},this.isDarkMode=t.isDarkMode,this.createTime=t.createTime,this.background=t.background,this.isUserToggleDarkLightMode=t.isUserToggleDarkLightMode,this.smoothMoveTo(t.translate);const e={};t.matheditors.forEach((t=>{e[t.id]=t,this.addNote(t.center.x,t.center.y,t.id,t.createTime,t.matheditor,t.order)})),t.linkpaths.forEach((t=>{const n=t[0],o=t[1];if(!n||!o)return;const i=e[n],a=e[o];this.createBezierCurve(i.center,a.center)}))}containerWheelEvents(t){t.ctrlKey||(this.translate.x-=t.deltaX,this.translate.y-=t.deltaY,this.moveToTranslation())}moveToTranslation(){const t=this.dom.container.getBoundingClientRect(),e=.5*t.width,n=.5*t.height;requestAnimationFrame(function(){this.dom.noteContainer.style.transform=`translate(${this.translate.x}px, ${this.translate.y}px)`,this.dom.canvas.style.backgroundPosition=`${e+this.translate.x}px ${n+this.translate.y}px`}.bind(this))}smoothMoveTo(t,e=500){return new Promise((n=>{const o=this.translate.x,i=this.translate.y,a=performance.now(),r=s=>{const d=s-a,c=Math.min(d/e,1),l=(h=c)<.5?4*h*h*h:1-Math.pow(-2*h+2,3)/2;var h;this.translate.x=o+(t.x-o)*l,this.translate.y=i+(t.y-i)*l;const u=this.dom.container.getBoundingClientRect(),m=.5*u.width,p=.5*u.height;this.dom.noteContainer.style.transform=`translate(${this.translate.x}px, ${this.translate.y}px)`,this.dom.canvas.style.backgroundPosition=`${m+this.translate.x}px ${p+this.translate.y}px`,c<1?requestAnimationFrame(r):n()};requestAnimationFrame(r)}))}containerDoubleClickEvent(t){t.preventDefault(),app.addNote(t.clientX-this.translate.x,t.clientY-this.translate.y)}containerMouseDownEvent(t){Object.values(this.dom.notes).forEach((t=>{t.classList.remove("focus")})),Object.values(this.dom.paths).forEach((t=>{t.dom.classList.remove("focus")}));const e=t.target.classList,n=e.contains("note"),o=e.contains("path"),i=function(t,e){if(!t)return null;let n=t;for(;n;){if(n===document.body)return null;if(n.matches(e))return n;n=n.parentElement}return null}(t.target,".note");if(!n&&!o)return this.focusNote=null,void(i||(this.isDraggingCanvas=!0,this.draggingCanvasStart.x=t.clientX,this.draggingCanvasStart.y=t.clientY,this.dom.container.classList.add("dragging")));if(!t.shiftKey||this.drawingPath||this.dom.drawingPath)n?(this.focusNote=i,this.focusNote.classList.add("focus"),this.currentDraggingNote=i,this.startX=t.clientX-i.offsetLeft,this.startY=t.clientY-i.offsetTop):o&&(this.focusNote=t.target,this.focusNote.classList.add("focus"));else{this.drawingPath=!0;const t=i.getBoundingClientRect(),e={x:t.left+.5*t.width-this.translate.x,y:t.top+.5*t.height-this.translate.y,id:i.id};this.dom.drawingPath=this.createBezierCurve(e,e),this.pathStart=e}}containerMouseMoveEvent(t){if(!t.shiftKey&&this.currentDraggingNote){const e=this.dom.noteContainer.getBoundingClientRect(),n=t.clientX-e.left-this.startX+this.translate.x,o=t.clientY-e.top-this.startY+this.translate.y;this.currentDraggingNote.style.left=`${n}px`,this.currentDraggingNote.style.top=`${o}px`;const i=this.currentDraggingNote.id;Object.keys(this.dom.paths).forEach((t=>{if(!t.includes(i))return;const e=this.dom.paths[t],n=this.currentDraggingNote.getBoundingClientRect(),o=n.left+.5*n.width-this.translate.x,a=n.top+.5*n.height-this.translate.y;i===e.start.id?(e.start.x=o,e.start.y=a):i===e.end.id&&(e.end.x=o,e.end.y=a),this.setBezierCurvePath(e.dom,e.start,e.end)}))}else if(t.shiftKey&&this.drawingPath&&this.dom.drawingPath){const e={x:t.clientX-this.translate.x,y:t.clientY-this.translate.y};this.setBezierCurvePath(this.dom.drawingPath,this.pathStart,e,this.pathStart.width,this.pathStart.width)}else if(this.isDraggingCanvas){const e=t.clientX-this.draggingCanvasStart.x,n=t.clientY-this.draggingCanvasStart.y;this.translate.x+=e,this.translate.y+=n,this.moveToTranslation(),this.draggingCanvasStart.x=t.clientX,this.draggingCanvasStart.y=t.clientY}}containerMouseUpEvent(t){if(this.isDraggingCanvas=!1,this.dom.container.classList.remove("dragging"),this.currentDraggingNote)this.currentDraggingNote=null;else if(this.drawingPath&&this.dom.drawingPath&&(this.dom.drawingPath.remove(),t.target.classList.contains("note"))){const e=t.target.id;if(this.pathStart.id===e)return;const n=`${this.pathStart.id}-${e}`;if(Object.keys(this.dom.paths).includes(n))return;const o=t.target.getBoundingClientRect(),i={x:o.left+.5*o.width-this.translate.x,y:o.top+.5*o.height-this.translate.y,id:e};this.dom.paths[n]={start:this.pathStart,end:i,dom:this.createBezierCurve(this.pathStart,i)}}this.dom.drawingPath=null,this.drawingPath=!1}containerKeyDownEvent(t){if(t.shiftKey&&!document.querySelector(".mq-focused")&&this.dom.container.classList.add("drawingPath"),this.focusNote&&"Backspace"===t.key){const t=this.focusNote.classList.contains("note")?"note":"path";if(!window.confirm(`Are you sure to delete this ${t}?`))return;const e=this.focusNote.id;this.focusNote.remove(),delete this.dom.notes[e],Object.keys(this.dom.paths).forEach((t=>{t.includes(e)&&this.dom.paths[t].dom.remove()})),window.MathEditors=window.MathEditors.filter((t=>t.id!==e))}else if(t.metaKey||t.ctrlKey)if("e"===t.key){t.preventDefault();const e=`freemath-${this.createTime}.json`;this.exportState(e)}else if("s"===t.key){t.preventDefault();const e=this.getState();console.log(e)}else"f"===t.key?(t.preventDefault(),this.toggleFullScreen()):"b"===t.key?(this.isUserToggleDarkLightMode||(this.isUserToggleDarkLightMode=!0),this.isDarkMode=!this.isDarkMode,this.changeDarkLightModeEvent(),window.localStorage.setItem("isDarkMode",this.isDarkMode)):t.altKey?["Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9"].includes(t.code)&&this.centerNote(parseInt(t.code.replace("Digit",""))):"p"===t.key&&(t.preventDefault(),this.printInfiniteCanvas())}containerKeyUpEvent(){this.dom.container.classList.remove("drawingPath")}toggleFullScreen(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}centerNote(t){if(!window.MathEditors||t>window.MathEditors.length)return;const e=window.MathEditors[t-1];if(!e)return;const n=e.id;if(!n)return;const o=document.querySelector(`#${n}`);if(!o)return;const i=o.getBoundingClientRect(),a=i.left+.5*i.width,r=i.top+.5*i.height,s={x:this.translate.x+.5*window.innerWidth-a,y:this.translate.y+.5*window.innerHeight-r};this.smoothMoveTo(s,200);const d=window.MathEditors.find((t=>t.id===n));if(!d)return;const c=Object.values(d.mathfields),l=c[c.length-1];l.focus()}getState(){if(!window.MathEditors)return;const t={translate:this.translate,isDarkMode:this.isDarkMode,isUserToggleDarkLightMode:this.isUserToggleDarkLightMode,createTime:this.createTime,background:this.background,matheditors:[],linkpaths:[]};return window.MathEditors.forEach((e=>{const n=e.id,o=this.dom.noteContainer.querySelector(`#${n}`);if(!o)return;const i=Array.from(o.querySelectorAll("div")).filter((t=>t.id.includes(`${n}-`))).map((t=>t.id)),a=parseFloat(o.style.left.replace("px","")),r=parseFloat(o.style.top.replace("px","")),s={id:n,matheditor:e.states,order:i,center:{x:a,y:r},createTime:o.getAttribute("data-create-time")};t.matheditors.push(s)})),Object.keys(this.dom.paths).forEach((e=>{t.linkpaths.push(e.split("-"))})),t}exportState(t){const e=this.getState(),n="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e,null,4)),o=document.createElement("a");o.setAttribute("href",n),o.setAttribute("download",t),document.body.appendChild(o),o.click(),o.remove()}createBezierCurve(t,e,n=null,o=null){const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.classList.add("path"),i.setAttribute("fill","none"),this.setBezierCurvePath(i,t,e,n,o),this.dom.pathContainer.appendChild(i),i}setBezierCurvePath(t,e,n,o=null,i=null){const a=e.x,r=e.y,s=n.x,d=n.y,c=a+.7*(s-a),l=r,h=s-.7*(s-a),u=d;t.setAttribute("d",`M ${a} ${r} C ${c} ${l}, ${h} ${u}, ${s} ${d}`)}addNote(t,e,n=null,o=null,i=null,a=null){n=n||k(`${t}-${e}-${Date.now()}`.padStart(50,"0")).slice(0,10);const r=w(this.dom.noteContainer,"div",{class:"note",id:n,draggable:!1,style:`display: block; absolute; top: ${e}px; left: ${t}px;`,dataset:{createTime:o||E()}});new L({parent:r,id:n,states:i,order:a});this.dom.notes[n]=r}changeBackground(){const t=this.dom.canvas,e=this.background;if("none"===e.type)return t.style.backgroundColor=e.color,void(t.style.backgroundImage="none");const n=this.dom.container.getBoundingClientRect(),o=.5*n.width,i=.5*n.height;t.style.background=e.color,"dot"===e.type?t.style.backgroundImage=`radial-gradient(${e.lineStyle} ${e.lineWidth}px, transparent 0)`:"grid"===e.type&&(t.style.backgroundImage=`linear-gradient(to right, ${e.lineStyle} ${e.lineWidth}px, transparent ${e.lineWidth}px), linear-gradient(to bottom, ${e.lineStyle} ${e.lineWidth}px, transparent ${e.lineWidth}px)`),t.style.backgroundPosition=`${o+this.translate.x}px ${i+this.translate.y}px`,t.style.backgroundSize=`${e.size}px ${e.size}px`}printInfiniteCanvas(){const t={xmin:1/0,ymin:1/0,xmax:-1/0,ymax:-1/0},e={x:this.translate.x,y:this.translate.y},n=`${this.background.type}`;this.background.type="none",this.changeBackground(),Object.values(this.dom.notes).forEach((e=>{const n=e.getBoundingClientRect(),o=n.x,i=n.y,a=n.x+n.width,r=n.y+n.height;o<t.xmin&&(t.xmin=o),i<t.ymin&&(t.ymin=i),a>t.xmax&&(t.xmax=a),r>t.ymax&&(t.ymax=r)})),this.smoothMoveTo({x:this.translate.x-t.xmin,y:this.translate.y-t.ymin},200).then((()=>{!function(t){const e=document.createElement("style");e.type="text/css",e.media="print",e.innerText=t,document.head.appendChild(e)}(`@page {size: ${t.xmax-t.xmin}px ${t.ymax-t.ymin}px; margin: 0;}`),document.title=`TexField-${E()}`;const o=()=>{this.smoothMoveTo(e,200),this.background.type=n,this.changeBackground(),window.removeEventListener("afterprint",o)};window.addEventListener("afterprint",o.bind(this),!1),window.print()}))}};window.addEventListener("load",(t=>{const e=new M({});e.addNote(.5*window.innerWidth,.5*window.innerHeight),window.app=e}))})();