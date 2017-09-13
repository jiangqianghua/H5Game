var Local = function()
{
	var game ; 

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
	var start = function(){
		var dom = 
		{
			gameDiv:document.getElementById("game"),
			nextDiv:document.getElementById("next")
		}

		game = new Game();
		game.init(dom);
		bindKeyEvent();

	}

	// report fun
	this.start = start ;
}