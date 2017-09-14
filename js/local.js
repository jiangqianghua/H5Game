var Local = function()
{
	var game ; 
	var INERVAL = 200 ;
	var timer = null ;
	var timeCount = 0 ;
	var time = 0 ;
	// bind key event
	var bindKeyEvent = function()
	{
		document.onkeydown = function(e)
		{
			if(e.keyCode == 38)  // up
			{
				game.rotate();
			} else if(e.keyCode == 39) // right
			{
				game.right();
			} else if(e.keyCode == 40) // down
			{
				game.down();
			} 
			else if(e.keyCode == 37)  // left 
			{
				game.left();
			} 
			else if(e.keyCode == 32)  // space
			{
				game.fall();
			} 
		}
	}

	var move = function(){
		timeFunc();
		if(!game.down())
		{
			game.fixed();
			var line = game.checkClear();
			if(line)
			{
				game.addSocre(line);
			}
			if(game.checkGameOver())
			{
				game.gameOver(false);
				stop()
			}
			else
			{
				game.preformNext(generateType(),generateDir());
			}
		}
	}

	// timeCount 
	var timeFunc = function()
	{
		timeCount = timeCount + 1 ;
		if(timeCount == 5)
		{
			timeCount = 0 ;
			time = time + 1 ;
			game.setTime(time);
		}
	}
	// rand for 0 - 6
	var generateType = function()
	{
		return Math.ceil(Math.random()*7)-1 ;
	}
	// rand for 0 - 3
	var generateDir = function()
	{
		return Math.ceil(Math.random()*4)-1 ;
	}
	var start = function(){
		var dom = 
		{
			gameDiv:document.getElementById("game"),
			nextDiv:document.getElementById("next"),
			timeDiv:document.getElementById("time"),
			scoreDiv:document.getElementById("score"),
			resultDiv:document.getElementById("gameover")

		}	
		game = new Game();
		game.init(dom,generateType(),generateDir());
		bindKeyEvent();
		game.preformNext(generateType(),generateDir());
		timer = setInterval(move,INERVAL);

	}

	var stop = function()
	{
		if(timer)
		{
			clearInterval(timer);
			document.onkeydown = null ;
		}
	}
	// report fun
	this.start = start ;
}