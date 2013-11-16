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

    Constructor.prototype.validate = function (data) {
        var that = this;

        if (!this.constraints) {
            // XXX: not loaded constraints, loaded default constraints.
            this.load_constraints(Heimdall.CONSTRAINTS.DEFAULTS);
        }

        var ret = this.create_result();
        
        this.columns.forEach(function (column) {
            that.rules[column].forEach(function (method) {
                var args;

                if (toString.call(method) === '[object Array]') { // _.isArray
                    args   = method[1];
                    method = method[0];
                }

                if (!that.constraints[method](data[column], args)) {
                    ret.set_error(column, method, data[column]);
                }
            });
        });

        return ret;
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
