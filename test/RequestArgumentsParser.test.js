
var assert = require('assert')
var RequestArgumentsParser = require('../RequestArgumentsParser.js')


describe('RequestArgumentsParser', function() {


  it('route', function() {
    var req = {
      params: {
        foo: 'bar'
      },
      param: function(name) {
        return this.params[name]
      }
    }

    var parser = new RequestArgumentsParser(req)
    assert.equal('bar', parser.argument('foo'))

  })

  it('body', function() {
    var req = {
      body: {
        foo: 'bar'
      },
      param: function() {
        // noop
      }
    }

    var parser = new RequestArgumentsParser(req)
    assert.equal('bar', parser.argument('foo'))

  })

  it('url', function() {
    var req = {
      query: {
        foo: 'bar'
      },
      param: function() {
        // noop
      }
    }

    var parser = new RequestArgumentsParser(req)
    assert.equal('bar', parser.argument('foo'))

  })

  it('route > body', function() {
    var req = {
      params: {
        foo: 'route'
      },
      param: function(name) {
        return this.params[name]
      },
      body: {
        foo: 'body'
      }
    }

    var parser = new RequestArgumentsParser(req)
    assert.equal('route', parser.argument('foo'))

  })

  it('route > url', function() {
    var req = {
      params: {
        foo: 'route'
      },
      param: function(name) {
        return this.params[name]
      },
      query: {
        foo: 'url'
      }
    }

    var parser = new RequestArgumentsParser(req)
    assert.equal('route', parser.argument('foo'))

  })

  it('body > url', function() {
    var req = {
      body: {
        foo: 'body'
      },
      param: function(name) {
        // noop
      },
      query: {
        foo: 'url'
      }
    }

    var parser = new RequestArgumentsParser(req)
    assert.equal('body', parser.argument('foo'))

  })

  it('deep body', function() {
    var req = {
      body: {
        foo: {
          bar: 'body'
        }
      },
      param: function(name) {
        // noop
      }
    }

    var parser = new RequestArgumentsParser(req)
    assert.equal('body', parser.argument('foo.bar'))

  })

  it('param function on request is optional', function() {
    var req = {
      body: {
        foo: {
          bar: 'body'
        }
      }
    }

    var parser = new RequestArgumentsParser(req)
    assert.equal('body', parser.argument('foo.bar'))

  })

  it('fallback to "params" if "param()" is absent', function() {
    var req = {
      params: {
        foo: {
          bar: 'route'
        }
      }
    }

    var parser = new RequestArgumentsParser(req)
    assert.equal('route', parser.argument('foo.bar'))

  })


})
