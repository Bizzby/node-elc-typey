# ELC-TYPEY

Some helpers and bits 'n' bobs for runtime type checking.

You'll probably never want to use this library unless you have
some very wierd and specific legacy/refactoring to do.

If you are using this on a brand new project you should probably
look at ES7 decorators or sweet-js macros instead.

Usage:

This is mostly intended for working with coffee-script
but might work with vanilla ES5 too.


```coffeescript

class Accounts

    constructor: _type(Date, Date) (start, end)->

        @_start = somethingCool(start)
        @_date = somethingElseCool(end)

```