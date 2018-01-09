
(function(b,i,t,C,O,I,N) {  // Bitcoin API
  window.addEventListener('load',function() {
    if(b.getElementById(C))return;
    I=b.createElement(i),N=b.getElementsByTagName(i)[0];
    I.src=t;I.id=C;N.parentNode.insertBefore(I, N);
  },false)
})(document,'script','https://widgets.bitcoin.com/widget.js','btcwdgt');


let cells = [];  //total cells = column x column
let player1Turn = true; // current player toggle

$(document).ready(function() {

  const winChecker = function(){  // game win conditions
    if (
    ( cells[0][0] === cells[0][1] && (cells[0][1] === cells[0][2])) ||
    ( cells[1][0] === cells[1][1] && (cells[1][1] === cells[1][2])) ||
    ( cells[2][0] === cells[2][1] && (cells[2][1] === cells[2][2])) ||
    ( cells[0][0] === cells[1][0] && (cells[1][0] === cells[2][0])) ||
    ( cells[0][1] === cells[1][1] && (cells[1][1] === cells[2][1])) ||
    ( cells[0][2] === cells[1][2] && (cells[1][2] === cells[2][2])) ||
    ( cells[0][0] === cells[1][1] && (cells[1][1] === cells[2][2])) ||
    ( cells[2][0] === cells[1][1] && (cells[1][1] === cells[0][2])))
     {
      //Better looking box alerts declaring winner
      if (player1Turn === true) {
        $('.modal__box').children('h2').text('Player one wins!');
        $('.modal').css('display', 'block');
      }
      else {
        $('.modal__box').children('h2').text(`Player two wins!`);
        $('.modal').css('display', 'block');
      }
    }
    else if ($('.td').text().length === 9) {l
      $('.modal__box').children('h2').text(`DRAW (Buy some Bitcoin!)`);
      $('.modal').css('display', 'block');
    }
  }

  let generateBoard = function(num) { //Board construction
    let counter = 0;
    cells = [];
    $('.table').empty();

    for( let i = 0; i < num; i++){
      let $tr = $(`<div id="tr${[i]}" class="tr">`); //HTML generated here
      cells.push([]);     // Array constructed here
      $('.table').append($tr);

      for( let y = 0; y < num; y++ ){
        //nested elements created/element data created ??
        let $td = $(`<div id="td${[i]}${[y]}" class="td" data-row=${i} data-column=${y}>`);
        $(`.tr#tr${i}`).append($td);
        cells[i].push(counter);
        counter += 1;
      }
    }
     // outer floor
    $(".td").on( "click", function() { //Applies "x" or "o" click data to table matrix
      let $col = $(this).data('column');
      let $row = $(this).data('row');

      if($(this).text() !== "") {
        return
      }
      if (player1Turn === true) {
        $(this).text("x");
         cells[$row][$col]='x'
         winChecker();

      } else {
        $(this).text("o")
        cells[$row][$col]='o'
        winChecker();
      }
      player1Turn = !player1Turn;

    });
  };

  generateBoard(3);  //Size of board argument (win condition data not scalable)

  $('.new-game').on('click', function() {
    $('.td').text('');
    $('.modal').css('display', 'none');
    generateBoard(4);

  });

  //Cool background
  var c1 = document.getElementById( 'c1' ),
  	ctx1 = c1.getContext( '2d' ),
  	c2 = document.getElementById( 'c2' ),
  	ctx2 = c2.getContext( '2d' ),
  	twopi = Math.PI * 2,
  	parts = [],
  	sizeBase,
  	cw,
  	opt,
  	hue,
  	count;

  function rand( min, max ) {
  	return Math.random() * ( max - min ) + min;
  }

  function hsla( h, s, l, a ) {
  	return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
  }

  function create() {
  	sizeBase = cw + ch;
  	count = Math.floor( sizeBase * 0.3 ),
  	hue = rand( 0, 360 ),
  	opt = {
  		radiusMin: 0,
  		radiusMax: 0,
  		blurMin: 10,
  		blurMax: sizeBase * 0.04,
  		hueMin: hue,
  		hueMax: hue + 100,
  		saturationMin: 10,
  		saturationMax: 70,
  		lightnessMin: 20,
  		lightnessMax: 50,
  		alphaMin: 0.1,
  		alphaMax: 0.8
  	}
  	ctx1.clearRect( 0, 0, cw, ch );
  	ctx1.globalCompositeOperation = 'lighter';
  	while( count-- ) {
  		var radius = rand( opt.radiusMin, opt.radiusMax ),
  			blur = rand( opt.blurMin, opt.blurMax ),
  			x = rand( 0, cw ),
  			y = rand( 0, ch ),
  			hue = rand(opt.hueMin, opt.hueMax ),
  			saturation = rand( opt.saturationMin, opt.saturationMax ),
  			lightness = rand(  opt.lightnessMin, opt.lightnessMax ),
  			alpha = rand( opt.alphaMin, opt.alphaMax );

  		ctx1.shadowColor = hsla( hue, saturation, lightness, alpha );
  		ctx1.shadowBlur = blur;
  		ctx1.beginPath();
  		ctx1.arc( x, y, radius, 0, twopi );
  		ctx1.closePath();
  		ctx1.fill();
  	}

  	parts.length = 0;
  	for( var i = 0; i < Math.floor( ( cw + ch ) * 0.08 ); i++ ) {
  		parts.push({
  			radius: rand( 6, sizeBase * 0.007 ),
  			x: rand( 0, cw ),
  			y: rand( 0, ch ),
  			angle: rand( 0, twopi ),
  			vel: rand( 0.1, 0.5 ),
  			tick: rand( 0, 10000 )
  		});
  	}
  }

  function init() {
  	resize();
  	create();
  	loop();
  }

  function loop() {
  	requestAnimationFrame( loop );

  	ctx2.clearRect( 0, 0, cw, ch );
  	ctx2.globalCompositeOperation = 'source-over';
  	ctx2.shadowBlur = 0;
  	ctx2.drawImage( c1, 0, 0 );
  	ctx2.globalCompositeOperation = 'lighter';

  	var i = parts.length;
  	ctx2.shadowBlur = 15;
  	ctx2.shadowColor = '#fff';
  	while( i-- ) {
  		var part = parts[ i ];

  		part.x += Math.cos( part.angle ) * part.vel;
  		part.y += Math.sin( part.angle ) * part.vel;
  		part.angle += rand( -0.05, 0.05 );

  		ctx2.beginPath();
  		ctx2.arc( part.x, part.y, part.radius, 0, twopi );
  		ctx2.fillStyle = hsla( 0, 0, 100, 0.075 + Math.cos( part.tick * 0.02 ) * 0.05 );
  		ctx2.fill();

  		if( part.x - part.radius > cw ) { part.x = -part.radius }
  		if( part.x + part.radius < 0 )  { part.x = cw + part.radius }
  		if( part.y - part.radius > ch ) { part.y = -part.radius }
  		if( part.y + part.radius < 0 )  { part.y = ch + part.radius }

  		part.tick++;
  	}
  }

  function resize() {
  	cw = c1.width = c2.width = window.innerWidth,
  	ch = c1.height = c2.height = window.innerHeight;
  	create();
  }

  function click() {
  	create()
  }

  window.addEventListener( 'resize', resize );
  window.addEventListener( 'click', click );

  init();
});
