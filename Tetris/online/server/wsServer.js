var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 30000;

var clientCount = 0 ;

var socketMap = {};

app.listen(PORT);

var bindListener = function(socket,event)
{
	socket.on(event,function(data){
		if(socket.clientNum % 2 == 0)
		{
			if(socketMap[socket.clientNum - 1])
			{
				socketMap[socket.clientNum - 1].emit(event,data);
			}
		}
		else
		{
			if(socketMap[socket.clientNum + 1])
			{
				socketMap[socket.clientNum + 1].emit(event,data);
			}
		}
	});
}

io.on('connection',function(socket){


	clientCount = clientCount + 1 ; 
	socket.clientNum = clientCount ; 
	socketMap[clientCount] = socket ;
	console.log("connection " + socket.clientNum);
	// match person
	if(clientCount % 2 == 1)
	{
		socket.emit('waiting','waiting for another person');
	} 
	else
	{
		if(socketMap[clientCount-1])
		{
			// match success ,start game 
			socket.emit('start');
			socketMap[clientCount-1].emit('start');
		}
		else
		{
			socket.emit("leave");
		}
	}
	bindListener(socket,"init");
	bindListener(socket,"next");
	bindListener(socket,"rotate");
	bindListener(socket,"right");
	bindListener(socket,"down");
	bindListener(socket,"left");
	bindListener(socket,"fall");
	bindListener(socket,"fixed");
	bindListener(socket,"line");
	bindListener(socket,"time");
	bindListener(socket,"lose");
	bindListener(socket,"bottomLines");
	bindListener(socket,"addTailLines");

	socket.on('disconnect',function(){
		if(socket.clientNum % 2 == 0)
		{
			if(socketMap[socket.clientNum - 1])
			{
				socketMap[socket.clientNum - 1].emit('leave');
			}
		}
		else
		{
			if(socketMap[socket.clientNum + 1])
			{
				socketMap[socket.clientNum + 1].emit('leave');
			}
		}
		delete(socketMap[socket.clientNum]);
	});
});

console.log('webSocket listening on port ' + PORT);