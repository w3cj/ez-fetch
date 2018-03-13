require('es6-promise').polyfill();
require('isomorphic-fetch');

function makeRequest(method, url, body, options) {
  options.method = method;
  options.body = body;
  updateOptions(options);
  return fetch(url, options)
    .then(handleResponse);
}

function handleResponse(response) {
  const handleBody = data => {
    return {
      response,
      data
    };
  };

  let promise = null;

  const contentType = response.headers.get('content-type');
  if (contentType.startsWith('application/json')) {
    promise = response.json().then(handleBody);
  } else if (contentType.startsWith('text')) {
    promise = response.text().then(handleBody);
  } else {
    promise = response.clone().json().then(handleBody).catch(() => {
      return response.text().then(handleBody);
    });
  }

  return promise.then(({response, data}) => {
    if(response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

function updateOptions(options) {
  if (options.body != null && typeof options.body == 'object') {
    options.body = JSON.stringify(options.body);
    options.headers = options.headers || {};
    options.headers['content-type'] = 'application/json';
  }
}

const methods = ['post', 'delete', 'put', 'patch'].reduce((all, verb) => {
  all[verb] = function(url, body, options = {}) {
    return makeRequest(verb, url, body, options);
  };
  return all;
}, {});

methods.get = function(url, options = {}) {
  return makeRequest('get', url, null, options);
};

module.exports = methods;
