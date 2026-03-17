function setTitle(name) {
    const title = document.querySelector("#title");
    console.log(name);
    title.textContent = name;
}

//to access a puzzle, you can do puzzles[1].name or puzzles[1].link
const puzzles = [
    {name: "Test 1", link: "images/ExampleArt1.png"},
    {name: "Test 2", link: "images/ExampleArt1.png"},
    {name: "Test 3", link: "images/ExampleArt1.png"}
];
let loaded_puzzle = 0;


function createGrid() {
    const grid = document.querySelector("#puzzle-grid");
    grid.innerHTML = "";

    for(let y=0;y<16;y++) {
        for(let x=0;x<16;x++) {
            const cell = document.createElement("div");
            cell.className = "grid-cell";

            cell.dataset.x = x;
            cell.dataset.y = y;

            grid.appendChild(cell);
        }
    }
}

function changePage(puzzle_number) {
    loaded_puzzle = puzzle_number;
    setTitle(puzzles[loaded_puzzle].name);
    createGrid();
}

function createSidebar() {
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

changePage(loaded_puzzle);
createSidebar();

const canvas = document.querySelector("#hidden-canvas");
const ctx = canvas.getContext("2d");
const image = document.querySelector("#hidden-image");

//draw image to the canvas
ctx.drawImage(image, 0, 0);
//get the image data as an array
const imageData = ctx.getImageData(0,0,16,16).data;

console.log(imageData);