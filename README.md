# ez-fetch

A fetch wrapper to simplify network requests.

* Includes `es6-promise`, `isomorphic-fetch` for use in older browsers and for use in a node.js environment
* Inspects `content-type` header to parse response correctly
* Throws an error (`catch`) if the response is not OK
* Stringifies JSON and sets `content-type` header

# Examples

```js
const ezFetch = require('ez-fetch');

// GET
ezFetch
  .get('https://example.com')
  .then(body => {
    console.log(body);
  }).catch(error => {
    console.error(error);
  });

// POST, PATCH, PUT, DELETE
// url, body, fetchOptions
ezFetch
  .post('https://example.com/create', {
    title: 'Hello World'
  }, {
    headers: {
      Authorization: 'Bearer 12345'
    }
  }).then(result => {
    console.log(result);
  }).catch(error => {
    console.error(error);
  });
```
