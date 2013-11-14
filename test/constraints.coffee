describe 'Heimdall.CONSTRAINT', ->
    desribe 'DEFAULTS', ->
        describe 'required', ->
            required = Heimdall.CONSTRAINT.DEFAULTS.required

            it 'undefined is false', ->
                expect(required()).to.be.sql false
            it 'null is false', ->
                expect(required null).to.be.sql false
            it '"hello" is true', ->
                expect(required "hello").to.be.sql true

        describe 'length', ->
            len = Heimdall.CONSTRAINT.DEFAULTS.length

            it '"hello" is true on 0 to 10 or less', ->
                expect(len "hello", 0, 10).to.be.eql true
            it '"hello" is true on 0 to  3 or less', ->
                expect(len "hello", 0,  5).to.be.eql true
            it '"hello" is true on 1 to  3 or less', ->
                expect(len "hello", 1,  5).to.be.eql true
            it '"hello" is false on 0 on 4 or less', ->
                expect(len "hello", 0,  4).to.be.eql false
            it '"" is tur on 0 to 3 or less', ->
                expect(len "", 0, 3).to.be.eql true
            it '"" is false on 1 to 3 or less', ->
                expect(len "", 1, 3).to.be.eql false

        describe 'select', ->
            select = Heimdall.CONSTRAINT.DEFAULTS.select

            it 'a is true', ->
                expect(select 'a', ['a', 'b', 'c']).to.be.eql true
            it 'd is not  within a b c', ->
                expect(select 'd', ['a', 'b', 'c']).to.be.eql false
