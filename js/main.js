

let cells = [ ];  //total cells = column x column

let player1Turn = true;

$(document).ready(function() {


  const winChecker = function(){
    if (
    ( cells[0][0] === cells[0][1] && (cells[0][1] === cells[0][2])) ||
    ( cells[1][0] === cells[1][1] && (cells[1][1] === cells[1][2])) ||
    ( cells[2][0] === cells[2][1] && (cells[2][1] === cells[2][2])) ||
    // Vertical win condition isn't working
    // ( cells[0][0] === cells[1][0] && (cells[1][0] === cells[2][0])) ||
    // ( cells[0][1] === cells[1][1] && (cells[1][1] === cells[2][1])) ||
    // ( cells[0][2] === cells[1][2] && (cells[1][2] === cells[2][2]))
    //  ||
    ( cells[0][0] === cells[1][1] && (cells[1][1] === cells[2][2])) ||
    ( cells[2][0] === cells[1][1] && (cells[1][1] === cells[0][2]))
    ) {
      if (player1Turn === true) {
        alert('Player 1 wins!')
      }
      else {
        alert('Player 2 wins!')
      }
      console.log(cells);
    }
}

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


//Cool background.
