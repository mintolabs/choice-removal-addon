/*
Convert google script server calls to more
familiar js/promise-based functions.
*/

const serverMethods = {}

// skip the reserved methods
const ignoredMethods = ['withFailureHandler', 'withLogger', 'withSuccessHandler', 'withUserObject']

// eslint-disable-next-line no-restricted-syntax
for (const method in google.script.run) {
  if (!ignoredMethods.includes(method)) {
    serverMethods[method] = (...args) =>
      new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler(resolve)
          .withFailureHandler(reject)
          [method](...args)
      })
  }
}

export default serverMethods
