var tap = require('tap');

var type = require('../lib/typeCheck');

//create a class to type check against
var User = function User(name) {
    this._name = 'ms ' + name;
  }

// Create a wrong class to check against
var NotUser = function NotUser(name) {
    this._name = 'tractor ' + name;
}


var typeCheck = type(User)

var myUser = new User('alice');
var myTractor = new NotUser('3334');

var someThing = function(){
    typeCheck(arguments);
}   

function wrongTypeUsed(){
    someThing(myTractor)
}

tap.throws(wrongTypeUsed, new TypeError("Argument at position 0 was instance of 'NotUser' but expected 'User'"))


function correctTypeUsed(){
    someThing(myUser)
}

tap.doesNotThrow(correctTypeUsed);


function typeOfCheck(){

    var myTypedFunc = type(type.str)

    function thing(a){
        myTypedFunc(arguments)
    }

    thing(undefined)
}

tap.throws(typeOfCheck, new TypeError("Argument at position 0 was of type 'undefined' but expected 'string'"))
