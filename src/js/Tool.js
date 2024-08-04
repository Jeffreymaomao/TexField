function createAndAppendElement(parent, tag, attributes = {}) {
    const element = document.createElement(tag);

    // class 
    if (attributes.class) {
        attributes.class.split(" ").forEach(className => element.classList.add(className));
        delete attributes.class; // delete class in attributes
    }
    // dataset
    if (attributes.dataset) {
        Object.keys(attributes.dataset).forEach(key => element.dataset[key] = attributes.dataset[key]);
        delete attributes.dataset; // delete dataset in attributes
    }
    // other attributes
    Object.keys(attributes).forEach(key => {
        element[key] = attributes[key];
        if (!element[key]) element.setAttribute(key, attributes[key]);
    });

    Object.keys(attributes).forEach(key => { element[key] = attributes[key] });

    if (parent) parent.appendChild(element);
    return element;
}

function hash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    hash = Math.abs(hash);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; //  + 'abcdefghijklmnopqrstuvwxyz' + '0123456789'
    const n = chars.length;
    let result = '';
    while (hash > 0) {
        const shift = Math.floor(Math.random() * 1000);
        result = chars[(hash + shift) % n] + result;
        hash = Math.floor(hash / n * 10);
    }
    return result;
}

function getTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}.${minutes}.${seconds}.${milliseconds}`;
}

function addStyle(style) {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.media = "print";
    styleSheet.innerText = style;
    document.head.appendChild(styleSheet);
}

export default {
    createAndAppendElement,
    hash,
    getTime,
    addStyle
}