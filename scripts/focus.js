/**
 * Adds an event listener to keep track of pressed arrow keys.
 */
export function initializeFocusEvent() {
    window.addEventListener('keydown',(e)=>{
        let current_focus = document.activeElement;
        if(e.key=="ArrowRight") {
            focusRight(current_focus);
        } else if(e.key=="ArrowLeft") {
            focusLeft(current_focus);
        } else if(e.key=="ArrowDown") {
            focusDown(current_focus);
        } else if(e.key=="ArrowUp") {
            focusUp(current_focus);
        }

    });
}

/**
 * Moves page focus to the right of the current element.
 * @param {Element} current_focus - The element which is currently focused.
 */
function focusRight(current_focus) {
    if(current_focus.classList.value=='grid-cell') {
        if(Number(current_focus.dataset.x)<15){
            document.querySelector(`#cell-${Number(current_focus.dataset.x)+1}-${Number(current_focus.dataset.y)}`).focus();
        } else {
            document.querySelector('#settings-button').focus();
        }
    } else if(current_focus.id=='settings-button') {
        document.querySelector('#puzzle-list-0').focus();
    } else if(current_focus.id.includes('puzzle-list')) {
        document.querySelector('#cell-0-0').focus();
    } else if(current_focus.id.includes('color-selector')) {
        const index = Number(current_focus.dataset.index);
        if(index==2 || index==5 || index==8) {
            document.querySelector('#cell-0-0').focus();
        } else {
            const next_selector = document.querySelector(`#color-selector-${index+1}`);
            if(next_selector==null) {
                document.querySelector('#cell-0-0').focus();
            } else {
                next_selector.focus();
            }
        }
    }
}

/**
 * Moves page focus to the left of the current element.
 * @param {Element} current_focus - The element which is currently focused.
 */
function focusLeft(current_focus) {
    if(current_focus.classList.value=='grid-cell') {
            if(Number(current_focus.dataset.x)>0){
                document.querySelector(`#cell-${Number(current_focus.dataset.x)-1}-${Number(current_focus.dataset.y)}`).focus();
            } else {
                document.querySelector('#puzzle-list-0').focus();
            }
        } else if(current_focus.id=='settings-button') {
            document.querySelector('#cell-15-0').focus();
        } else if(current_focus.id.includes('puzzle-list')) {
            document.querySelector('#settings-button').focus();
        } else if(current_focus.id.includes('color-selector')) {
            const index = Number(current_focus.dataset.index);
            if(index==0 || index==3 || index==6) {
                document.querySelector('#settings-button').focus();
            } else {
                document.querySelector(`#color-selector-${index-1}`).focus();
            }
        }
}

/**
 * Moves page focus down from the current element.
 * @param {Element} current_focus - The element which is currently focused.
 */
function focusDown(current_focus) {
    if(current_focus.classList.value=='grid-cell') {
            if(Number(current_focus.dataset.y)<15){
                document.querySelector(`#cell-${Number(current_focus.dataset.x)}-${Number(current_focus.dataset.y)+1}`).focus();
            } else {
                document.querySelector(`#cell-${Number(current_focus.dataset.x)}-0`).focus();
            }
        } else if(current_focus.id=='settings-button') {
            document.querySelector('#cell-15-0').focus();
        } else if(current_focus.id.includes('puzzle-list')) {
            const next_puzzle = document.querySelector(`#puzzle-list-${Number(current_focus.dataset.index)+1}`);
            if(next_puzzle==null) {
                document.querySelector('#color-selector-0').focus();
            } else {
                next_puzzle.focus();
            }
        } else if(current_focus.id.includes('color-selector')) {
            const index = Number(current_focus.dataset.index);
            if(index==6 || index==7 || index==8) {
                document.querySelector('#puzzle-list-0').focus();
            } else {
                const next_selector = document.querySelector(`#color-selector-${index+3}`);
                if(next_selector==null) {
                    document.querySelector('#puzzle-list-0').focus();
                } else {
                    next_selector.focus();
                }
            }
        }
}

/**
 * Moves page focus up from the current element.
 * @param {Element} current_focus - The element which is currently focused.
 */
function focusUp(current_focus) {
    if(current_focus.classList.value=='grid-cell') {
            if(Number(current_focus.dataset.y)>0){
                document.querySelector(`#cell-${Number(current_focus.dataset.x)}-${Number(current_focus.dataset.y)-1}`).focus();
            } else {
                document.querySelector(`#cell-${Number(current_focus.dataset.x)}-15`).focus();
            }
        } else if(current_focus.id=='settings-button') {
            document.querySelector('#cell-15-15').focus();
        } else if(current_focus.id.includes('puzzle-list')) {
            const next_puzzle = document.querySelector(`#puzzle-list-${Number(current_focus.dataset.index)-1}`);
            if(next_puzzle==null) {
                document.querySelector('#color-selector-6').focus();
            } else {
                next_puzzle.focus();
            }
        } else if(current_focus.id.includes('color-selector')) {
            const index = Number(current_focus.dataset.index);
            if(index==0 || index==1 || index==2) {
                document.querySelector('#puzzle-list-5').focus();
            } else {
                const next_selector = document.querySelector(`#color-selector-${index-3}`);
                if(next_selector==null) {
                    document.querySelector('#puzzle-list-5').focus();
                } else {
                    next_selector.focus();
                }
            }
        }
}