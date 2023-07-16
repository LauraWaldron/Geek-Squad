
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
        this.drawGrid(); // Call the drawGrid method
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
            if (i === 1 && j === 1) {
                const Character = $('<div id="Character" class="Character"></div>');
                cell.append(Character);
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

  