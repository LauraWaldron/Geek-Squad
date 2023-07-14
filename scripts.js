
// Function that will determine the size of the maze based on the game level
$(function () {
        var levelDifficulty = function() {
            var path = window.location.pathname;
          if (path == '/game1.html') {
            return 6;
          } else if ((path) == '/game2.html') {
            return 9;
          } else {
            return 12;
          }
        };


    SIZE = levelDifficulty();
    var currentCell = { row: 1, column: 1 }; // Track the current cell

    function moveCharacter(direction) {
        // Calculate the next cell coordinates based on the direction
        var nextRow = currentCell.row;
        var nextColumn = currentCell.column;

        if (direction === "up" && nextRow > 1) {
            nextRow--;
        } else if (direction === "down" && nextRow < SIZE) {
            nextRow++;
        } else if (direction === "left" && nextColumn > 1) {
            nextColumn--;
        } else if (direction === "right" && nextColumn < SIZE) {
            nextColumn++;
        }

        // Update the current cell
        currentCell.row = nextRow;
        currentCell.column = nextColumn;

        // Move the Character to the next cell
        var Character = $("#Character");
        var cell = $("table tr:nth-child(" + nextRow + ") td:nth-child(" + nextColumn + ")");
        cell.append(Character);
    }

    // Attach keydown event listener to the document
    $(document).keydown(function (e) {
        var key_code = e.which || e.keyCode;
        switch (key_code) {
            case 37: // left arrow key
                moveCharacter("left");
                break;
            case 38: // up arrow key
                moveCharacter("up");
                break;
            case 39: // right arrow key
                moveCharacter("right");
                break;
            case 40: // down arrow key
                moveCharacter("down");
                break;
        }
    });

    draw();
});

function draw() {
    var board = $("<table border=1 cellspacing=0>");
    for (var i = 1; i <= SIZE; i += 1) {
        var row = $("<tr>");
        for (var j = 1; j <= SIZE; j += 1) {
            var cell = $("<td height=50 width=50 align=center valign=center></td>");
            if (i === 1 && j === 1) { // Check if it's the top-left cell
                var Character = $("<div id='Character' class='Character'></div>");
                cell.append(Character);
            }
            row.append(cell);
        }
        board.append(row);
    }

    // Attach under tictactoe if present, otherwise to body.
    $(document.getElementById("maze") || document.body).append(board);
}
  