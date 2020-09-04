
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./create-pull-request.cjs.production.min.js')
} else {
  module.exports = require('./create-pull-request.cjs.development.js')
}
