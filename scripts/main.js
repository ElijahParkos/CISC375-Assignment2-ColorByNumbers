import { initializeFocusEvent } from "./focus.js";
import { loadStorage, setStorage, createStorage, getPalette, getPuzzle, setPuzzle, setPalette } from "./storage.js";
import { getContrastColor, convertCoordsToIndex, modifyString } from "./helper.js";
import { buttonClick, switchColor, changePalette, initializeSettings, setTitle, resetProgress, updateProgress, getColor, setColor } from "./logic.js";
import { createGrid, createPuzzleList } from "./build.js";

/**
 * The index of the current puzzle that is loaded.
 * @type {int}
 */
let loaded_puzzle = 0;


/** 
 * Tracks whether the mouse is currently held down.
 * @type {Boolean}
 */
let held_down = false;

/**
 * Contains a list of all the puzzles, including names and ids.
 * @type {Object}
 */
const puzzles = [
    {name: "Canvas", id: "Canvas"},
    {name: "Blossoms", id: "Blossoms"},
    {name: "Sunset", id: "Sunset"},
    {name: "Knight", id: "Knight"},
    {name: "Train", id: "Train"},
    {name: "Island", id: "Island"}
];

/**
* Adds event listeners, calls other initilization functions, and calls build.js to load page data.
*/
function initializePage() {
    //these event listeners monitor whether the mouse is held down or not
    document.addEventListener('pointerdown', ()=>{held_down = true;});
    document.addEventListener('pointerup',()=>{held_down = false;});

    //this event listener will update the page when another instance of the page is modified
    window.addEventListener('storage',(e)=>{
        const changed_puzzle = e.key.split('_')[1];
        if(changed_puzzle==puzzles[loaded_puzzle].id) {
            callGrid();
        }
    });

    //load the saved color palette
    changePalette(getPalette());

    //initialize settings popup and pass in a callback function for the reset button
    initializeSettings(function() {
        createStorage(puzzles[loaded_puzzle].id);
        callGrid();
    });

    //create the event listener for custom keyboard navigation
    initializeFocusEvent();

    //load page data from storage
    //uses window.onload so that the images have time to finish rendering before we try to read them
    window.onload = ()=>{
        changePage(getPuzzle());
        createPuzzleList(puzzles, function(i) {changePage(i);});
    };
}


/**
 * Loads new puzzle data.
 * Called by the sidebar buttons
 * @param {int} puzzle_number - The index of the puzzle to be loaded.
 */
function changePage(puzzle_number) {
    loaded_puzzle = puzzle_number;
    setPuzzle(loaded_puzzle);
    setColor('');
    callGrid();
}


/**
 * Calls createGrid from build.js.
 */
function callGrid() {
    createGrid(puzzles[loaded_puzzle].id,puzzles[loaded_puzzle].name,
        function(cell,puzzle_id,puzzle_name) {
            if(held_down) {
                buttonClick(cell,puzzle_id,puzzle_name);
            }
        }
    );
}


initializePage();