describe 'Heimdall.Result', ->
  describe 'construction', ->
    result = new Heimdall.Result
      rules:
        name: ["required"]

    it 'it be Heimdall.Result object', ->
      expect(result).to.be.an Heimdal.Result

  describe 'result.exists_column', ->
    result = new Heimdall.Result
      rules:
        name: ["required"]

    it 'true if exists in rules', ->
      expect(result.exists_column 'name').to.be.ok()
    it 'false if not exists in rules', ->
      expect(result.exists_column 'not_exists').to.not.be.ok()

  describe 'result.set_error', ->
    result = new Heimdall.Result
      rules:
        name: [["length", [1, 10]]]
    
    describe 'valid rule column', ->
      it 'return an object', ->
        expect(result.set_error 'length', 'name', 'tarou').to.be.eql
          method: 'length'
          column: 'name'
          value:  'tarou'
      it 'pushed error success', ->
        expect(result.errors).to.be.eql [
          {
            method: 'length'
            column: 'name'
            value:  'tarou'
          }
        ]

    describe 'invalid rule column', ->
      it 'return false', ->
        expect(result.set_error 'length', 'not_exists', 'tarou').to.not.be.ok()

      it 'not pushed data', ->
        expect(result.errors).to.be.eql [
          {
            method: 'length'
            column: 'name'
            value : 'tarou'
          }
        ]

  describe 'result.has_error', ->
    describe 'not setted', ->
      result = new Heimdall.Result
        rules:
          name: ["required"]

      it 'returned false', ->
        expect(result.has_error()).to.not.be.ok()

    describe 'setted', ->
      result = new Heimdall.Result
        rules:
          name: ["required"]
      result.set_error 'required', 'name', undefined

      it 'returned true', ->
        expect(result.has_error()).to.be.ok()

  describe 'result.get_errors', ->
    describe 'not setted', ->
      result = new Heimdall.Result
        rules:
          name: ["required", ["length", [1, 10]]]
          nick: [            ["length", [0, 10]]]

      it 'returned null', ->
        expect(result.get_errors()).to.be.eql null

    describe 'one rows setted', ->
      result = new Heimdall.Result
        rules:
          name: ["required", ["length", [1, 10]]]
          nick: [            ["length", [0, 10]]]
      result.set_error 'required', 'name', undefined

      it 'returned array', ->
        expect(result.get_errors()).to.be.a('array')
      it 'returned errors', ->
        expect(result.get_errors()).to.be.eql [
          {
            method: 'required'
            column: 'name'
            value:  undefined
          }
        ]

    describe 'tow rows setted', ->
      result = new Heimdall.Result
        rules:
          name: ["required", ["length", [1, 10]]]
          nick: [            ["length", [0, 5]]]
      result.set_error 'required', 'name', undefined
      result.set_error 'length',   'name', 'tarou yamada'

      it 'returned array', ->
        expect(result.get_errors()).to.be.a('array')
      it 'retuned errors', ->
        expect(result.get_errors()).to.be.eql [
          {
            method: 'required'
            column: 'name'
            value:  undefined
          }
          {
            method: 'length'
            column: 'name'
            value:  'tarou yamada'
          }
        ]
  describe 'result.get_error', ->
    describe 'not setted', ->
      result = new Heimdall.Result
        rules:
          name: ["required", ["length", [1, 10]]]
          nick: [            ["length", [0, 5]]]
      
      it 'returned undefined', ->
        expect(result.get_error 'name', 'required').to,be.eql null

    describe 'setted', ->
      result = new Heimdall.Result
        rules:
          name: ["required", ["length", [1, 10]]]
          nick: [            ["length", [0, 10]]]
      result.set_error 'required', 'name', undefined
      result.set_error 'length',   'nick', 'hello world'

      it 'getted success', ->
        expect(result.get_error 'name', 'required').to.be.eql
          method: 'required'
          column: 'name'
          value:  undefined
      it 'getted failure', ->
        expect(result.get_error 'name', 'length').to.be.eql null
