var Remote = function()
{
	var game ;
	var bindKeyEvents = function()
		{
			document.getElementById("down").onclick = function(){
				game.down();
			}
			document.getElementById("right").onclick = function(){
				game.right();
			}
			document.getElementById("left").onclick = function(){
				game.left();
			}
			document.getElementById("rotate").onclick = function(){
				game.rotate();
			}
			document.getElementById("fall").onclick = function(){
				game.fall();
			}
			document.getElementById("fixed").onclick = function(){
				game.fixed();
			}
			document.getElementById("preformNext").onclick = function(){
				game.preformNext(2,2);
			}
			document.getElementById("checkClear").onclick = function(){
				game.checkClear();
			}
			document.getElementById("checkGameOver").onclick = function(){
				game.checkGameOver();
			}
			document.getElementById("setTime").onclick = function(){
				game.setTime(20);
			}
			document.getElementById("addSocre").onclick = function(){
				game.addSocre(10);
			}
			document.getElementById("gameOver").onclick = function(){
				game.gameOver(true);
			}
			document.getElementById("addTailLines").onclick = function(){
				game.addTailLines([[1,0,1,0,1,1,1,0,0,1]]);
			}
		}
	var start = function(type,dir)
	{
		var dom = 
		{
			gameDiv:document.getElementById("remote_game"),
			nextDiv:document.getElementById("remote_next"),
			timeDiv:document.getElementById("remote_time"),
			scoreDiv:document.getElementById("remote_score"),
			resultDiv:document.getElementById("remote_gameover")

		}	
		game = new Game();
		game.init(dom,type,dir);
	}

	this.start = start ;
	this.bindKeyEvents = bindKeyEvents ;
}