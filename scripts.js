$(function() {
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
  
    $(function() {
      const GRID_SIZE = levelDifficulty();
  
      const draw = function() {
        const grid = $("<table border='1' cellspacing='0'>");
        for (let i = 1; i <= GRID_SIZE; i += 1) {
          const row = $("<tr>");
          grid.append(row);
          for (let j = 1; j <= GRID_SIZE; j += 1) {
            const cell = $("<td height='50' width='50' align='center' valign='center'></td>");
            row.append(cell);
          }
        }
        $(document.body).append(grid);
      };
  
      draw();
    });
  });
  