(function () {
    'use strict';

    // its a simple shorthand
    $.heimdall = function (rules) {
        return new Heimdall(rules);
    };

    // its a validate shorthand
    $.fn.heimdall = function (rules) {
        var $this    = this,
            heimdall = $this.data('heimdall');

        if ($this.length !== 1) {
            // not assumed case
            return this;
        }

        if (!heimdall) {
            $this.data('heimdall', (heimdall = new Heimdall(rules, $this)));
        }

        return heimdall;
    };
})();
