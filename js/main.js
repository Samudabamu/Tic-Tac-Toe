
$(document).ready(function() {



  let welcome = function (){}  // welcome screen






  let generateBoard = function(num) {
      for( let i = 0; i < num; i++){
        let $tr = $(`<tr id="${[i]}">`);
        $('table').append($tr);
          for( let y = 0; y < num; y++ ){
            let $th = $('<th>');
            $(`tr#${i}`).append($th);

        }
    }
  }


  generateBoard(4);



  $(".cell").click(function(){
      $('#c1').prepend($('#nought'))
  });










});
