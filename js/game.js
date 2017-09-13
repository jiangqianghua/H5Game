var Game = function()
{
	var gameDiv; 
	var nextDiv ;


	var gameData = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
	];


	// current square
	var cur ; 
	// next square	
	var next ;
	var nextDivs = [];
	var gameDivs = [];


	var initDiv = function(container,data,divs){
		for(var i = 0 ; i < data.length ; i++)
		{
			var div = [];
			for(var j = 0 ; j < data[0].length ; j++)
			{
				var newNode = document.createElement("div");
				newNode.className = "none";
				newNode.style.top = (i*20) + "px";
				newNode.style.left = (j*20) + "px";
				container.appendChild(newNode);
				div.push(newNode);
			}
			divs.push(div);
		}
	}


	var refashDiv = function(data,divs){
		for(var i = 0 ; i < data.length ; i++)
		{
			for(var j = 0 ; j < data[0].length ; j++)
			{
				if(data[i][j] == 0)
				{
					divs[i][j].className = "none";
				}
				else if(data[i][j] == 1)
				{
					divs[i][j].className = "done";
				}
				else if(data[i][j] == 2)
				{
					divs[i][j].className = "current";
				}
			}
		}
	}

	var isValid = function(pos,data)
	{
		for(var i = 0 ; i < data.length ; i++)
		{
			for(var j = 0 ; j < data[0].length; j++)
			{
				if(data[i][j] != 0)
				{
					if(!check(pos,i,j))
					 {
					 	return false ;
					 }
				}
			}
		}

		return true ;
	}
	// check dot is right
	var check = function(pos,x,y)
	{
		if(pos.x + x < 0)
		{
			return false ;
		}
		else if(pos.x + x >= gameData.length)
		{
			return false ;
		}
		else if(pos.y + y < 0)
		{
			return false ;
		}
		else if(pos.y + y >= gameData[0].length)
		{
			return false ;
		}
		else if(gameData[pos.x + x][pos.y + y] == 1)
		{
			return false ;
		}
		else 
		{
			return true ;
		}
	}
	var cleanData = function()
	{
		for(var i = 0 ; i < cur.data.length ; i++)
		{
			for(var j = 0 ; j < cur.data[0].length; j++)
			{
				if(check(cur.origin,i,j))
					gameData[cur.origin.x + i ][cur.origin.y + j] = 0; 
			}
		}
	}
	var setData = function()
	{
		for(var i = 0 ; i < cur.data.length ; i++)
		{
			for(var j = 0 ; j < cur.data[0].length; j++)
			{
				if(check(cur.origin,i,j))
					gameData[cur.origin.x + i ][cur.origin.y + j] = cur.data[i][j]; 
			}
		}
	}

	var rotate = function()
	{
		if(cur.canRotate(isValid))
		{
			cleanData();
			//cur.origin.x = cur.origin.x + 1 ;
			cur.rotate();
			setData();
			refashDiv(gameData,gameDivs);

		}
	}
	var down = function()
	{
		if(cur.canDown(isValid))
		{
			cleanData();
			//cur.origin.x = cur.origin.x + 1 ;
			cur.down();
			setData();
			refashDiv(gameData,gameDivs);
			return true ;
		}
		else
		{
			return false ;
		}
	}

	// down to end 
	var fall = function()
	{
		while(down())
		{
			;
		}
	}

	var left = function()
	{
		if(cur.canLeft(isValid))
		{
			cleanData();
			//cur.origin.x = cur.origin.x + 1 ;
			cur.left();
			setData();
			refashDiv(gameData,gameDivs);

		}
	}


	var right = function()
	{
		if(cur.canRight(isValid))
		{
			cleanData();
			//cur.origin.x = cur.origin.x + 1 ;
			cur.right();
			setData();
			refashDiv(gameData,gameDivs);

		}
	}
	var init = function(doms)
	{
		gameDiv = doms.gameDiv; 
		nextDiv = doms.nextDiv;

		cur = new Square();
		next = new Square();

		initDiv(gameDiv,gameData,gameDivs);
		initDiv(nextDiv,next.data,nextDivs);	
		// for test
		cur.origin.x = 0;
		cur.origin.y = 0 ;
		setData();
		refashDiv(gameData,gameDivs);
		refashDiv(next.data,nextDivs);
	}

	// report fun
	this.init = init;
	this.down = down;
	this.right = right;
	this.left = left ;
	this.rotate = rotate ;
	this.fall = fall ;
}