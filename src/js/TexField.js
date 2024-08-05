import MathEditor from './MathEditor.js';
import {
    createAndAppendElement,
    hash,
    getTime,
    addStyle,
    findParentWithSelector
} from './Tool.js';

class TexField {
    constructor(config = {}) {
        this.dom = {};
        this.translate = { x: 0, y: 0 };
        this._background = {
            type: 'dot', // 'dot' / 'grid' / 'none'
            size: 20,
            lineStyle: '#aaa',
            lineWidth: 1,
            color: 'white'
        }; // this is light default background config
        this.background = Object.assign({}, this._background);
        this.createTime = getTime();
        this.dom.parent = config.parent || document.body;
        this.mouseClickStart = { x: 0, y: 0 };
        this.isDraggingCanvas = false;
        this.draggingCanvasStart = { x: 0, y: 0 };
        this.currentDraggingNote = null;
        this.focusNote = null;
        this.drawingPath = false;
        this.pathStart = { x: 0, y: 0, id: null };
        this.initializeDom();
        this.windowSize = { x: window.innerWidth, y: window.innerHeight };
        const localStorageDarkMode = window.localStorage.getItem("isDarkMode");
        this.isDarkMode = `${localStorageDarkMode}` ? localStorageDarkMode === 'true' : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        this.isUserToggleDarkLightMode = `${localStorageDarkMode}` ? true : false;
    }

    initializeDom() {
        this.dom.container = createAndAppendElement(this.dom.parent, 'div', {
            class: 'freemath-container',
            style: 'display: block; position: fixed; top: 0; left: 0; overflow: hidden; width: 100vw; height: 100vh;'
        });

        this.dom.canvas = createAndAppendElement(this.dom.container, 'div', {
            class: 'freemath-canvas',
            style: 'display: block; position: fixed;  overflow: hidden; width: 100%; height: 100%;'
        });

        this.dom.noteContainer = createAndAppendElement(this.dom.container, 'div', {
            class: 'freemath-note-container',
            style: 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%;'
        });

        this.dom.favicon = document.querySelector('#favicon');

        this.dom.notes = {};
        this.dom.paths = {};
        this.changeBackground();
        this.initializeSVGLayer();
        setTimeout(() => { this.changeDarkLightModeEvent() }, 0); // since getLocalStorage may take time...

        this.dom.container.addEventListener('wheel', this.containerWheelEvents.bind(this), { passive: true });
        this.dom.container.addEventListener('dblclick', this.containerDoubleClickEvent.bind(this), false);
        this.dom.container.addEventListener('mousedown', this.containerMouseDownEvent.bind(this), false);
        this.dom.container.addEventListener('dragenter', this.preventDefaults, false);
        this.dom.container.addEventListener('dragover', this.preventDefaults, false);
        this.dom.container.addEventListener('drop', this.containerDropEvent.bind(this), false);
        window.addEventListener('resize', this.windowResizeEvent.bind(this), false);
        document.addEventListener('keydown', this.containerKeyDownEvent.bind(this), false);
        document.addEventListener('keyup', this.containerKeyUpEvent.bind(this), false);
        document.addEventListener('mousemove', this.containerMouseMoveEvent.bind(this), false);
        document.addEventListener('mouseup', this.containerMouseUpEvent.bind(this), false);
        if (window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.changeDarkLightModeEvent.bind(this), false);
        if (window.matchMedia) window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', this.changeDarkLightModeEvent.bind(this), false);
    }

    initializeSVGLayer() {
        const pathContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        pathContainer.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        pathContainer.setAttribute('overflow', 'visible');
        pathContainer.style = 'display: block; width: 100%; height: 100%; position: absolute; left: 0; top: 0;';
        this.dom.pathContainer = pathContainer;
        this.dom.canvas.appendChild(pathContainer);
        this.dom.noteContainer.appendChild(pathContainer);
    }

    changeDarkLightModeEvent(e) {
        if (!this.isUserToggleDarkLightMode || e) this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (this.isDarkMode) { // dark mode
            this.dom.favicon.href = "./img/TexField.dark.png";
            this.background.lineStyle = '#888';
            this.background.color = '#333';
            this.changeBackground();
            document.body.classList.add("dark");
        } else { // light mode
            this.dom.favicon.href = "./img/TexField.light.png";
            this.background.lineStyle = this._background.lineStyle;
            this.background.color = this._background.color;
            this.changeBackground();
            document.body.classList.remove("dark");
        }
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    windowResizeEvent(e) {
        const previouseSize = this.windowSize;
        this.translate.x += (window.innerWidth - previouseSize.x) * 0.5;
        this.translate.y += (window.innerHeight - previouseSize.y) * 0.5;
        this.moveToTranslation();
        this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    }

    containerDropEvent(e) {
        this.preventDefaults(e);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0]; // reading first file
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                try {
                    const state = JSON.parse(fileContent);
                    this.loadState(state);
                } catch (e) {
                    console.error(e);
                }
            };
            reader.readAsText(file);
        }
    }

    loadState(state) {
        Object.values(this.dom.notes).forEach(note => { note.remove(); });
        window.MathEditors = [];
        this.dom.notes = {};
        this.isDarkMode = state.isDarkMode;
        this.createTime = state.createTime;
        this.background = state.background;
        this.isUserToggleDarkLightMode = state.isUserToggleDarkLightMode;
        this.smoothMoveTo(state.translate); // this.translate = state.translate;
        const matheditors = {};
        state.matheditors.forEach(matheditor => {
            matheditors[matheditor.id] = matheditor;
            this.addNote(
                matheditor.center.x,
                matheditor.center.y,
                matheditor.id,
                matheditor.createTime,
                matheditor.matheditor,
                matheditor.order);
        });
        state.linkpaths.forEach(linkpath => {
            const startId = linkpath[0],
                endId = linkpath[1];
            if (!startId || !endId) return;
            const start = matheditors[startId];
            const end = matheditors[endId];
            this.createBezierCurve(start.center, end.center);
        });
    }

    containerWheelEvents(e) {
        if (e.ctrlKey) return;
        // e.preventDefault();
        this.translate.x -= e.deltaX;
        this.translate.y -= e.deltaY;
        this.moveToTranslation();
    }

    moveToTranslation() {
        const rect = this.dom.container.getBoundingClientRect();
        const center = { x: rect.width * 0.5, y: rect.height * 0.5 };
        requestAnimationFrame(function() {
            this.dom.noteContainer.style.transform = `translate(${this.translate.x}px, ${this.translate.y}px)`;
            this.dom.canvas.style.backgroundPosition = `${center.x + this.translate.x}px ${center.y + this.translate.y}px`;
        }.bind(this));
    }

    smoothMoveTo(targetTranslate, duration = 500) {
        return new Promise((resolve) => {
            const startTranslate = { x: this.translate.x, y: this.translate.y };
            const startTime = performance.now();

            const easeInOut = (t) => {
                return t < 0.5 ?
                    4 * t * t * t :
                    1 - Math.pow(-2 * t + 2, 3) / 2;
            };

            const animate = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = easeInOut(progress);

                this.translate.x = startTranslate.x + (targetTranslate.x - startTranslate.x) * easedProgress;
                this.translate.y = startTranslate.y + (targetTranslate.y - startTranslate.y) * easedProgress;

                const rect = this.dom.container.getBoundingClientRect();
                const center = { x: rect.width * 0.5, y: rect.height * 0.5 };

                this.dom.noteContainer.style.transform = `translate(${this.translate.x}px, ${this.translate.y}px)`;
                this.dom.canvas.style.backgroundPosition = `${center.x + this.translate.x}px ${center.y + this.translate.y}px`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        })
    }


    containerDoubleClickEvent(e) {
        e.preventDefault();
        app.addNote(e.clientX - this.translate.x, e.clientY - this.translate.y);
    }

    containerMouseDownEvent(e) {
        // remove focus
        Object.values(this.dom.notes).forEach(note => { note.classList.remove('focus'); })
        Object.values(this.dom.paths).forEach(path => { path.dom.classList.remove('focus'); })
        const targetClassList = e.target.classList;
        const targetIsNote = targetClassList.contains('note')
        const targetIsPath = targetClassList.contains('path');
        const parentNoteDom = findParentWithSelector(e.target, '.note');
        
        if(!targetIsNote && !targetIsPath){
            this.focusNote = null;
            if (!parentNoteDom) {
                this.isDraggingCanvas = true;
                this.draggingCanvasStart.x = e.clientX;
                this.draggingCanvasStart.y = e.clientY;
                this.dom.container.classList.add("dragging");
            }
            return;
        }

        if (e.shiftKey && !this.drawingPath && !this.dom.drawingPath) {
            // start to draw path
            this.drawingPath = true;
            const noteRect = parentNoteDom.getBoundingClientRect();
            const centerX = noteRect.left + (noteRect.width * 0.5) - this.translate.x;
            const centerY = noteRect.top + (noteRect.height * 0.5) - this.translate.y;

            const pathStart = { x: centerX, y: centerY, id: parentNoteDom.id };
            this.dom.drawingPath = this.createBezierCurve(pathStart, pathStart);
            this.pathStart = pathStart;
        } else if(targetIsNote) {
            // focus note
            this.focusNote = parentNoteDom;
            this.focusNote.classList.add("focus");
            // dradding note
            this.currentDraggingNote = parentNoteDom;
            this.startX = e.clientX - parentNoteDom.offsetLeft;
            this.startY = e.clientY - parentNoteDom.offsetTop;
        }  else if(targetIsPath) {
            // focus path
            this.focusNote = e.target;
            this.focusNote.classList.add("focus");
        }
    }

    containerMouseMoveEvent(e) {
        if (!e.shiftKey && this.currentDraggingNote) {
            const containerRect = this.dom.noteContainer.getBoundingClientRect();
            const newX = e.clientX - containerRect.left - this.startX + this.translate.x;
            const newY = e.clientY - containerRect.top - this.startY + this.translate.y;
            this.currentDraggingNote.style.left = `${newX}px`;
            this.currentDraggingNote.style.top = `${newY}px`;
            const draggingId = this.currentDraggingNote.id;
            Object.keys(this.dom.paths).forEach((pathId) => {
                if (!pathId.includes(draggingId)) return;
                const path = this.dom.paths[pathId];
                const noteRect = this.currentDraggingNote.getBoundingClientRect();
                const centerX = noteRect.left + (noteRect.width * 0.5) - this.translate.x;
                const centerY = noteRect.top + (noteRect.height * 0.5) - this.translate.y;
                if (draggingId === path.start.id) {
                    path.start.x = centerX;
                    path.start.y = centerY;
                } else if (draggingId === path.end.id) {
                    path.end.x = centerX;
                    path.end.y = centerY;
                }
                this.setBezierCurvePath(path.dom, path.start, path.end);
            });

        } else if (e.shiftKey && this.drawingPath && this.dom.drawingPath) {
            const pathEnd = { x: e.clientX - this.translate.x, y: e.clientY - this.translate.y };
            this.setBezierCurvePath(this.dom.drawingPath, this.pathStart, pathEnd, this.pathStart.width, this.pathStart.width);
        } else if (this.isDraggingCanvas) {
            const deltaX = e.clientX - this.draggingCanvasStart.x;
            const deltaY = e.clientY - this.draggingCanvasStart.y;
            this.translate.x += deltaX;
            this.translate.y += deltaY;
            this.moveToTranslation();
            this.draggingCanvasStart.x = e.clientX;
            this.draggingCanvasStart.y = e.clientY;
        }
    }

    containerMouseUpEvent(e) {
        this.isDraggingCanvas = false;
        this.dom.container.classList.remove("dragging");
        if (this.currentDraggingNote) {
            this.currentDraggingNote = null;
        } else if (this.drawingPath && this.dom.drawingPath) {
            // end to draw path
            this.dom.drawingPath.remove();
            if (e.target.classList.contains('note')) {
                const pathEndId = e.target.id;
                if (this.pathStart.id === pathEndId) return;
                const pathId = `${this.pathStart.id}-${pathEndId}`
                if (Object.keys(this.dom.paths).includes(pathId)) return;
                // add path
                const noteRect = e.target.getBoundingClientRect();
                const centerX = noteRect.left + (noteRect.width * 0.5) - this.translate.x;
                const centerY = noteRect.top + (noteRect.height * 0.5) - this.translate.y;

                const pathEnd = { x: centerX, y: centerY, id: pathEndId };
                this.dom.paths[pathId] = {
                    start: this.pathStart,
                    end: pathEnd,
                    dom: this.createBezierCurve(this.pathStart, pathEnd)
                }
            }
        }
        this.dom.drawingPath = null;
        this.drawingPath = false;
    }

    containerKeyDownEvent(e) {
        if (e.shiftKey && !document.querySelector(".mq-focused")) {
            this.dom.container.classList.add("drawingPath");
        }
        // ---
        if (this.focusNote && e.key === 'Backspace') {
            const name = this.focusNote.classList.contains("note") ? 'note' : 'path';
            const confirmed = window.confirm(`Are you sure to delete this ${name}?`);
            if (!confirmed) return;
            const deleteId = this.focusNote.id;
            this.focusNote.remove();
            delete this.dom.notes[deleteId];
            Object.keys(this.dom.paths).forEach(pathId => {
                if (!pathId.includes(deleteId)) return;
                this.dom.paths[pathId].dom.remove();
            });
            window.MathEditors = window.MathEditors.filter(matheditor => matheditor.id !== deleteId);
        } else if (e.metaKey || e.ctrlKey) {
            if (e.key === 'e') { // export 
                e.preventDefault();
                const filename = `freemath-${this.createTime}.json`;
                this.exportState(filename);
            } else if (e.key === 's') { // save
                e.preventDefault();
                const states = this.getState();
                console.log(states)
            } else if (e.key === 'f') { // fullscreen
                e.preventDefault();
                this.toggleFullScreen()
            } else if (e.key === 'b') {
                if (!this.isUserToggleDarkLightMode) { this.isUserToggleDarkLightMode = true; }
                this.isDarkMode = !this.isDarkMode;
                this.changeDarkLightModeEvent();
                window.localStorage.setItem("isDarkMode", this.isDarkMode);

            } else if (e.altKey) { // center matheditor
                // if(document.querySelector('.mq-focused, .focus')) return;
                if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9'].includes(e.code)) {
                    this.centerNote(parseInt(e.code.replace('Digit', '')));
                }
            } else if (e.key === 'p') {
                e.preventDefault();
                this.printInfiniteCanvas();
            }
        }
    }

    containerKeyUpEvent() {
        this.dom.container.classList.remove("drawingPath");
    }

    toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    centerNote(num) {
        if (!window.MathEditors || num > window.MathEditors.length) return;
        // num: 1,2,3,4,5,6,7,8,9
        const lastMatheditor = window.MathEditors[num - 1];
        if (!lastMatheditor) return;
        const id = lastMatheditor.id;
        if (!id) return;
        const centerDom = document.querySelector(`#${id}`);
        if (!centerDom) return;
        const noteRect = centerDom.getBoundingClientRect();
        const targetCenterX = noteRect.left + (noteRect.width * 0.5);
        const targetCenterY = noteRect.top + (noteRect.height * 0.5);
        const targetTranslate = {
            x: this.translate.x + window.innerWidth * 0.5 - targetCenterX,
            y: this.translate.y + window.innerHeight * 0.5 - targetCenterY
        };
        this.smoothMoveTo(targetTranslate, 200);
        const centerMathEditor = window.MathEditors.find(m => m.id === id);
        if (!centerMathEditor) return;
        const mathfields = Object.values(centerMathEditor.mathfields);
        const lastMathfield = mathfields[mathfields.length - 1];
        if (!lastMathfield) lastMathfield;
        lastMathfield.focus();
    }

    getState() {
        if (!window.MathEditors) return;
        const states = {
            translate: this.translate,
            isDarkMode: this.isDarkMode,
            isUserToggleDarkLightMode: this.isUserToggleDarkLightMode,
            createTime: this.createTime,
            background: this.background,
            matheditors: [],
            linkpaths: []
        };
        window.MathEditors.forEach(matheditor => {
            const id = matheditor.id;
            const dom = this.dom.noteContainer.querySelector(`#${id}`);
            if (!dom) return;
            const order = Array.from(dom.querySelectorAll("div")).filter(m => m.id.includes(`${id}-`)).map(m => m.id);
            const centerX = parseFloat(dom.style.left.replace('px', ''))
            const centerY = parseFloat(dom.style.top.replace('px', ''))
            const state = {
                id: id,
                matheditor: matheditor.states,
                order: order,
                center: {
                    x: centerX,
                    y: centerY,
                },
                createTime: dom.getAttribute("data-create-time")
            };
            states.matheditors.push(state);
        });

        Object.keys(this.dom.paths).forEach(pathId => {
            states.linkpaths.push(pathId.split("-"));
        });
        return states;
    }

    exportState(filename) {
        const states = this.getState();
        // ------
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(states, null, 4));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", filename);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove()
    }

    createBezierCurve(start, end, startWidth = null, endWidth = null) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.classList.add("path");
        path.setAttribute('fill', 'none');
        this.setBezierCurvePath(path, start, end, startWidth, endWidth);
        this.dom.pathContainer.appendChild(path);
        return path;
    }

    setBezierCurvePath(path, start, end, startWidth = null, endWidth = null) {
        const x1 = start.x,
            y1 = start.y,
            x2 = end.x,
            y2 = end.y;
        const w1 = (x2 - x1) * 0.7;
        const w2 = (x2 - x1) * 0.7;
        const cx1 = x1 + w1,
            cy1 = y1,
            cx2 = x2 - w2,
            cy2 = y2;
        path.setAttribute('d', `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`);
    }

    addNote(x, y, id = null, createTime = null, state = null, order = null) {
        id = id || hash(`${x}-${y}-${Date.now()}`.padStart(50, '0')).slice(0, 10)
        // ---
        const note = createAndAppendElement(this.dom.noteContainer, 'div', {
            class: 'note',
            id: id,
            draggable: false,
            style: `display: block; absolute; top: ${y}px; left: ${x}px;`,
            dataset: {
                createTime: createTime || getTime()
            }
        });
        const mathEditor = new MathEditor({
            parent: note,
            id: id,
            states: state,
            order: order
        });
        // ---
        this.dom.notes[id] = note;
    }

    changeBackground() {
        const canvas = this.dom.canvas;
        const config = this.background;
        if (config.type === 'none'){
            canvas.style.backgroundColor = config.color;
            canvas.style.backgroundImage = 'none';
            return;
        }
        const rect = this.dom.container.getBoundingClientRect();
        const center = { x: rect.width * 0.5, y: rect.height * 0.5 };

        canvas.style.background = config.color;
        if (config.type === 'dot') {
            canvas.style.backgroundImage = `radial-gradient(${config.lineStyle} ${config.lineWidth}px, transparent 0)`;
        } else if (config.type === 'grid') {
            canvas.style.backgroundImage = `linear-gradient(to right, ${config.lineStyle} ${config.lineWidth}px, transparent ${config.lineWidth}px), linear-gradient(to bottom, ${config.lineStyle} ${config.lineWidth}px, transparent ${config.lineWidth}px)`;
        }
        canvas.style.backgroundPosition = `${center.x + this.translate.x}px ${center.y + this.translate.y}px`;
        canvas.style.backgroundSize = `${config.size}px ${config.size}px`;
    }

    // --- below is to print PDF

    printInfiniteCanvas() {
        const range = {
            xmin: Infinity,
            ymin: Infinity,
            xmax: -Infinity,
            ymax: -Infinity,
        };
        const previousTranslate = {
            x: this.translate.x,
            y: this.translate.y
        };
        const previousBackgroundType = `${this.background.type}`;
        this.background.type = 'none';
        this.changeBackground();

        Object.values(this.dom.notes).forEach(note => {
            const rect = note.getBoundingClientRect();
            const xmin = rect.x; // top left x
            const ymin = rect.y; // top left y
            const xmax = rect.x + rect.width; // bottom right x
            const ymax = rect.y + rect.height; // bottom right x
            if (xmin < range.xmin) range.xmin = xmin;
            if (ymin < range.ymin) range.ymin = ymin;
            if (xmax > range.xmax) range.xmax = xmax;
            if (ymax > range.ymax) range.ymax = ymax;
        });
        this.smoothMoveTo({
            x: this.translate.x-range.xmin,
            y: this.translate.y-range.ymin
        }, 200).then(()=>{
            const pWidth = (range.xmax - range.xmin);
            const pHeight = (range.ymax - range.ymin);

            addStyle(`@page {size: ${pWidth}px ${pHeight}px; margin: 0;}`)
            document.title = `TexField-${getTime()}`;

            const restorePosition = () => {
                // reset
                this.smoothMoveTo(previousTranslate, 200);
                this.background.type = previousBackgroundType;
                this.changeBackground();
                window.removeEventListener('afterprint', restorePosition);
            };
            window.addEventListener('afterprint', restorePosition.bind(this), false);
            window.print();
        });
    }
}

export default TexField;