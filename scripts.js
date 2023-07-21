
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
    
        // Mark walls/barriers on the grid based on the level and gridSize
        if (gridSize === 6) {
            grid[1][3] = true;
            grid[1][4] = true;
            grid[2][4] = true;
            grid[2][2] = true;
            grid[4][4] = true;
            grid[4][5] = true;
            grid[5][1] = true;
            grid[3][0] = true;
            grid[1][1] = true;
            grid[1][2] = true;
            grid[3][2] = true;
        } else if (gridSize === 9) {
            grid[1][1] = true;
            grid[2][1] = true;
            grid[3][2] = true;
            grid[4][2] = true;
            grid[5][2] = true;
            grid[4][0] = true;
            grid[6][1] = true;
            grid[6][2] = true;
            grid[6][3] = true;
            grid[6][4] = true;
            grid[7][1] = true;
            grid[8][7] = true;
            grid[7][7] = true;
            grid[1][3] = true;
            grid[1][4] = true;
            grid[2][4] = true;
            grid[3][4] = true;
            grid[4][4] = true;
            grid[4][5] = true;
            grid[0][6] = true;
            grid[1][6] = true;
            grid[0][7] = true;
            grid[0][8] = true;
            grid[3][7] = true;
            grid[3][8] = true;
            grid[5][7] = true;
            grid[7][5] = true;
        } else if (gridSize === 12) {
            grid[1][1] = true;
            grid[1][2] = true;
            grid[1][3] = true;
            grid[1][5] = true;
            grid[1][6] = true;
            grid[0][6] = true;
            grid[1][10] = true;
            grid[1][11] = true;
            grid[2][1] = true;
            grid[3][1] = true;
            grid[3][4] = true;
            grid[3][6] = true;
            grid[3][8] = true;
            grid[3][9] = true;
            grid[3][10] = true;
            grid[3][0] = true;
            grid[4][2] = true;
            grid[3][3] = true;
            grid[4][6] = true;
            grid[4][8] = true;
            grid[5][4] = true;
            grid[5][8] = true;
            grid[6][1] = true;
            grid[6][2] = true;
            grid[6][4] = true;
            grid[6][6] = true;
            grid[6][8] = true;
            grid[6][9] = true;
            grid[6][11] = true;
            grid[7][4] = true;
            grid[7][8] = true;
            grid[8][1] = true;
            grid[8][2] = true;
            grid[8][4] = true;
            grid[8][6] = true;
            grid[8][8] = true;
            grid[9][1] = true;
            grid[9][4] = true;
            grid[9][6] = true;
            grid[9][8] = true;
            grid[9][7] = true;
            grid[10][1] = true;
            grid[11][1] = true;
            grid[10][2] = true;
            grid[11][3] = true;
            grid[11][7] = true;
            grid[11][8] = true;
            grid[11][9] = true;
            grid[11][10] = true;

           
         
        }
    
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
