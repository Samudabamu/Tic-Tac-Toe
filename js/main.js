

// let boardArray = [][];    Why do I need a 2D array
// boardArray = new int[3][3];

let cells = [ ];  //total cells = column x column



$(document).ready(function() {



  let welcome = function (){}  // welcome screen


  let generateBoard = function(num) {
      for( let i = 0; i < num; i++){
        let $tr = $(`<tr id="tr${[i]}">`); //generate html
        cells.push([]);     // array construction here
        $('table').append($tr);


          for( let y = 0; y < num; y++ ){
            let $td = $(`<td id="td${[y]}">`);
            $(`tr#tr${i}`).append($td);
            cells[i].push(y);

        }
    }
  }
  generateBoard(3);  //Number# of columns




  });
