# ELC-TYPEY

Some helpers and bits 'n' bobs for runtime type checking.

You'll probably never want to use this library unless you have
some very wierd and specific legacy/refactoring to do.

If you are using this on a brand new project you should probably
look at ES7 decorators or sweet-js macros instead.

# Usage

This is mostly intended for working with coffee-script
but might work with vanilla ES5/ES6 too.

```javascript
var type = require('elc-typey');

var typeCheck = type(constructor || "string" || undefined [, ...]);

var typeCheckedSomeFunc = typeCheck(someFunc);
```

`type` takes a variable number of arguments, each of which should either be 
 - constructor function : if supplied then an `instanceof` test will be used
 - string : if supplied then a `typeof` test will be used
 - undefined : if supplied then no type checking will be used

The function returned by `type()` should then be called with the function you
wish to type check. In turn that will return a function that behaves the same
way as your original function (except it throws errors if the wrong arg types are supplied).

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

