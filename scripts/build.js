import { resetProgress, setTitle, updateProgress, switchColor, buttonClick } from "./logic.js";
import { loadStorage } from "./storage.js";
import { convertCoordsToIndex, getContrastColor } from "./helper.js";

/**
 * A set which contains String representations of RGBA color values.
 * @type {object}
 */
let current_colors = new Set();

/**
 * Creates a 16x16 grid of cells using DOM manipulation.
 * Each cell's dataset contains its coordinates and the color it will show when it is clicked.
 * @param {String} puzzle_id - The id of the puzzle to load.
 * @param {String} puzzle_name - The name of the puzzle to load.
 * @param {function} held_callback - The callback function for the cells' pointer enter events.
 */
export function createGrid(puzzle_id, puzzle_name, held_callback) {
    resetProgress();
    setTitle(`${puzzle_name} - 0%`);
    const grid = document.querySelector("#puzzle-grid");
    grid.innerHTML = "";

    let data = getImageData(puzzle_id);

    //using a set for colors, we can attempt to add every color in the data and it will automatically remove duplicates
    current_colors.clear();
    let current_storage = loadStorage(puzzle_id);
    let x = 0;
    let y = 0;
    for(let i = 0; i<data.length;i+=4) {
        const cell = document.createElement("button");
        cell.className = "grid-cell";
        cell.id = `cell-${x}-${y}`;
        cell.dataset.x = x;
        cell.dataset.y = y;

        let r = data[i];
        let g = data[i+1];
        let b = data[i+2];
        let a = data[i+3]/255.0;
        let color = `rgba(${r},${g},${b},${a})`;
        current_colors.add(color);
        cell.dataset.c = color;
        
        grid.appendChild(cell);
        
        if(current_storage[convertCoordsToIndex(x,y)] == '0') { //cell has not been clicked in storage
            cell.addEventListener('pointerdown', ()=> {
                buttonClick(cell,puzzle_id,puzzle_name);
            });

            cell.addEventListener('pointerenter', () => held_callback(cell,puzzle_id,puzzle_name));  
            cell.addEventListener('keydown', (e)=>{
                if(e.key=="Enter"||e.key==" ") {
                    buttonClick(cell,puzzle_id,puzzle_name);
                }
            });
        } else { //cell has been clicked in storage
            cell.style.backgroundColor = color;
            cell.style.color = color;
            cell.textContent = '0';
            updateProgress(puzzle_name);
            cell.style.cursor = "default";
        }

       
        
        x++;
        if(x>15) {
            x=0;
            y++;
        }
    }

    createColorList(current_storage);
}

/**
 * Assigns a value to each color from the set of colors found in the image data.
 * Then, creates a button for each color, with the assigned number as its text content.
 * @param {String} current_storage - The set of data representing which cells have already been clicked in this puzzle.
 */
function createColorList(current_storage) {
    let color_numbers = [...current_colors];
    for(let y=0;y<16;y++) {
        for(let x=0;x<16;x++) {
            const cell = document.querySelector(`#cell-${x}-${y}`);
            if(current_storage[convertCoordsToIndex(x,y)] == '0') { //set cell's text content only if that cell hasn't been clicked
                cell.textContent = (color_numbers.indexOf(cell.dataset.c)+1);
            }
        }
    }

    const container = document.querySelector("#color-selector");
    container.innerHTML = ""; //clear the previous buttons
    for(let i = 0; i<color_numbers.length; i++) {
        const btn = document.createElement('button');
        btn.textContent = (i+1);
        btn.dataset.c = color_numbers[i];
        
        btn.style.backgroundColor = btn.dataset.c;
        btn.style.color = getContrastColor(color_numbers[i]);
        btn.id = `color-selector-${i}`;
        btn.dataset.index = i;
        btn.addEventListener("click", () => {
            switchColor(btn);
        });
        container.appendChild(btn);

    }
}



/**
 * Creates a list of buttons which can be clicked to switch between puzzles.
 * @param {object} puzzles - List of all puzzles.
 * @param {function} btn_callback - The callback function to be added to each button.
 */
export function createPuzzleList(puzzles, btn_callback) {
    const container = document.querySelector("#puzzle-list");
    container.innerHTML = ""; //clear the previous list

    for(let i=0;i<puzzles.length;i++) {
        const p = puzzles[i];
        const btn = document.createElement("button");
        btn.textContent = p.name;
        btn.id = `puzzle-list-${i}`;
        btn.dataset.index = i;
        btn.addEventListener("click", () => btn_callback(i));
        container.appendChild(btn);
    }
}


/**
 * Grabs image data from the hidden img and canvas elements.
 * @param {String} image_id - The id of the image to be read.
 * @returns The image data, an array of integers representing RGBA values.
 */
function getImageData(image_id) {
    const canvas = document.querySelector("#hidden-canvas");
    const ctx = canvas.getContext("2d",{willReadFrequently: true});
    const image = document.querySelector(`#${image_id}`);
    ctx.drawImage(image, 0, 0);
    const data = ctx.getImageData(0,0,16,16).data;
    return data;
}