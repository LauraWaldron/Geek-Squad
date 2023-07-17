
class Player {
    constructor() {
        this.currentCell = { row: 1, column: 1 };     // starting position of the character
        this.eventListeners();
    }

    // Moves character based on key event and ensures the character does not move outside of grid boundaries
    moveCharacter(direction) {
        let { row, column } = this.currentCell;
    
            if (direction === 'up' && row > 1) {
                row--;
            } else if (direction === 'down' && row < this.SIZE) {
                row++;
            } else if (direction === 'left' && column > 1) {
                column--;
            } else if (direction === 'right' && column < this.SIZE) {
                column++;
            }
      
      // updates current cell the character is positioned in
      this.currentCell = { row, column };
      const Character = $('#Character');
      const cell = $(`table tr:nth-child(${row}) td:nth-child(${column})`);
      cell.append(Character);
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
                const character = $('<div id="Character" class="Character"></div>');
                cell.append(character);
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

// Function to display the best score 
function displayBestScore(time, moves) {
    const bestScoreContainer = document.getElementById('best-score-container');
    const timeParagraph = document.createElement('p');
    timeParagraph.textContent = `Best Time: ${time}`;
    bestScoreContainer.appendChild(timeParagraph);

    const movesParagraph = document.createElement('p');
    movesParagraph.textContent = `Least Moves: ${moves}`;
    bestScoreContainer.appendChild(movesParagraph);

}

// Display the best score on page load
displayBestScore(bestTime, leastMoves);
// Function to display the results
function displayResults(time, moves) {
    const bestTimeSpan = document.getElementById('best-time');
    const leastMovesSpan = document.getElementById('least-moves');

    bestTimeSpan.textContent = time;
    leastMovesSpan.textContent = moves;
  }

  // Sample results (replace with actual results)
  const bestTime = '00:45';
  const leastMoves = 20;

  // Display the results on page load
  displayResults(bestTime, leastMoves);
