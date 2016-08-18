// var isGenerator = require('is-generator');
// var isGeneratorFn = require('is-generator').fn;

var isThenable = function(o){
	return (o && typeof(o.then)==='function');
};


function promisfy (func, ctx) {
	return function () {
		var args = arguments;
		if (typeof func === "function") {
			var res = func.apply(ctx || null, args);
			if(isThenable(res)){
				return res;
			}else{
				return new Promise(function (resolve, reject) {
					if(res===false){
						reject(res)
					}else{
						resolve(res);
					}

				});
			}
		} else {
			return new Promise(function (resolve, reject) {
				reject(func);
			});
		}

	}
};


function autopilot (gen,promiseCreator){


	var self = this;

	var creator = function (func) {
		return new Promise(func)
	};


	if(typeof promiseCreator === 'function'){
		creator = promiseCreator;
	}




    return creator(function(resolve,reject){

		if (typeof gen === 'function'){gen = gen.call(self);} //May not pre exec
		if (!gen || typeof gen.next !== 'function'){return resolve(gen);}




		function goNext(res) {
			var ret;
			try {
				ret = gen.next(res);
			} catch (e) {
				return reject(e);
			}
			next(ret);
		}
		function goRejected(err) {
			var ret;
			try {
				ret = gen.throw(err);
			} catch (e) {
				return reject(e);
			}
			next(ret);
		}



		function next(ret) {
			if(ret.done){return resolve(ret.value)};
			var value = ret.value;

			if(value && typeof(value) === 'function'){
				value = promisfy(value)();
			}

			if(value && isThenable(value)){return value.then(goNext, goRejected);}

			return goRejected(new TypeError('Please yield a function or promise, ' + 'The following type was passed: "' + typeof(ret.value) + '"'));
		}



		goNext();

	});
};

module.exports = autopilot;
