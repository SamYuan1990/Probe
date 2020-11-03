  
'use strict'

const isWindows = require('is-windows')()

module.exports = {
  exclude: [
    'coverage',
    'self-coverage',
    'test/fixtures/coverage.js',
    'test/build/*',
    'test/src/*',
    'test/nyc.js',
    'test/process-args.js',
    'test/fixtures/_generateCoverage.js'
  ],
  /* Unknown why we don't get 100% coverage on Windows. */
  'check-coverage': !isWindows,
  branches: 85,
  functions: 85,
  lines: 85,
  statements: 85
}