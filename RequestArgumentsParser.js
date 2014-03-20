
var ObjectTree = require('object-tree')
var _ = require('underscore')


function RequestArgumentsParser(request) {
  this._request = request

  this._objectParser = new ObjectTree()
}

RequestArgumentsParser.prototype.argument = function(name) {
  if(this._request) {

    var arg = this._getRouteArg(this._request, name)
    if(arg === undefined) {
      arg = this._getBodyArg(this._request, name)
    }
    if(arg === undefined) {
      arg = this._getUrlArg(this._request, name)
    }
    return arg
  }
}

RequestArgumentsParser.prototype._getRouteArg = function(req, name) {
  if(req.params) {
    return this._objectParser.lookup(name, req.params)
  } else if(_.isFunction(req.param)) {
    return req.param(name)
  }
}

RequestArgumentsParser.prototype._getBodyArg = function(req, name) {
  if(req.body) {
    return this._objectParser.lookup(name, req.body)
  }
}

RequestArgumentsParser.prototype._getUrlArg = function(req, name) {
  if(req.query) {
    return this._objectParser.lookup(name, req.query)
  }
}

module.exports = RequestArgumentsParser
