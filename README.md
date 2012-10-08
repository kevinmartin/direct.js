# Direct.js

Direct.js - DOM-based routing/execution script

## Related Articles
* _Paul Irish_ - [Markup-based unobtrusive comprehensive DOM-ready execution](http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/)
* _Viget_ - [Extending Paul Irish’s comprehensive DOM-ready execution](http://viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution)

## Other Links
* _NPMJS.org_ - [NPM](https://npmjs.org/package/direct)

## How to Use
Direct.js takes advantage of HTML data-* attributes, yet is still usable with xHTML and HTML4 (and down). First thing is first; place `data-controller=""` and `data-action=""` in the `<body>` tag of your layout:

### Examples
```html
<body data-controller="pages" data-action="home">
<body data-controller="<?php echo $controller; ?>" data-action="<?php echo $action; ?>">
<body data-controller="<%= @controller %>" data-action="<%= @action %>">
```

Then, include Direct.js using either the `<script>` tag or, if you're using an AMD compatible script, use the `require('direct');` script call:

### Examples
```html
<script src="/js/vendor/direct.js"></script>
```
or
```javascript
var _ = require("direct");
```

Last, create your script! :-)

## Usage
Direct.js uses both the `_` and `direct` variables. You could map them to any other variables you wish. For the sake of this article, we will use the shorthand `_` variable.

```javascript
_(controller[, action = "common"], function|Object)
```

If you specify a function but not `action`, the `action` will default to 'common'. If you specify an Object, the Object can contain functions or properties.

### Examples
```javascript
_("utils", {
  hello: function () { alert("Hello "); },
  world: function () { alert("World!"); },
  common: function (utils) {
    // Code that goes on every page goes here
    document.title = utils.pageTitle.replace(utils.rightTrim, '');
  },
  rightTrim: /\s+$/
});

_("utils", "config", {
  fancybox: {...},
  pageTitle: "Direct.js is Awesome! "
});

_("pages", "home", function (utils) {
  utils.hello();
  this.world();

  $("a[class=fancy]").fancybox(utils.config.fancybox);
});
```

### Order of Execution
* `utils.common()`
* `[controller].common()`
* `[controller].[action]()`

When your anonymous function is executed, one argument is passed: `utils`. This will contain all of the "libary" code you put in `_("utils", ...)`. The keyword `this` also contains a reference to `utils`.

Please fork and improve.