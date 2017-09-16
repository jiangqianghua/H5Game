var Local = function(socket)
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
				socket.emit("rotate");
			} else if(e.keyCode == 39) // right
			{
				game.right();
				socket.emit("right");
			} else if(e.keyCode == 40) // down
			{
				game.down();
				socket.emit("down");
			} 
			else if(e.keyCode == 37)  // left 
			{
				game.left();
				socket.emit("left");
			} 
			else if(e.keyCode == 32)  // space
			{
				game.fall();
				socket.emit("fall");
			} 
		}
	}

	var move = function(){
		timeFunc();
		if(!game.down())
		{
			game.fixed();
			socket.emit("fixed");
			var line = game.checkClear();
			if(line)
			{
				game.addSocre(line);
				socket.emit('line',line);

				// 给对方增加干扰
				if(line > 1)
				{
					var bottomLines = generateBottomLine(line);
					socket.emit('bottomLines',bottomLines);
				}
			}
			if(game.checkGameOver())
			{
				game.gameOver(false);
				socket.emit("lose");
				document.getElementById("remote_gameover").innerHTML="other win";
				stop()
			}
			else
			{
				var t = generateType();
				var d = generateDir() ;
				game.preformNext(t,d);
				socket.emit("next",{type:t,dir:d});
			}
		}
		else
		{
			socket.emit("down");
		}
	}

	// 随机生成干扰行
	var generateBottomLine = function(lineNum)
	{
		var lines = [];
		for(var i = 0 ;i < lineNum; i++)
		{
			var line = [];
			for(var j = 0 ; j < 10 ; j++)
			{
				line.push(Math.ceil(Math.random()*2)-1);
			}
			lines.push(line);
		}
		return lines ;
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
			//  每隔10秒生成从底部生成干扰项,测试使用
			//if(time % 10 == 0)
			//	game.addTailLines(generateBottomLine(1));
			socket.emit('time',time);
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
			gameDiv:document.getElementById("local_game"),
			nextDiv:document.getElementById("local_next"),
			timeDiv:document.getElementById("local_time"),
			scoreDiv:document.getElementById("local_score"),
			resultDiv:document.getElementById("local_gameover")

		}	
		game = new Game();
		var type = generateType() ; 
		var dir = generateType() ;
		game.init(dom,type,dir);
		socket.emit('init',{type:type , dir:dir});
		bindKeyEvent();
		
		var type1 = generateType() ; 
		var dir1 = generateType() ;
		game.preformNext(type1,dir1);
		socket.emit('next',{type:type1 , dir:dir1});
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
	//this.start = start ;
	socket.on("start",function(){
		document.getElementById("waiting").innerHTML = "";
		start();
	});

	// other emit you lose ,for you win game
	socket.on("lose",function(){
		game.gameOver(true);
		start();
	});

	socket.on("leave",function(){
		document.getElementById("local_gameover").innerHTML = "other leave";
		document.getElementById("remote_gameover").innerHTML = "leaved";
		stop();
	});

	socket.on("bottomLines",function(data){
		game.addTailLines(data);
		socket.emit("addTailLines",data);
	});
}