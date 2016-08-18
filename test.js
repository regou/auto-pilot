var autopilot = require('./index');
var should = require('should/as-function');



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

it('Can run yield', function (done) {

	autopilot(genFunc(500))
		.then(function(o){
			should(o).deepEqual([500,7]);
			done();
		},function(err){
			console.log('err',err);
		});

});


