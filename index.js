function isGenerator(obj) {
	return typeof obj.next === 'function' && typeof obj.throw === 'function';
}
var isThenable = (o) => o && typeof(o.then)==='function';

function autopilot (gen){


	   var self = this;

    return new Promise(function(resolve,reject){

		if (typeof gen === 'function'){gen = gen.call(self);} //May not pre exec
		if (!gen || typeof gen.next !== 'function'){return resolve(gen);}

		goNext();


		function goNext(res) {
			var ret;
			try {
				ret = gen.next(res);
			} catch (e) {
				return reject(e);
			}
			next(ret);
		}


		function onRejected(err) {
			var ret;
			try {
				ret = gen.throw(err);
			} catch (e) {
				return reject(e);
			}
			next(ret);
		}



		function next(ret) {
			if (ret.done){return resolve(ret.value)};
			var value = toPromise.call(ctx, ret.value);
			if (value && isPromise(value)) return value.then(goNext, onRejected);
			return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
				+ 'but the following object was passed: "' + String(ret.value) + '"'));
		}




	});
};

module.exports = autopilot;