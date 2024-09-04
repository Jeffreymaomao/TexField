// ==UserScript==
// @name         TexField Plug-in: Open Desmos
// @namespace    http://tampermonkey.net/
// @version      2024-08-09
// @description  Integrates TexField with Desmos by allowing users to open Desmos and automatically transfer mathematical expressions between TexField and Desmos.
// @author       Chang-Mao, Yang
// @match        https://jeffreymaomao.github.io/TexField/dist/*
// @match        https://www.desmos.com/calculator*
// @icon         https://jeffreymaomao.github.io/TexField/dist/img/TexField.light.png
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    ////////////////////////////////////////////////////////////////////////////////////
    const GM_VALUE_KEY = 'TexField-Desmos-Plug-in-state';
    const TEXFIELD_APP = 'app';
    const DESMOS_CALCULATOR = 'Calc';
    ////////////////////////////////////////////////////////////////////////////////////
    const currentUrl = window.location.href;
    if (currentUrl.startsWith('https://jeffreymaomao.github.io/TexField/dist/')){
        waitForAppVariable(TEXFIELD_APP, (app)=>{
            app.openDesmos = TexFieldPage.openDesmos; // rewrite openDesmos method
        });
    } else if (currentUrl.startsWith('https://www.desmos.com/calculator')) {
        const texFieldData = GM_getValue(GM_VALUE_KEY);
        GM_deleteValue(GM_VALUE_KEY);
        if(!texFieldData) return;
        waitForAppVariable(DESMOS_CALCULATOR, (Calc)=>{
            DesmosPage.loadState(texFieldData); // load desmos state
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////

    const DesmosPage = {
        loadState: (texFieldData)=>{
            const Calc = window.Calc || unsafeWindow.Calc;
            if(!Calc.setState) return;
            Calc.setState(texFieldData);
        }
    };
    const TexFieldPage = {
        openDesmos: ()=>{
            const app = window.app || unsafeWindow.app;
            if(!app.getState) return;
            GM_setValue(GM_VALUE_KEY, TexFieldPage.getState());
            GM_openInTab('https://www.desmos.com/calculator', { active: true, insert: true });
        },
        getState: ()=>{
            const app = window.app || unsafeWindow.app;
            if(!app.getState) return;
            const state = {
                version:11,
                expressions: {
                    list: [],
                }
            };
            const appState = app.getState();
            const matheditors = appState.matheditors;
            matheditors.forEach((matheditor, index)=>{
                const folderId = matheditor.id;
                state.expressions.list.push({
                    type: "folder",
                    id: folderId,
                    title: `Note-${index+1}`
                });
                Object.values(matheditor.matheditor).forEach((equation)=>{
                    state.expressions.list.push({
                        type: "expression",
                        id: equation.id,
                        folderId: folderId,
                        latex: equation.latex || ''
                    });
                });
            });
            return state;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    function waitForAppVariable(variable, callback) {
        const intervalId = setInterval(() => {
            if (typeof window[variable] !== 'undefined') {
                clearInterval(intervalId);
                callback(window[variable]);
            } else if(typeof unsafeWindow[variable] !== 'undefined'){
                clearInterval(intervalId);
                callback(unsafeWindow[variable]);
            }
        }, 100);
    }
})();