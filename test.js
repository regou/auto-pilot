var autopilot = require('./index');


var time = function(waitTime){
	return new Promise(function(res,rej){
		setTimeout(function(){
			res(7);
		},waitTime)
	})
};



var genFunc = function *(waitTime){
	var a = yield function(){return waitTime};

	var b = yield time(a);

	return [a,b];

};


autopilot(genFunc(3000)).then(function(o){
	console.log('ok',o);
},function(err){
	console.log('err',err);
});

