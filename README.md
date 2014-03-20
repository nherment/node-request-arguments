
Parses a HTTP request argument, regardless of whether it is a GET, POST form, JSON or route parameter.

Currently only work with express requests.

If an argument key is on passed multiple times (ie: GET /api/<service1>?service=<service2>) only one is return. The
following hierarchy is respected (the first encounter wins)

1. route ==> /api/:variable
2. body ==> {"variable": [..]}
3. get param ==> /api?variable=[..]

You have to prepare the request with the connect.bodyParser, json or/and urlencoding middleware.

