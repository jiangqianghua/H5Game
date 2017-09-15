var local = new Local();
local.start();

var remote = new Remote();
remote.start(2,2);
remote.bindKeyEvents();