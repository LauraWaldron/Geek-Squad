
class Player {
    constructor() {
        this.currentCell = { row: 1, column: 1 };     // starting position of the character
        this.eventListeners();
    }

    // Moves character based on key event and ensures the character does not move outside of grid boundaries
    moveCharacter(direction) {
        let { row, column } = this.currentCell;

        // Calculate the potential next cell the character wants to move into
        let nextRow = row;
        let nextColumn = column;
        if (direction === 'up') {
            nextRow = row - 1;
        } else if (direction === 'down') {
            nextRow = row + 1;
        } else if (direction === 'left') {
            nextColumn = column - 1;
        } else if (direction === 'right') {
            nextColumn = column + 1;
        }

        // Check if the potential next cell is within the grid and not a wall
        if (
            nextRow >= 1 && nextRow <= this.SIZE &&
            nextColumn >= 1 && nextColumn <= this.SIZE &&
            !this.walls[nextRow - 1][nextColumn - 1] // Check if the cell is not a wall
        ) {
            // Move the character
            row = nextRow;
            column = nextColumn;
        }

        // Update the current cell the character is positioned in
        this.currentCell = { row, column };
        const Character = $('#Character');
        const cell = $(`table tr:nth-child(${row}) td:nth-child(${column})`);
        cell.append(Character);

        // Check if the character has reached the food image
        if (row === this.SIZE && column === this.SIZE) {
            // Determine the results page based on the current page
            let resultsPage;
            const currentPage = window.location.href;
            if (currentPage.endsWith('game1.html')) {
                resultsPage = 'between-levels1.html';
            }else if (currentPage.endsWith('game2.html')) {
                resultsPage = 'between-levels2.html';
            }else if (currentPage.endsWith('game3.html')) {
                resultsPage = 'Finalresults.html';
            }
            // Forward to the appropriate results page
            window.location.href = resultsPage;
            
      }
    }

    // Listens to key strokes to determine movement
    eventListeners() {
        $(document).keydown((e) => {
            const key_code = e.which;
            switch (key_code) {
                case 37: // left arrow key
                    this.moveCharacter('left');
                    break;
                case 38: // up arrow key
                    this.moveCharacter('up');
                    break;
                case 39: // right arrow key
                    this.moveCharacter('right');
                    break;
                case 40: // down arrow key
                    this.moveCharacter('down');
                    break;
          }
        });
      }
}


class Maze extends Player{
    constructor() {
        super(); // Call the superclass constructor before accessing properties/methods
        this.SIZE = this.levelDifficulty();
        this.walls = this.createWalls(this.SIZE);
        this.drawGrid();
        }
    
    // Determines the size of the grid based on the game level
    levelDifficulty() {
        const element = document.getElementById('game-level');      //checks document id and attribute value
        const gameLevel = element.getAttribute('data-level');       
        if (gameLevel === 'level1') {
            return 6; // creates a 6x6 grid
        } else if (gameLevel === 'level2') {
            return 9; // creates a 9x9 grid
        } else {
            return 12; // creates a 12x12 grid
        }
    }

    createWalls(gridSize) {
        const grid = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(false));
    
        const wallPositions = {
            // Walls/barriers for level 1
            6: [[1, 3], [1, 4], [2, 4], [2, 2], [4, 4], 
            [4, 5], [5, 1], [3, 0], [1, 1], [1, 2], [3, 2]],

            // Walls/barriers for level 2
            9: [[1, 1], [2, 1], [3, 2], [4, 2], [5, 2], [4, 0], 
            [6, 1], [6, 2], [6, 3], [6, 4], [7, 1], [8, 7], [7, 7], 
            [1, 3], [1, 4], [2, 4], [3, 4], [4, 4], [4, 5], [0, 6], 
            [1, 6], [0, 7], [0, 8], [3, 7], [3, 8], [5, 7], [7, 5]],

            // Walls/barriers for level 3
            12: [[1, 1], [1, 2], [1, 3], [1, 5], [1, 6], [0, 6], 
            [1, 10], [1, 11], [2, 1], [3, 1], [3, 4], [3, 6], [3, 8], 
            [3, 9], [3, 10], [3, 0], [4, 2], [3, 3], [4, 6], [4, 8], 
            [5, 4], [5, 8], [6, 1], [6, 2], [6, 4], [6, 6], [6, 8], 
            [6, 9], [6, 11], [7, 4], [7, 8], [8, 1], [8, 2], [8, 4], 
            [8, 6], [8, 8], [9, 1], [9, 4], [9, 6], [9, 8], [9, 7], 
            [10, 1], [11, 1], [10, 2], [11, 3], [11, 7], [11, 8], [11, 9], 
            [11, 10]],
        };
    
        // Set walls based on grid size
        const walls = wallPositions[gridSize] || [];
        walls.forEach(([row, col]) => {
            grid[row][col] = true;
        });
    
        return grid;
    }
    
    
    // draws the maze/board
    drawGrid() {
        const board = $('<table border=1 cellspacing=0>');
        for (let i = 1; i <= this.SIZE; i += 1) {
            const row = $('<tr>');
            for (let j = 1; j <= this.SIZE; j += 1) {
                const cell = $('<td height=50 width=50 align=center valign=center></td>');
                if (i === this.SIZE && j === this.SIZE) {
                const image = $('<img src="img/transFood.png" height=95%>');
                cell.addClass('last-cell');

                cell.append(image);
                }
                if (i === 1 && j === 1) {
                    const selectedCharacter = localStorage.getItem('selectedCharacter');
                    let characterImage = "";
                    if(selectedCharacter === "panda") {
                        characterImage = 'img/pandatrans.png';
                    } else if(selectedCharacter === "sloth") {
                        characterImage = 'img/slothtrans.png';
                    } else if(selectedCharacter === "tiger") {
                        characterImage = 'img/tigertrans.png';
                    }
                    const character = $(`<div id="Character" class="Character" style="background-image: url('${characterImage}'); background-size: cover;"></div>`);
                    cell.append(character);
                }
                if (this.walls[i - 1][j - 1]) {
                    cell.addClass('wall');
                }
    
                row.append(cell);
            }
            board.append(row);
        }
        
            const mazeContainer = document.body;
            $(mazeContainer).append(board);
        }
    }
    

$(function() {
    new Maze()
});

function saveCharacter() {
    if (selectedImageId) {
        // Save the selected character to localStorage
        localStorage.setItem('selectedCharacter', selectedImageId);
    }

}

var selectedImageId = null;

function selectImage(imageId) {
    if (selectedImageId) {
        // Remove the "selected" class from the previously selected image
        $("#" + selectedImageId).removeClass("selected");
    }
    // Add the "selected" class to the clicked image
    $("#" + imageId).addClass("selected");
  
    selectedImageId = imageId;
}
