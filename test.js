var autopilot = require('./index');


var time = function(){
	return new Promise(function(res,rej){
		setTimeout(function(){
			res(7);
		},3000)
	})
};


autopilot(function *(){
	var a = yield function(){return 4};

	var b = yield time();

	return [a,b];

}).then(function(o){
	console.log('ok',o);
},function(err){
	console.log('err',err);
});

