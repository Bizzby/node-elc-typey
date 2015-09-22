var tap = require('tap');

var type = require('../lib/typeCheck');

//create a class to type check against
var User = function User(name) {
    this._name = 'ms ' + name;
  }

User.prototype.whoami = function() {
    return this._name;
};

// Create a wrong class to check against
var NotUser = function NotUser(name) {
    this._name = 'tractor ' + name;
}

NotUser.prototype.whoami = function() {
    return this._name;
};

var untypedFunc = function(leader){
    leader.whoami();
}

var typeCheck = type(User)

var typeCheckedFunc = typeCheck(untypedFunc);

var myUser = new User('alice');
var myTractor = new NotUser('3334');


function wrongTypeUsed(){
    typeCheckedFunc(myTractor);
}

tap.throws(wrongTypeUsed, new TypeError("Argument at position 0 was instance of 'NotUser' but expected 'User'"))


function correctTypeUsed(){
    typeCheckedFunc(myUser);
}

tap.doesNotThrow(correctTypeUsed);


function typeOfCheck(){
    var myTypedFunc = type('string')(console.log)
    myTypedFunc();
}

tap.throws(typeOfCheck, new TypeError("Argument at position 0 was of type 'undefined' but expected 'string'"))