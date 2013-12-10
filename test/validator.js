describe('new Heimdall', function () {
    it('create a new instance', function () {
        expect(new Heimdall({})).to.be.an(Heimdall);
    });
    it('constraints is undefined', function () {
        var validator = new Heimdall({});
        expect(validator.constraints).to.be.eql(null);
    });
    it('rules exists', function () {
        var validator = new Heimdall({
            "name": ["required"]
        });
        expect(validator.rules).to.be.eql({
            "name": ["required"]
        });
    });
    it('columns exists', function () {
        var validator = new Heimdall({
            "name": ["required"]
        });
        expect(validator.columns).to.be.eql(["name"]);
    });
});

describe('validator.load_constraints', function () {
    describe('by default', function () {
        var validator = new Heimdall({});
        it('undefibed', function () {
            expect(validator.constraints).to.not.be.ok();
        });
    });
    describe('load function object', function () {
        var validator = new Heimdall({});
        var const_mock = {
            "mock": function () { return true; }
        };
        it('success', function () {
            expect(validator.load_constraints(const_mock)).to.be.ok();
        });
        it('exists func', function () {
            expect(validator.constraints.mock).to.be.a('function');
        });
    });
    describe('can override', function () {
        var validator = new Heimdall({});
        validator.load_constraints({"mock": "aaaa"});
        validator.load_constraints({"mock": "bbbb"});

        it('can do', function () {
            expect(validator.constraints).to.be.eql({
                "mock": "bbbb",
            });
        });
    });
});

describe('validator.create_result', function () {
    var validator = new Heimdall({
        "name": ['required']
    });
    it('returned Result instance', function () {
        expect(validator.create_result()).to.be.an(Heimdall.Result);
    });
});

describe('validator.validate', function () {
    describe('validating object', function () {
        describe('is valid data if retuned result object.', function () {
            var validator = new Heimdall({
                "name": ["required"],
            });

            var result = validator.validate({"name": "tarou"});

            it('result is a object of Heimdall.Result', function () {
                expect(result).to.be.an(Heimdall.Result);
            });
            it('result has not error', function () {
                expect(result.has_error()).to.not.be.ok();
            });
            it('result.get_errors returns null', function () {
                expect(result.get_errors()).to.be.eql(null);
            });
        });

        describe('is not valid data', function () {
            var validator = new Heimdall({
                "name": ["required"],
            });

            var result = validator.validate({"name": null});

            it('result is a object of Heimdall.Result', function () {
                expect(result).to.be.an(Heimdall.Result);
            });
            it('result.has_error returnd true', function () {
                expect(result.has_error()).to.be.ok();
            });
            it('result.get_errors returns array', function () {
                expect(result.get_errors()).to.be.a('array');
            });
            it('result.get_error returns.', function () {
                expect(result.get_error('name', 'required')).to.be.a('object');
            });
        });
    });
    describe('validating an input', function () {
        describe('give the valid data', function () {
            before(function (done) {
                this.validator = new Heimdall({
                    "name": ["required"],
                    "age" : ["required"]
                });
                this.result = this.validator.validate('name', 'tarou');
                done();
            });

            it('on Heimdall.Result', function () {
                expect(this.result).to.be.an(Heimdall.Result);
            });
            it('has_error is false', function () {
                expect(this.result.has_error()).to.not.be.ok();
            });
            it('get_errors return null', function () {
                expect(this.result.get_errors()).to.be.eql(null);
            });
        });
        describe('give the invalid data', function () {
            before(function (done) {
                this.validator = new Heimdall({
                    "name": ["required"],
                    "age" : ["required"]
                });
                this.result = this.validator.validate('name', null);
                done();
            });

            it('on Heimdall.Result', function () {
                expect(this.result).to.be.an(Heimdall.Result);
            });
            it('has_error is true', function () {
                expect(this.result.has_error()).to.ok();
            });
            it('get_errors return array', function () {
                expect(this.result.get_errors()).to.be.a('array');
            });
            it('get_errors return errors', function () {
                expect(this.result.get_error('name', 'required')).to.be.a('object');
            });
        });
    });
});
describe('use $ prefix', function () {
    describe('has heimdal method', function () {
        it('ok', function () {
            expect($.heimdall).to.be.a('function');
        });
    });
    describe('create instance', function () {
        var validator = $.heimdall({
            "name": ["required"],
        });
        it('of Heimdal object', function () {
            expect(validator).to.be.an(Heimdall);
        });
        it('has rules', function () {
            expect(validator.rules).to.be.eql({
                "name": ["required"]
            });
        });
    });
});
