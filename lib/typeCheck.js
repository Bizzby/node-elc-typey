'use strict'

var before = require('./before');

//internal constants - maybe we should export these
var TYPEOF = 'typeof'
var INSTANCEOF = 'instanceof'

module.exports = typeCheck;

function typeCheck(){


  // taken from: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
  // I wish I was a macro....
  var typeArgs = new Array(arguments.length);
  for (var i = 0; i < typeArgs.length; i++) {
    typeArgs[i] = arguments[i];
  }

  //typeTests is some wierd object with numeric keys
  //because apparently sparse arrays aren't a thing?
  var typeTests = typeArgs.reduce(_typeArgsReducer, {});

  // length here means the last arg position of the last type checked
  // argument.
  // TODO: change this logic if we start allowing optionals of somekind
  // This is bad as we are relying on key order which is probably implentatio
  // specific
  typeTests.length = parseInt(Object.keys(typeTests).pop(), 10)

  return before(function() {

    var runtimeArgs = new Array(arguments.length);
    for (var i = 0; i < runtimeArgs.length; i++) {
      runtimeArgs[i] = arguments[i];
    }

    if (runtimeArgs.length < typeTests.length) {
      throw new Error('Expected ' + typeTests.length + ' arguments but counted '+ runtimeArgs.length)
    }
    

    Object.keys(typeTests).forEach(function(key){
      _otherInternalTypeCheck(typeTests[key], runtimeArgs[key], key)
    })

  });
}

function _testTypeOf(item, type, pos){
  if(typeof item !== type) {
    throw new TypeError("Argument at position " + pos +  " was of type '" + typeof item + "' but expected '" + type + "'")
  }
}

function _testInstanceOf(item, klass, pos) {
  if(item instanceof klass !== true) {
    // we assume item.constructor is not some userland made fuck-wittery
    var constructor = (item && item.constructor != undefined) ? item.constructor.name : "[no constructor]";
    throw new TypeError("Argument at position " + pos +  " was instance of '" + constructor + "' but expected '" + klass.name + "'")
  }
}

// takes [testType, testData], functionArg, pos
// TODO: we're passing/leaking pos out of laziness
// TODO: why don't we just pass around refernce to the test func around?
function _otherInternalTypeCheck(testItem, arg, pos){

  var testType = testItem[0];
  var testData = testItem[1];

  switch (testType) {
    case TYPEOF:
      _testTypeOf(arg, testData, pos)
      break;
    case INSTANCEOF:
      _testInstanceOf(arg, testData, pos)
      break;
    default:
      //don't throw here so we can be nice-ish at runtime
      // but we should never get here....
  }

}

//Designed to operate on an arguments object converted to an array
//returns an array of [typeOfCheck, SomeDataForCheck]
function _typeArgsReducer(checksToRun, typeToEnforce, position){

    // if typeToEnforce is `undefined` we don't check it
    // if typeof typeToEnforce is "String" then thats used 
    // for a typeof test (how meta is that :-p)
    // if it's a function then we assume it's a constructor
    // and we're doing typeOf checks
    if (typeToEnforce === undefined) {
      //do nothing
    } else if (typeof typeToEnforce == 'string') {
      checksToRun[position] = [TYPEOF, typeToEnforce]
    } else if (typeof typeToEnforce == 'function') {
      checksToRun[position] = [INSTANCEOF, typeToEnforce]
    }
    
    return checksToRun
    

  }