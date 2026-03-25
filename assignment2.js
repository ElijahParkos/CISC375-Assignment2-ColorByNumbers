let loaded_puzzle = 0; //index of the current puzzle we have loaded
let current_colors = new Set(); //set of rgba color strings in the loaded image
let selected_color = 'rgba(0,0,0,1)';

//find whether the mouse is currently held down
//this will be used to drag over multiple cells, rather than having to click one-by-one
let mouse_down = false;
document.addEventListener('mousedown', ()=>{mouse_down = true;console.log("down");});
document.addEventListener('mouseup',()=>{mouse_down=false;console.log("up")});
document.addEventListener('touchstart', ()=>{mouse_down = true;console.log("down");});
document.addEventListener('touchend',()=>{mouse_down=false;console.log("up")});


//change the title to the name given
function setTitle(name) {
    const title = document.querySelector("#title");
    title.textContent = name;
}

//to access a puzzle, you can do puzzles[x].name or puzzles[x].id
const puzzles = [
    {name: "Canvas", id: "Canvas"},
    {name: "Test 2", id: "Test2"},
    {name: "Test 3", id: "Test3"}
];


//go through the pixel data of the current image and create a grid cell for each one
function createGrid() {
    const grid = document.querySelector("#puzzle-grid");
    grid.innerHTML = "";

    let data = getImageData(puzzles[loaded_puzzle].id);
    //using a set for colors, we can attempt to add every color in the data and it will automatically remove duplicates
    current_colors.clear();
    let x = 0;
    let y = 0;
    for(let i = 0; i<data.length;i+=4) {
        const cell = document.createElement("button");
        cell.className = "grid-cell";

        cell.dataset.x = x;
        cell.dataset.y = y;
        cell.id = `cell-${x}-${y}`;

        let r = data[i];
        let g = data[i+1];
        let b = data[i+2];
        let a = data[i+3]/255.0;
        let color = `rgba(${r},${g},${b},${a})`;
        current_colors.add(color);

        cell.dataset.c = color;
        cell.dataset.filled = "false";

        cell.addEventListener('click', ()=> {
            buttonClick(cell);
        });

        grid.appendChild(cell);

        x++;
        if(x>15) {
            x=0;
            y++;
        }
    }

    createColorList();
}

//change to a new loaded puzzle
//connected to the sidebar puzzle buttons
function changePage(puzzle_number) {
    loaded_puzzle = puzzle_number;
    setTitle(puzzles[loaded_puzzle].name);
    createGrid();
}

//create list of buttons in the sidebar for switching puzzles
function createPuzzleList() {
    const container = document.querySelector("#puzzle-list");
    container.innerHTML = ""; //clear the previous list

    for(let i=0;i<puzzles.length;i++) {
        const p = puzzles[i];
        const btn = document.createElement("button");
        btn.textContent = p.name;
        btn.addEventListener("click", () => {changePage(i);});
        container.appendChild(btn);
    }
}


//go through the set of current colors and assign each one a number
//set the text content of each grid cell to the correct number
//finally, create a button for each color
function createColorList() {
    let color_numbers = [...current_colors];
    for(let y=0;y<16;y++) {
        for(let x=0;x<16;x++) {
            const cell = document.querySelector(`#cell-${x}-${y}`);
            cell.textContent = (color_numbers.indexOf(cell.dataset.c)+1);
        }
    }

    const container = document.querySelector("#color-selector");
    container.innerHTML = ""; //clear the previous buttons
    for(let i = 0; i<color_numbers.length; i++) {
        const btn = document.createElement('button');
        btn.textContent = (i+1);
        btn.dataset.c = color_numbers[i];

        
        if(i==0) {
            selected_color = color_numbers[i]; //set default color to whatever the first one is when we load a puzzle
        }
        btn.style.backgroundColor = btn.dataset.c;
        btn.style.color = getContrastColor(color_numbers[i]);
        btn.addEventListener("click", () => {
            switchColor(btn);
        });
        container.appendChild(btn);

    }
}


//draw the given image to the hidden canvas and return the pixel data (rgba colors)
function getImageData(image_id) {
    const canvas = document.querySelector("#hidden-canvas");
    const ctx = canvas.getContext("2d",{willReadFrequently: true});
    const image = document.querySelector(`#${image_id}`);
    ctx.drawImage(image, 0, 0);
    const data = ctx.getImageData(0,0,16,16).data;
    return data;
}

//fills in the clicked cell with the correct color if it is the currently selected color (and it isn't already filled)
function buttonClick(button) {
    if(button.dataset.filled == "false" && button.dataset.c == selected_color) {
        button.style.backgroundColor = button.dataset.c;
        button.textContent = '';
        button.dataset.filled = "true";
    }
}

//switches the currently selected color to the color of the selector button that was just pressed
function switchColor(button) {
    selected_color = button.dataset.c;
}

//takes in a string for an rgba color and returns the best text color to use ontop of that background
//this is used for the color selecting buttons on the sidebar
function getContrastColor(rgbaColor) {
    let parse_string = rgbaColor.substring(5,rgbaColor.length-1);
    parse_string = parse_string.split(",");

    //find the perceived brightness value
    brightness = Math.sqrt((parse_string[0]*parse_string[0]*.241)+(parse_string[1]*parse_string[1]*.691)+(parse_string[2]*parse_string[2]*.068));
    if(brightness>130) {
        return 'rgba(0,0,0,1)';
    } else {
        return 'rgba(255,255,255,1)';
    }
}


changePage(loaded_puzzle);
createPuzzleList();