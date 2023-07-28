
let timeElapsed = [0, 0, 0];
let timer1, timer2, timer3;

class Player {
    constructor() {
        this.currentCell = { row: 1, column: 1 };     // starting position of the character
        this.moveCount = 0; // Initialize the move count to 0
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
            this.incrementMoveCount();
        }

        // Update the current cell the character is positioned in
        this.currentCell = { row, column };
        const Character = $('#Character');
        const cell = $(`table tr:nth-child(${row}) td:nth-child(${column})`);
        cell.append(Character);

        // Check if the character has reached the food image
        if (row === this.SIZE && column === this.SIZE) {
            // Determine the results page based on the current page
            $('.drum-stick').hide();
            let resultsPage;
            const currentPage = window.location.href;
            if (currentPage.endsWith('game1.html')) {
                resultsPage = 'between-levels1.html';
                timer1.stopTimer();
                const level1Time = timer1.totalSeconds;
                localStorage.setItem('level1Time', level1Time);
                localStorage.setItem('moveCount1', this.moveCount)
            } else if (currentPage.endsWith('game2.html')) {
                resultsPage = 'between-levels2.html';
                timer2.stopTimer();
                const level2Time = timer2.totalSeconds; 
                localStorage.setItem('level2Time', level2Time); 
                localStorage.setItem('moveCount2', this.moveCount)
            } else if (currentPage.endsWith('game3.html')) {
                resultsPage = 'Finalresults.html';
                timer3.stopTimer();
                const level3Time = timer3.totalSeconds; 
                localStorage.setItem('level3Time', level3Time); 
                localStorage.setItem('moveCount3', this.moveCount)
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

      incrementMoveCount() {
        this.moveCount++;
        $('#moveCount').text(`Moves: ${this.moveCount}`);
    }

}

class Timer {
    constructor(minutesLabelId, secondsLabelId) {
        this.minutesLabel = document.getElementById(minutesLabelId);
        this.secondsLabel = document.getElementById(secondsLabelId);
        this.totalSeconds = 0;
        this.interval = null; // Store the interval ID for clearing later
        this.startTimer(); // Automatically start the timer
    }
  
    startTimer() {
        this.interval = setInterval(this.setTime.bind(this), 1000);
    }
  
    setTime() {
        ++this.totalSeconds;
        this.secondsLabel.innerHTML = this.pad(this.totalSeconds % 60);
        this.minutesLabel.innerHTML = this.pad(parseInt(this.totalSeconds / 60));
    }
  
    stopTimer() {
        clearInterval(this.interval);
    }
  
    pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
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
            return 11; // creates a 6x6 grid
        } else if (gameLevel === 'level2') {
            return 21; // creates a 9x9 grid
        } else {
            return 31; // creates a 12x12 grid
        }
    }

    createWalls(gridSize) {
        const grid = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(false));
    
        const wallPositions = {
            // Walls/barriers for level 1
            11: [[2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [10, 1], [10, 2], [8, 2], [7, 2], [6, 2], [6, 1], [5, 2], 
            [4, 2], [8, 3], [8, 4], [7, 4], [6, 4], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [9, 8], [8, 8], [8, 7], 
            [8, 6], [7, 6], [6, 6], [4, 4], [3, 4], [2, 4], [2, 3], [2, 2], [2, 5], [2, 6], [4, 6], [4, 7], [2, 7], [2, 8], [3, 8], [4, 8], [5, 8], 
            [6, 8], [6, 9], [6, 10], [7, 10], [8, 10], [5, 10], [4, 10], [3, 10], [2, 10], [1, 10], [0, 10], [0, 9], [0, 8], [0, 7], [0, 6], [0, 5], 
            [0, 4], [0, 3], [0, 2], [0, 1]],

            // Walls/barriers for level 2
            21: [[2, 0], [3, 0], [4, 0], [4, 1], [4, 2], [3, 2], [2, 2], [5, 2], [6, 2], [4, 4], [4, 5], [2, 4], [1, 4], [2, 6], [3, 6], [4, 6], 
            [2, 7], [2, 8], [3, 8], [4, 8], [4, 9], [4, 10], [5, 10], [5, 8], [6, 8], [6, 10], [6, 11], [6, 12], [4, 12], [3, 12], [2, 12], [2, 11], [2, 10], 
            [2, 13], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [6, 13], [4, 15], [4, 16], [3, 16], [2, 16], [1, 16], [0, 16], [0, 15], [0, 14], [0, 13], 
            [0, 12], [0, 11], [0, 10], [0, 9], [0, 8], [0, 7], [0, 6], [0, 5], [0, 4], [0, 3], [0, 2], [0, 1], [4, 17], [4, 18], [3, 18], [2, 18], [0, 17], 
            [0, 18], [0, 19], [0, 20], [1, 20], [2, 20], [3, 20], [4, 20], [5, 20], [6, 20], [7, 20], [8, 20], [9, 20], [10, 20], [11, 20], [6, 18], [6, 16], 
            [5, 16], [7, 16], [8, 16], [7, 18], [8, 18], [9, 18], [10, 18], [10, 19], [10, 17], [10, 16], [11, 16], [12, 16], [12, 15], [12, 14], [11, 14], 
            [10, 14], [9, 14], [8, 14], [8, 12], [8, 11], [8, 10], [9, 10], [10, 10], [10, 11], [10, 12], [10, 13], [13, 14], [14, 14], [14, 16], [14, 17], 
            [14, 18], [13, 18], [12, 18], [11, 18], [16, 18], [12, 20], [13, 20], [14, 20], [15, 20], [16, 20], [17, 20], [17, 18], [18, 18], [18, 19], [18, 20], 
            [18, 17], [18, 16], [16, 16], [16, 17], [16, 15], [16, 14], [16, 13], [16, 12], [14, 12], [17, 12], [18, 12], [18, 14], [19, 14], [20, 19], 
            [20, 18], [20, 17], [20, 16], [20, 15], [20, 14], [20, 13], [20, 12], [20, 11], [20, 10], [20, 9], [20, 8], [20, 7], [20, 6], [20, 5], [20, 4], [20, 3], 
            [20, 2], [20, 1], [20, 0], [19, 0], [18, 0], [17, 0], [16, 0], [16, 1], [16, 2], [17, 2], [18, 2], [18, 3], [18, 4], [17, 4], [16, 4], [19, 6], [18, 6], 
            [16, 6], [15, 6], [14, 6], [13, 6], [12, 6], [14, 2], [14, 3], [14, 4], [13, 4], [12, 4], [12, 2], [11, 2], [10, 2], [9, 2], [8, 2], [8, 1], [8, 0], 
            [15, 0], [14, 0], [13, 0], [12, 0], [11, 0], [10, 0], [9, 0], [7, 0], [6, 0], [5, 0], [11, 4], [10, 4], [10, 5], [10, 6], [9, 6], [8, 6], [8, 7], [8, 8], 
            [7, 8], [9, 8], [10, 8], [11, 8], [12, 8], [12, 7], [12, 9], [12, 10], [12, 11], [12, 12], [14, 11], [14, 10], [13, 10], [14, 9], [14, 8], [15, 8], 
            [16, 8], [17, 8], [18, 8], [18, 9], [18, 10], [16, 9], [16, 10], [6, 4], [6, 5], [6, 6], [5, 6], [7, 4], [8, 4]],

            // Walls/barriers for level 3
            31: [[30, 0], [29, 0], [28, 0], [27, 0], [26, 0], [25, 0], [24, 0], [23, 0], [22, 0], [21, 0], [20, 0], [19, 0], [18, 0], [17, 0], [16, 0], 
            [15, 0], [14, 0], [13, 0], [12, 0], [11, 0], [10, 0], [9, 0], [8, 0], [7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [0, 1], [0, 2], 
            [0, 3], [0, 4], [0, 5], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [0, 6], [3, 6], [4, 6], [5, 6], [6, 6], [6, 7], [6, 8], [5, 8], [4, 8], 
            [3, 8], [2, 8], [2, 9], [2, 10], [3, 10], [4, 10], [4, 11], [4, 12], [3, 12], [2, 12], [2, 14], [1, 14], [2, 16], [3, 16], [4, 16], [4, 15], [4, 14], 
            [4, 17], [4, 18], [4, 19], [4, 20], [3, 20], [2, 20], [2, 19], [2, 18], [1, 18], [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13], [0, 14], 
            [0, 15], [0, 16], [0, 17], [0, 18], [0, 19], [0, 20], [0, 21], [0, 22], [0, 23], [0, 24], [0, 25], [0, 26], [0, 27], [0, 28], [0, 29], [0, 30], [1, 30], 
            [2, 30], [3, 30], [30, 1], [30, 2], [30, 3], [30, 4], [30, 5], [30, 6], [30, 7], [30, 8], [30, 9], [30, 10], [30, 11], [30, 12], [30, 13], [30, 14], 
            [30, 15], [30, 16], [30, 17], [30, 18], [30, 19], [30, 20], [30, 21], [30, 22], [30, 23], [30, 24], [30, 25], [30, 26], [30, 27], [30, 28], [30, 29],
            [28, 30], [27, 30], [26, 30], [25, 30], [24, 30], [23, 30], [22, 30], [21, 30], [20, 30], [19, 30], [18, 30], [17, 30], [16, 30], [15, 30],
              [14, 30], [13, 30], [12, 30], [11, 30], [10, 30], [9, 30], [8, 30], [7, 30], [6, 30], [5, 30], [4, 30], [2, 21], [2, 22], [2, 23], [2, 24], [2, 26],
               [1, 26], [2, 27], [2, 28], [3, 28], [4, 28], [4, 26], [4, 25], [4, 24], [5, 26], [4, 22], [5, 22], [6, 22], [6, 23], [6, 24], [6, 25], [6, 26],
                [6, 27], [6, 28], [7, 24], [8, 24], [8, 26], [8, 27], [8, 28], [8, 29], [9, 26], [10, 26], [10, 27], [10, 28], [11, 28], [12, 28], [8, 22],
                 [8, 21], [8, 20], [7, 20], [6, 20], [8, 19], [8, 18], [7, 18], [6, 18], [5, 18], [5, 10], [6, 10], [7, 10], [8, 10], [8, 11], [8, 12],
                  [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [14, 13], [14, 14], [12, 14], [12, 15], [12, 16], [13, 16], [14, 16], [14, 17], 
                  [14, 18], [13, 18], [12, 18], [11, 18], [10, 18], [10, 20], [10, 21], [10, 22], [11, 22], [12, 22], [12, 21], [12, 20], [12, 23], [12, 24], 
                  [11, 24], [10, 24], [9, 24], [12, 25], [12, 26], [13, 26], [14, 26], [14, 27], [14, 28], [14, 29], [15, 28], [16, 28], [18, 28], [17, 28], 
                  [18, 27], [18, 26], [15, 26], [16, 26], [16, 25], [16, 24], [15, 24], [14, 24], [14, 23], [14, 22], [15, 22], [16, 22], [14, 21], [14, 20], 
                  [16, 20], [16, 19], [16, 18], [17, 18], [18, 18], [17, 20], [18, 20], [18, 21], [18, 22], [18, 23], [18, 24], [17, 24], [15, 16], [16, 16], 
                  [17, 16], [18, 16], [19, 16], [20, 16], [20, 17], [20, 18], [20, 19], [20, 20], [19, 20], [20, 21], [20, 22], [20, 24], [20, 26], [20, 27], 
                  [20, 28], [20, 29], [21, 26], [22, 26], [21, 24], [22, 24], [23, 24], [24, 24], [24, 25], [24, 26], [22, 28], [23, 28], [24, 28], [25, 28], 
                  [26, 28], [27, 28], [28, 28], [28, 27], [28, 26], [27, 26], [26, 26], [26, 25], [26, 24], [26, 23], [26, 22], [28, 25], [28, 24], [29, 24], 
                  [27, 22], [28, 22], [28, 21], [28, 20], [27, 20], [26, 20], [26, 19], [26, 18], [25, 18], [24, 18], [24, 19], [24, 20], [23, 20], [22, 20], 
                  [22, 19], [22, 18], [22, 21], [22, 22], [23, 22], [24, 22], [24, 23], [26, 17], [26, 16], [25, 16], [23, 16], [24, 16], [22, 16], [22, 15], 
                  [22, 14], [21, 14], [20, 14], [20, 13], [20, 12], [19, 14], [18, 14], [29, 2], [28, 2], [27, 2], [26, 2], [26, 4], [27, 4], [28, 4], [28, 5], 
                  [28, 6], [28, 7], [28, 8], [29, 8], [26, 8], [26, 7], [26, 6], [25, 6], [24, 6], [24, 5], [24, 4], [24, 3], [24, 2], [24, 1], [22, 1], [22, 2], 
                  [22, 3], [22, 4], [22, 5], [22, 6], [22, 7], [22, 8], [24, 8], [24, 9], [24, 10], [23, 10], [22, 10], [24, 11], [24, 12], [23, 12], [22, 12], 
                  [24, 13], [24, 14], [25, 14], [26, 14], [26, 13], [26, 12], [27, 12], [28, 12], [28, 11], [28, 10], [27, 10], [26, 10], [28, 13], [28, 14], 
                  [29, 14], [28, 16], [28, 17], [28, 18], [29, 18], [18, 1], [18, 2], [19, 2], [17, 2], [16, 2], [15, 2], [14, 2], [18, 3], [18, 4], [18, 5], 
                  [18, 6], [20, 2], [20, 3], [20, 4], [20, 5], [20, 6], [20, 7], [20, 8], [20, 9], [20, 10], [16, 15], [16, 14], [16, 13], [16, 12], [16, 11], 
                  [16, 10], [17, 10], [18, 10], [17, 12], [18, 12], [14, 10], [13, 10], [12, 10], [11, 10], [10, 10], [10, 9], [10, 8], [9, 8], [8, 8], [7, 8], 
                  [11, 8], [12, 8], [12, 7], [12, 6], [13, 6], [14, 6], [14, 8], [15, 8], [16, 8], [16, 7], [16, 6], [16, 5], [16, 4], [17, 8], [18, 8], [15, 4], 
                  [14, 4], [13, 4], [12, 4], [12, 3], [12, 2], [11, 2], [10, 2], [10, 1], [10, 3], [10, 4], [10, 6], [9, 6], [8, 6], [8, 5], [8, 4], [7, 6], [9, 2], 
                  [8, 2], [7, 2], [6, 2], [6, 3], [6, 4], [5, 4], [4, 4], [4, 3], [4, 2], [5, 12], [6, 12], [6, 13], [6, 14], [7, 14], [6, 15], [6, 16], [8, 14], 
                  [8, 15], [8, 16], [9, 16], [10, 16], [10, 15], [10, 14]],
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
                const image = $('<img src="img/transFood.png" height=95% class="drum-stick">');
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
                    const image = $(`<img src="img/biggerTree.png" height="100%" width="100%">`);
                    cell.append(image);
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
        timer1 = new Timer("minutes1", "seconds1");
        timer2 = new Timer("minutes2", "seconds2");
        timer3 = new Timer("minutes3", "seconds3");
        const maze = new Maze();
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

  // Helper function to format the time as MM:SS
  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }