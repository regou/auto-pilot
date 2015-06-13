# auto-pilot
Auto pilot your es6 generator functions

### Usage Example
```js
var autopilot = require('auto-pilot');

var joint = function *(input){
    var name = yield httpRequestData(input); //yield a promise 'httpRequestData' resolve ' World!'
    
    var str = yield function(){return 'Hello! ' + name; }; //also can yield a function
    
    return str;       
};

autopilot(joint('An example string')).then(function(str){
    console.log(str) //  'Hello!  World!'
},function(err){
    console.warn(err);
});
```
    
### Notice
Require a global Promise polyfill

### Develop/Test
`$ npm install`
`$ npm run test`
