$(function () {
    SIZE = 6;
    var currentCell = { row: 1, column: 1 }; // Track the current cell

    function moveCircle(direction) {
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

        // Move the circle to the next cell
        var circle = $("#circle");
        var cell = $("table tr:nth-child(" + nextRow + ") td:nth-child(" + nextColumn + ")");
        cell.append(circle);
    }

    // Attach keydown event listener to the document
    $(document).keydown(function (e) {
        var key_code = e.which || e.keyCode;
        switch (key_code) {
            case 37: // left arrow key
                moveCircle("left");
                break;
            case 38: // up arrow key
                moveCircle("up");
                break;
            case 39: // right arrow key
                moveCircle("right");
                break;
            case 40: // down arrow key
                moveCircle("down");
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
                var circle = $("<div id='circle' class='circle'></div>");
                cell.append(circle);
            }
            row.append(cell);
        }
        board.append(row);
    }

    // Attach under tictactoe if present, otherwise to body.
    $(document.getElementById("maze") || document.body).append(board);
}
