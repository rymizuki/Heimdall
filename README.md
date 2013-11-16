# Heimdall

Heimdall is a form validation module for jquery or zepto.

# SYNOPSIS

## load scripts

Heimdall depends on jquery or zeptp. Read after the jquery or zepto.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="/js/jquery.heimdall.min.js"></script>
<script src="/js/main.js"></script>
```

## basic usage

in your script.

### Construction

use Class.

```javascript
var heimdall = new Heimdall({
    "name"    : ["required", ["length", [1,  32]]],
    "age"     : ["required", "int"],
    "gender"  : ["required", ["select", ["male", "female"],
    "message" : [            ["length", [0, 256]]]
});

```

use `jQuery|zepto` namespace.

```javascript
var heimdall = $.heimdall({
    "name"    : ["required", ["length", [1,  32]]],
    "age"     : ["required", "int"],
    "gender"  : ["required", ["select", ["male", "female"],
    "message" : [            ["length", [0, 256]]]
});
```

use DOM object.

```javascript
var $form = $('#form')
    .on('invalid', invalid_case_func)
    .on('success', success_case_func);

$('#btn-submit').on('click', function () {
    $form.heimdall({
        "name": ["required", ["length", [1, 32]]],
        "age"     : ["required", "int"],
    });
});
```


### validationing

```
var result = heimdall.validate(form_params); // will be {...} object

if (result.has_error()) {
    console.log(result.get_errors());
} else {
    console.log('successful');
}
```

# METHODS

## Heimdall.new(object) or $.heimdal(object);

Returns: `Heimdall`

```javascript
var heimdall = new Heimdal({
    "name"    : ["required", ["length", [1,  32]]],
    "age"     : ["required", "int"],
    "gender"  : ["required", ["select", ["male", "female"],
    "message" : [            ["length", [0, 256]]]
});
```

## heimdal.load\_constraints(name, func) or heimdal.load\_constraints(object)

```javascript
heimdall.load_constraints('my_constraint', function (value) {
    return value ? true : false;
});
```

## heimdal.validate(object)

Returns: `Heimdall.Result`

```javascript
var result = heimdal.validate({
    "name": "tarou",
    "age": 16,
    "gender": "male",
    "message": "hello world"
});
```

## result.has\_error()

Returns: `Boolean`

```
if (result.has_error()) {
    console.log('invalid');
} else {
    console.log('successful');
}
```

## result.get\_errors();

```
var errors = result.get_errors();
```

### has error case:

Returns: `array`

### hasn't error case:

Returns: `null`

## result.get\_error(column:string, method:string)

```
var error = result.get_error('name', 'length');
```

### has error case:

Retunrs: `object`

### hasn't error case:

Returns: `null`

## result.set\_error(column:string, method:string, value:string)

Returns: `object`

```
var error = result.set_error('name', 'required', undefined);
```
