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

#### build.js

Handles all DOM manipulation and data importing/interpretation functions.

- test 1
- test 2

#### logic.js

Handles interactivity logic for puzzles and settings.

#### storage.js

Handles all functions related to local storage.

#### focus.js

Handles the custom keyboard input system.

#### helper.js

Contains extra miscellaneous helper functions.

### Refactor Items

### Diagram
