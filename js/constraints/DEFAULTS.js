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
