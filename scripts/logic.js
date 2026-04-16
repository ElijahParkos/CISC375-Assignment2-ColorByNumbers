import { loadStorage, setStorage, setPalette } from "./storage.js";
import { convertCoordsToIndex, modifyString } from "./helper.js";

/**
 * The color which is currently selected by the user.
 * @type {String}
 */
let selected_color = '';

/**
 * The progress towards puzzle completion.
 * 1 is added to this value each time a cell is filled in.
 * A puzzle is considered complete when the value becomes 256.
 * @type {int}
 */
let progress = 0;

/**
 * The callback function for grid buttons.
 * Checks if the correct color is selected and updates the button's style accordingly.
 * @param {Element} button - The button that was pressed.
 * @param {String} puzzle_id - The id of the current puzzle.
 * @param {String} puzzle_name - The name of the current puzzle.
 */
export function buttonClick(button, puzzle_id, puzzle_name) {
    let current_data = loadStorage(puzzle_id);
    const storage_index = convertCoordsToIndex(Number(button.dataset.x), Number(button.dataset.y));
    if(current_data[storage_index]=='0' && button.dataset.c == selected_color) {
        button.style.backgroundColor = button.dataset.c;
        button.style.color = button.dataset.c;
        current_data = modifyString(current_data,storage_index,"1");
        setStorage(puzzle_id,current_data);
        updateProgress(puzzle_name)
        button.style.cursor = "default";
    }

}

/**
 * The callback function for color selector buttons.
 * Sets the selected color according to which button was pressed.
 * @param {Element} button - The button that was pressed.
 */
export function switchColor(button) {
   const color_selectors = document.querySelectorAll("#color-selector button")
    for(let c of color_selectors) {
        if(c.classList.contains("selected")) {
            c.classList.remove("selected")
        }
    }
    button.classList.add("selected");
    selected_color = button.dataset.c;
}

/**
 * Switches the page's color palette.
 * @param {int} index - The value of the color palette.
 */
export function changePalette(index) {
    setPalette(index);
    const s = document.documentElement.style;
    if(index==0) {
        s.setProperty('--font-color','#ffffff');
        s.setProperty('--main-bg-color','#363d66');
        s.setProperty('--second-bg-color','#040c40');
        s.setProperty('--border-color','#1d2453');
    } else if(index==1) {
        s.setProperty('--font-color','#000000');
        s.setProperty('--main-bg-color','#ffffff');
        s.setProperty('--second-bg-color','#c8c8c8');
        s.setProperty('--border-color','#969696');
    } else {
        s.setProperty('--font-color','#ffffff');
        s.setProperty('--main-bg-color','#2b2b2b');
        s.setProperty('--second-bg-color','#181C14');
        s.setProperty('--border-color','#000000');
    }
}


/**
 * Adds event listeners for the settings window.
 * @param {function} resetCallback - The callback function for the reset button.
 */
export function initializeSettings(resetCallback) {
    const dialog = document.querySelector('dialog');
    const dialogBtn = document.querySelector('#close');
    dialogBtn.addEventListener('click',()=>{
        dialog.close();
    });

    const settings = document.querySelector('#settings-button');
    document.querySelector('#settings-image').draggable = false;
    document.querySelector('#close-image').draggable = false;
    settings.addEventListener('click',()=>{
        dialog.showModal();
    });

    const reset = document.querySelector('#reset-button');
    reset.addEventListener('click', resetCallback);

    const default_palette = document.querySelector('#default-palette');
    const light_palette = document.querySelector('#light-palette');
    const dark_palette = document.querySelector('#dark-palette');

    default_palette.addEventListener('click',()=>{
        changePalette(0);
    });

    light_palette.addEventListener('click',()=> {
        changePalette(1);
    });

    dark_palette.addEventListener('click',()=>{
        changePalette(2);
    });
    
}

/**
 * Updates the title element.
 * @param {String} name The new title to be set.
 */
export function setTitle(name) {
    const title = document.querySelector("#title");
    title.textContent = name;
}

/**
 * Sets the progress variable to 0.
 */
export function resetProgress() {
    progress = 0;
}

/**
 * Increments the puzzle progress, updates the completion percentage, and removes the cell borders when the puzzle is complete.
 * @param {String} puzzle_name - The name of the puzzle that is being updated.
 */
export function updateProgress(puzzle_name) {
    progress++;
    let percent = Math.round((progress/256)*100);
    if(progress<256 && percent==100) {
        percent = 99;
    }
    setTitle(`${puzzle_name} - ${percent}%`);
    if(progress>= 256) {
        const cells = document.querySelectorAll('.grid-cell');
        for(let i=0;i<cells.length;i++) {
            cells[i].style.borderColor = 'transparent';
        }
        
    }
}

/**
 * Grabs the color which is currently selected.
 * @returns The color that is currently selected.
 */
export function getColor() {
    return selected_color;
}

/**
 * Sets the currently selected color.
 * @param {String} color The color to be set.
 */
export function setColor(color) {
    selected_color = color;
}