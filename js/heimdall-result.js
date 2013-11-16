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
