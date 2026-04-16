# Assignment 3 - Refactoring Code
### Elijah Parkos

## Current Architecture Analysis

Our code for assignment 2 is all contained within a single file (assignment2.js). The file is 444 lines long, and it's responsible for:
- Loading elements on the page through DOM manipulation
- Grabbing and interpreting the puzzle data from the hidden HTML elements
- Handling all page functionality, such as updating cells on click or switching the selected color
- Setting and reading local storage
- Showing the settings window and updating the CSS to show the user's selected color palette
- Adding custom keyboard controls with the arrow keys

### Diagram

<img alt="Assignment 2 dependency diagram" src="https://github.com/user-attachments/assets/cb9e4dd2-2482-4e16-97b9-92b6d7e32aac"/>

## Modular Design Proposal

### Modules

#### main.js

Brings together and manages all the other modules.

- loaded_puzzle
- held_down
- puzzles
- changePage()

#### build.js

Handles all DOM manipulation and data importing/interpretation functions.

- current_colors
- createGrid()
- createPuzzleList()
- createColorList()
- getImageData()

#### logic.js

Handles interactivity logic for puzzles and settings.

- selected_color
- progress
- buttonClick()
- switchColor()
- setTitle()
- updateProgess()
- changePalette()

#### storage.js

Handles all functions related to local storage.

- loadStorage()
- setStorage()
- createStorage()

#### focus.js

Handles the custom keyboard input system.

- keydown eventListener

#### helper.js

Contains extra miscellaneous helper functions.

- getContrastColor()
- convertCoordsToIndex()
- modifyString()

### Refactor Items

#### Rename assignment2.js -> main.js

main.js is a common and professional naming convention for a website's primary JavaScript file. 

#### Rename assignment2.css -> main-style.css

Like the previous item, this tries to follow a more professional naming convention.

#### Move JavaScript files into scripts folder

Now that there are so many JavaScript files, they will all be stored in a folder to keep organization clean.

#### Extract page rendering logic into build.js

Page rendering is currently messy with many function dependencies, logic will need to be extracted to work as a separate module.

#### Extract puzzle and settings logic into logic.js

Puzzle logic is also messy and connected to functions that belong in other modules.

#### Move relavent functions to storage.js, focus.js, and helper.js

The functions in these modules will be largely unchanged, they just need to be moved into separate files.

### Diagram

<img alt="A diagram showing my proposal for the refactored module setup" src="https://github.com/user-attachments/assets/73c2a052-03a6-4e20-97db-64bc8477278c" />

## Refactor Implementation

I ended up following the entire refactor proposal.

### main.js

- Renamed (from assignment2.js)
- Moved most function logic out into the other modules
- Kept certain global values (e.g. loaded_puzzle)
- Left functionality that manages other module files (e.g. changePage())
- Also left initilization code (e.g. window onload event) 

### build.js

- Moved the set of colors and several DOM manipulation functions into this file
- Also moved functionality for loading image data here
- Refactored the functions to work as a part of an external module

### logic.js

- Moved selected_color, progress, and several game logic functions into this file
- Also moved the settings page initilization and color palette handling here
- Refactored the functions to work as a part of an external module
- Added getter and setter for the selected color

### storage.js

- Moved all local storage functions into this file
- Added getters and setters for saved palette and saved puzzle

### focus.js

- Moved the large event handler callback for custom keyboard navigation into this file
- Split the callback into four separate functions for readability
- Added initializeFocusEvent() to be called from main.js

### helper.js

- Moved getContrastColor(), convertCoordsToIndex(), and 
