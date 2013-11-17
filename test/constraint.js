describe('Heimdall.CONSTRAINTS', function () {
    describe('DEFAULTS', function () {
        describe('required', function () {
            var required = Heimdall.CONSTRAINTS.DEFAULTS.required;

            it('undefined is false', function () {
                expect(required()).to.be.eql(false);
            });
            it('null is false', function () {
                expect(required(null)).to.be.eql(false);
            });
            it('"aaaa" is true', function () {
                expect(required('aaaa')).to.be.eql(true);
            });
        });
        describe('length', function () {
            var len = Heimdall.CONSTRAINTS.DEFAULTS.length;

            it('"aaa" is true on 0 to 10 or less', function () {
                expect(len('aaa', 0, 10)).to.be.eql(true);
            });
            it('"aaa" is true on 0 to 3 or less', function () {
                expect(len('aaa', 0, 3)).to.be.eql(true);
            });
            it('"aaa" is true on 1 to 3 or less', function () {
                expect(len('aaa', 1, 3)).to.be.eql(true);
            });
            it('"aaa" is false on 0 to 2 or less', function () {
                expect(len('aaa', 0, 2)).to.be.eql(false);
            });
            it('"" is true on 0 to 3 or less', function () {
                expect(len('', 0, 3)).to.be.eql(true);
            });
            it('"" is false on 1 to 3 or less', function () {
                expect(len('', 1, 3)).to.be.eql(false);
            });
        });
        describe('select', function () {
            var select = Heimdall.CONSTRAINTS.DEFAULTS.select;

            it('a is true', function () {
                expect(select('a', ['a', 'b', 'c'])).to.be.eql(true);
            });
            it('d is not  within a b c', function () {
                expect(select('d', ['a', 'b', 'c'])).to.be.eql(false);
            });
        });
        describe('int', function () {
            var int = Heimdall.CONSTRAINTS.DEFAULTS.int;

            it('1 is true', function () {
                expect(int(1)).to.be.ok();
            });
            it('a is false', function () {
                expect(int('a')).to.not.be.ok();
            });
            it('"1" is true', function () {
                expect(int('1')).to.be.ok();
            });
            it('0.1 is true', function () {
                expect(int(0.1)).to.be.ok();
            });
        });
    });
});
