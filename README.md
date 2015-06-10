# auto-pilot
Auto pilot your es6 generator functions

### Usage Example
    var autopilot = require('auto-pilot');
    autopilot(function *(input){
        var name = yield httpRequestData(input); //a promise resolve ' World!'
        
        var prefix = yield function(){return 'Hello! '};
        
        return prefix + String(data);       
        
    }).then(function(str){
        console.log(str) //  'Hello!  World!'
    },function(err){
        console.warn(err);
    });
    
### Notice
Require a global Promise polyfill

### Develop/Test
    $ npm install
    $ npm run test
