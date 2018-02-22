# ez-fetch

A fetch wrapper to simplify network requests.

* Inspects `content-type` header to parse response correctly
* Throws an error (`catch`) if the response status code is not 200
* Stringifies JSON and sets `content-type` header
