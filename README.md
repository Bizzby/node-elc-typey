# ELC-TYPEY

Some helpers and bits 'n' bobs for runtime type checking.

You'll probably never want to use this library unless you have
some very wierd and specific legacy/refactoring to do.

If you are using this on a brand new project you should probably
look at ES7 decorators or sweet-js macros instead.

# Usage

```javascript
var type = require('elc-typey');

var typeCheck = type(constructor || "string" || undefined [, ...]);

var stuff = function(user, name, age){
  typeCheck(arguments);
}

```

`type` takes a variable number of arguments, each of which should either be a
 - constructor function : if supplied then an `instanceof` test will be used.
 - string : if supplied then a `typeof` test will be used and compared against the supplied string.
 - `undefined` || `"*"` : if supplied then no type checking will be used.

The function returned by `type()` should then be called with the arguments you
wish to type check. 

`elc-typey` exports some aliases to shorten function signatures

```javascript
var type = = require('elc-typey');

console.log(type);
{ [Function: typeCheck]
  fn: 'function',
  str: 'string',
  bool: 'boolean',
  num: 'number',
  obj: 'object',
  any: '*'
}

var typeCheck = type(type.fn, type.bool, '*')


```


This library will not modify the arguments in anyway before passing them through to your original
function. (combinators are great things) (except ycombinator - that is a bad thing™)

# Examples

```coffeescript

type = require('elc-typey')

class Accounts

    constructor: type(Date, Date) (start, end)->

        @_start = somethingCool(start)
        @_date = somethingElseCool(end)

```

```javascript
var type = require('elc-typey');

var User = function User();

var typeCheck = type(User, Date)

var myPlainFunction = function(user, date){
    //some logic and stuff
}

var typeCheckedFunc = typeCheck(myPlainFunction);

// this won't throw
typeCheckedFunc(new User(), new Date());

// this will throw
typeCheckedFunc('cat', new Date());
// throws : "Argument at position 0 was instance of 'String' but expected 'User'"
```

