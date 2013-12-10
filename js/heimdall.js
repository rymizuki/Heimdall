var Heimdall = (function () {
    'use strict';

    var toString = Object.prototype.toString;

    var Constructor = function (rules) {
        if (!rules || typeof rules !== 'object') {
          throw new TypeError('rules are invalid object');
        }

        this.rules       = rules;
        this.columns     = [];
        this.constraints = null;

        for (var column in this.rules) {
            this.columns.push(column);
        }
    };

    Constructor.prototype.validate = function (name, value) {
        var ret  = this.create_result();

        if (!this.constraints) {
            // XXX: not loaded constraints, loaded default constraints.
            this.load_constraints(Heimdall.CONSTRAINTS.DEFAULTS);
        }

        if (typeof name === 'object') {
            // heimdall.validate({ ... });
            // XXX: value is not used.
            var data = name;
            var that = this;
            that.columns.forEach(function (_name) {
                that.validate_input(ret, _name, data[_name]);
            });
        } else {
            // heimdall.validate(name, value);
            this.validate_input(ret, name, value);
        }

        return ret;
    };

    Constructor.prototype.validate_input = function (ret, name, value) {
        var that = this;
        this.rules[name].forEach(function (method) {
            var args;

            if (toString.call(method) === '[object Array]') { // _.isArray
                // eg. name: [["length", [1, 10]]],
                args   = method[1];
                method = method[0];
            }

            if (!that.constraints[method](value, args)) {
                ret.set_error(name, method, value);
            }
        });
        return this;
    };

    Constructor.prototype.create_result = function () {
        return new Heimdall.Result({"rules": this.rules});
    };

    Constructor.prototype.load_constraints = function (name, func) {
        var constraints = {};
        if (typeof name === 'object' && !func) {
            constraints = name;
        } else {
            constraints[name] = func;
        }

        // override existing constraints.
        this.constraints = $.extend(this.constraints || {}, constraints);

        return this;
    };

    return Constructor;
})();

Heimdall.DEFAULTS = {
};
Heimdall.CONSTRAINTS = {};
