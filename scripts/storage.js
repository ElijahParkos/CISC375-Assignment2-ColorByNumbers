/**
 * Grabs saved puzzle data from local storage.
 * @param {String} puzzle_id - The id of the puzzle to be loaded.
 * @returns Puzzle data, represented as a string of 256 0s and 1s.
 */
export function loadStorage(puzzle_id) {
    let current_data = localStorage.getItem(`colorByNumbers_${puzzle_id}`);
    if (current_data==null) {
        current_data = createStorage(puzzle_id);
    }
    return current_data;
}

/**
 * Saves puzzle data to local storage.
 * @param {String} puzzle_id - The id of the puzzle to be saved.
 * @param {String} item - The data to be saved.
 */
export function setStorage(puzzle_id,item) {
    localStorage.setItem(`colorByNumbers_${puzzle_id}`,item);
}


/**
 * Creates a new set of puzzle data in local storage.
 * @param {String} puzzle_id - The id of the puzzle to be created.
 * @returns The new puzzle data.
 */
export function createStorage(puzzle_id) {
    let current_data = '0';
    current_data = current_data.repeat(256);
    localStorage.setItem(`colorByNumbers_${puzzle_id}`,current_data);
    return current_data;
}

/**
 * Sets the color palette in local storage.
 * @param {int} item - The value of the selected palette.
 */
export function setPalette(item) {
    localStorage.setItem('colorByNumbers_Palette',item);
}

/**
 * Grabs the value of the saved palette from local storage.
 * @returns The value of the saved palette.
 */
export function getPalette() {
    return Number(localStorage.getItem('colorByNumbers_Palette'));
}

/**
 * Sets the selected puzzle in local storage.
 * @param {int} item - The index of the selected puzzle.
 */
export function setPuzzle(item) {
    localStorage.setItem('colorByNumbers_Puzzle',item);
}

/**
 * Grabs the index of the saved puzzle from local storage
 * @returns The index of the saved puzzle.
 */
export function getPuzzle() {
    return Number(localStorage.getItem('colorByNumbers_Puzzle'));
}