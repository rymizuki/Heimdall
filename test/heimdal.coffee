describe 'Heimdal', ->
  describe 'new Heimdall', ->
    it 'create a new instance', ->
      expect(new Heimdall {}).to.be.an(Heimdall)
    it 'constraints is undefined', ->
      heimdall = new Heimdall {}
      expect(heimdall.constraints).to.be.eql undefined
    it 'rules exists', ->
      heimdall = new Heimdall
        name: ["required"]
      expect(heimdall.rules).to.be.eql
        name: ["required"]
    it 'columns exists', ->
      heimdal = new Heimdall
        name: ["required"]
      expect(heimdall.columns).to.be.eql ["name"]

  describe 'heimdall.load_constraint', ->
    describe 'by default', ->
      heimdall = new Heimdall {}
      it 'undefined', ->
        expect(heimdall.constraints).to.not.be.ok()
    describe 'load function object', ->
      heimdall = new Heimdall {}
      const_mock =
        mock: (-> return true)
      it 'success', ->
        expect(heimdall.load_constraint const_mock).to.be.ok()
      it 'exists func', ->
        expect(heimdall.load_constraint.mock).to.be.a 'function'
    describe 'can override', ->
      heimdall = new Heimdall {}
      heimdall.load_constraint mock: 'aaaa'
      heimdall.load_constraint mock: 'bbbb'

      it 'can do', ->
        expect(heimdal.constraints).to.be.eql mock: "bbbb"

  describe 'heimdall.create_result', ->
    heimdall = new Heimdall
      name: ["required"]

    it 'returned Result instance', ->
      expect(heimdall.create_result()).to.be.an Heimdall.Result

  describe 'heimdall.validate', ->
    describe 'is valid data if returned result object', ->
      heimdall = new Heimdall
        name: ["required"]
      result = heimdal.validate
        name: "tarou"

      it 'result is a object of Heimdall.Result', ->
        expect(result).to.be.an(Heimdall.Result)
      it 'result has not error', ->
        expect(result.has_error()).to.not.be.ok()
      it 'result.get_errors returns null', ->
        expect(result.get_errors()).to.be.eql null

    describe 'is not valid data', ->
      heimdall = new Heimdall
        name: ["required"]
      result = heimdall.validate
        name: null
      
      it 'result is a object of Heimdal.Result', ->
        expect(result).to.be.an(Heimdall.Result)
      it 'result.has_error returned ture', ->
        expect(result.has_error()).to.be.ok()
      it 'result.get_errors returnes array', ->
        expect(result.get_errors()).to.be.a 'array'
      it 'result.get_error returnes', ->
        expect(result.get_error 'name',  'required').to.be.a 'object'
