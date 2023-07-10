
$(function () {
    SIZE = 9
    draw = function () {
        var board = $("<table border=1 cellspacing=0>");
        for (var i = 1; i <= SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 1; j <= SIZE; j += 1) {
                var cell = $("<td height=50 width=50 align=center valign=center></td>");
                row.append(cell);
            }
        }

        // Attach under tictactoe if present, otherwise to body.
        $(document.getElementById("maze") || document.body).append(board);
        startNewGame();
    };

    draw();
});