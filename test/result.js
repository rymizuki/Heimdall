describe('Heimdall.Result', function () {
    describe('constraction', function () {
        var result = new Heimdall.Result({
            "rules": { "name": ["required"] }
        });

        it('instance create successful', function () {
            expect(result).to.be.an(Heimdall.Result);
        });
    });

    describe('result.exists_column', function () {
        var result = new Heimdall.Result({
            "rules": { "name": ["required"] }
        });

        it('true if exists in rules', function () {
            expect(result.exists_column('name')).to.be.ok();
        });
        it('false if not exists in rules', function () {
            expect(result.exists_column('not_exists')).to.not.be.ok();
        });
    });

    describe('result.set_error', function () {
        var result = new Heimdall.Result({
            "rules": { "name": [["length", [1, 10]]] }
        });

        describe('valid rule column', function () {
            it('return an object', function () {
                expect(result.set_error('name', 'length', "tarou")).to.be.eql({
                    "method": "length",
                    "column": "name",
                    "value" : "tarou"
                });
            });

            it('pushed errors success', function () {
                expect(result.errors).to.be.eql(
                    [
                        {
                            "method": "length",
                            "column": "name",
                            "value" : "tarou"
                        }
                    ]
                );
            });
        });

        describe('invalid rule column', function () {
            it('return false', function () {
                expect(result.set_error('not_exists', 'length', "tarou")).to.not.be.ok();
            });

            it('not pushed data', function () {
                expect(result.errors).to.be.eql(
                    [
                        {
                            "method": "length",
                            "column": "name",
                            "value" : "tarou" 
                        }
                    ]
                );
            });
        });
    });

    describe('result.has_error', function () {
        describe('not setted', function () {
            var result = new Heimdall.Result({
                "rules": { "name": ["required"] }
            });

            it('returned false', function () {
                expect(result.has_error()).to.not.be.ok();
            });
        });
        describe('setted', function () {
            var result = new Heimdall.Result({
                "rules": { "name": ["required"] }
            });

            result.set_error('name', 'required', undefined);

            it('returned true', function () {
                expect(result.has_error()).to.be.ok();
            });
        });
    });

    describe('result.get_errors', function () {
        describe('not setted', function () {
            var result = new Heimdall.Result({
                "rules": {
                    "name": ["required", ["length", [1, 10]]],
                    "nick": [            ["length", [0, 10]]],
                },
            });

            it('retuned null', function () {
                expect(result.get_errors()).to.be.eql(null);
            });
        });

        describe('1 row setted', function () {
            var result = new Heimdall.Result({
                "rules": {
                    "name": ["required", ["length", [1, 10]]],
                    "nick": [            ["length", [0, 10]]],
                },
            });

            result.set_error('name', 'required', undefined);

            it('returned array', function () {
                expect(result.get_errors()).to.be.a('array');
            });
            it('returnd errors', function () {
                expect(result.get_errors()).to.be.eql(
                    [
                        {
                            "method": 'required',
                            "column": 'name',
                            "value" : undefined
                        }
                    ]
                );
            });
        });

        describe('2 row setted', function () {
            var result = new Heimdall.Result({
                "rules": {
                    "name": ["required", ["length", [1, 10]]],
                    "nick": [            ["length", [0, 10]]],
                },
            });

            result.set_error('name', 'required', undefined);
            result.set_error('name', 'length', undefined);

            it('returned array', function () {
                expect(result.get_errors()).to.be.a('array');
            });
            it('returnd errors', function () {
                expect(result.get_errors()).to.be.eql(
                    [
                        {
                            "method": 'required',
                            "column": 'name',
                            "value" : undefined
                        },
                        {
                            "method": 'length',
                            "column": 'name',
                            "value" : undefined,
                        }
                    ]
                );
            });
        });
    });

    describe('result.get_error', function () {
        describe('not setted', function () {
            var result = new Heimdall.Result({
                "rules": {
                    "name": ["required", ["length", [1, 10]]],
                    "nick": [            ["length", [0, 10]]],
                },
            });

            it('retuned undefined', function () {
                expect(result.get_error('name', 'required')).to.be(null);
            });
        });

        describe('setted', function () {
            var result = new Heimdall.Result({
                "rules": {
                    "name": ["required", ["length", [1, 10]]],
                    "nick": [            ["length", [0, 10]]],
                },
            });

            result.set_error('name', 'required', undefined);
            result.set_error('nick', 'length', 'aaaaaaaaaaaaaaa');

            it('getted success', function () {
                expect(result.get_error('name', 'required')).to.be.eql({
                    "method": "required",
                    "column": "name",
                    "value" : undefined,
                });
            });

            it('getted falure', function () {
                expect(result.get_error('name', 'length')).to.be.eql(null);
            });
        });
    });
});
