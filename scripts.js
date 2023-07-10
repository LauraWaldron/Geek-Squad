/*
 * A complete tic-tac-toe widget, using JQuery.  Just include this
 * script in a browser page and play.  A tic-tac-toe game will be
 * included as a child element of the element with id "tictactoe".
 * If the page has no such element, it will just be added at the end
 * of the body.
 */
$(function () {

    var squares = [],
        SIZE = 9
      
    startNewGame = function () {
        
    },


    set = function () {

        if ($(this).html() !== EMPTY) {
            return;
        }
        if (win(score[turn])) {
            alert(turn + " wins!");
            startNewGame();
        } else if (moves === SIZE * SIZE) {
            alert("Cat\u2019s game!");
            startNewGame();
        } else {
            turn = turn === "X" ? "O" : "X";
        }
    },


    play = function () {
        var board = $("<table border=1 cellspacing=0>"), indicator = 1;
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td height=50 width=50 align=center valign=center></td>");
                row.append(cell);
            }
        }


        // Attach under tictactoe if present, otherwise to body.
        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    };

    play();
});