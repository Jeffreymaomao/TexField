function getLaTeX(noteContainer, isMarkdown){
    let LaTeX = isMarkdown ? '' : '\\documentclass{article}\n';
    if(!isMarkdown){
        ['amsmath', 'amssymb', 'amsfonts', 'geometry', 'physics']
            .forEach(p=>LaTeX+=`\\usepackage{${p}}\n`);
        LaTeX += '\\begin{document}\n\n';
    }

    window.MathEditors.forEach((matheditor, index) => {
        const id = matheditor.id;
        const dom = noteContainer.querySelector(`#${id}`);
        if (!dom) return;
        const order = Array.from(dom.querySelectorAll("div")).filter(m => m.id.includes(`${id}-`)).map(m => m.id);
        if(isMarkdown){

        } else {
            LaTeX += '%'.repeat(60)+'\n';
            LaTeX += `\\section{Note-${index+1}}\t%${id}\n\n`;
        }
        Object.keys(matheditor.states).forEach(stateId=>{
            const state = matheditor.states[stateId];
            if(!state.latex) return;
            if(isMarkdown){
                LaTeX += `$$\n${state.latex}\n$$\n\n`;
            } else {
                LaTeX += `%${stateId}\n`
                LaTeX += `\\begin{equation}\n${state.latex}\n\\end{equation}\n\n`;
            }
        });
    });
    if(!isMarkdown) LaTeX += '\\end{document}';
    return LaTeX;
}

export {
    getLaTeX
};