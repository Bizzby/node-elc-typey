'use strict'

// Function courtesy of Raganwald
// https://github.com/raganwald/method-combinators

module.exports = function before(decoration) {
  return function(base) {
    return function() {
      decoration.apply(this, arguments);
      return base.apply(this, arguments);
    };
  };
};