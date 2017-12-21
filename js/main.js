

let cells = [ ];  //total cells = column x column

let player1Turn = true;




$(document).ready(function() {


  let welcome = function (){}  // welcome screen


  let generateBoard = function(num) {
      for( let i = 0; i < num; i++){
        let $tr = $(`<tr id="tr${[i]}">`); //generate html
        cells.push([]);     // array construction here
        $('table').append($tr);


          for( let y = 0; y < num; y++ ){
            let $td = $(`<td id="td${[i]}${[y]}" data-row=${i} data-column=${y}>`);
            $(`tr#tr${i}`).append($td);
            cells[i].push(y);
      }
    }
  }
  generateBoard(3);  //#No. of columns


  $("td").on( "click", function() { //switches between player 1 & 2
    let $col = $(this).data('column');
    let $row = $(this).data('row');


    if($(this).text() !== "") {
      return
    }
    if (player1Turn === true) {
      $(this).text("x");
       cells[$row][$col]='x'
       console.log($row, $col);
       winChecker();

    } else {
      $(this).text("o")
      cells[$row][$col]='o'
      console.log($row, $col)
      winChecker();
    }
    player1Turn = !player1Turn;

  });

  const winChecker = function(){
    if (
    ( cells[0][0] === cells[0][1] && (cells[0][1] === cells[0][2]))
    // ((cells[1][0] === cells[1][1]) && cells[1][2])) ||
    // ((cells[2][0] === cells[2][1]) && cells[2][2])) ||
    // ((cells[0][0] === cells[0][1] && cells[0][2])) ||
    // ((cells[1][0] === cells[1][1] && cells[1][2])) ||
    // ((cells[2][0] === cells[2][1] && cells[2][2])) ||
    // ((cells[0][0] === cells[1][1] && cells[2][2])) ||
    // ((cells[2][0] === cells[1][1] && cells[0][2])) ||
    ){

    console.log('somebody wins');
  }
}

});
