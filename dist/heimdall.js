/*! Heimdall - v0.0.2 - 2013-12-10
* https://github.com/mizuki/Heimdall
* Copyright (c) 2013 mizuki_r; Licensed MIT */
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

Heimdall.Result = (function () {
  'use strict';

  var Constructor = function (args) {
      this.rules  = args.rules;
      this.errors = [];
  };

  Constructor.prototype.has_error = function () {
      return this.errors.length > 0 ? true : false;
  };
  Constructor.prototype.get_errors = function () {
      return this.has_error() ? this.errors : null;
  };
  Constructor.prototype.get_error = function (column, method) {
      if (!this.has_error()) {
          return null;
      } else {
        var res = $.map(this.errors, function (error) {
            return error.column === column && error.method === method ? error : null;
        });
        return res && res.length > 0 ? res[0] : null;
      }
  };
  Constructor.prototype.exists_column = function (column) {
      return this.rules[column] ? true : false;
  };
  Constructor.prototype.set_error = function (column, method, value) {
      if (!this.exists_column(column)) {
          // error, invalid column.
          // TODO: more valid case is throw?
          return;
      } else {
          var err = {
              "column": column,
              "method": method,
              "value":  value
          };
          this.errors.push(err);

          return err;
      }
  };

  return Constructor;
})();

(function () {
  'use strict';

  Heimdall.CONSTRAINTS.DEFAULTS = {
    "required": function (value) {
        return value && value.length > 0 ? true : false;
    },
    "length": function (value, min, max) {
        return min <= value.length && value.length <= max ? true : false;
    },
    "select": function (value, item) {
        var index = -1,
            length = item ? item.length : 0;
        while (++index < length) {
            if (item[index] === value) {
                return true;
            }
        }
        return false;
    },
    "int": function (value) {
        return isFinite(value) ? true : false;
    },
  };
})();

(function () {
    'use strict';

    $.heimdall = function (rules) {
        return new Heimdall(rules);
    };
})();
