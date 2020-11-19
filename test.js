/* eslint-disable no-var */
'use strict'

var fs = require('fs')
var chalk = require('chalk')
var args = require('minimist')(process.argv.slice(2))

var getArtistTitle = require('./')

function stringifyTitle (o) {
  return o ? '"' + o[0] + '" - "' + o[1] + '"' : 'nothing'
}

function testFailed (test, result) {
  console.error(chalk.red('   ✖ expected ' + stringifyTitle(test.expected)))
  console.error(chalk.red('     but got  ' + stringifyTitle(result)))
}
function optionalTestFailed (test, result) {
  console.error(chalk.yellow('   ⚠ expected ' + stringifyTitle(test.expected)))
  console.error(chalk.yellow('     but got  ' + stringifyTitle(result)))
}
function testSucceeded (test, result) {
  console.log(chalk.green('   ✔ got ' + stringifyTitle(result)))
}

function runTest (options, test) {
  console.log('  ' + test.input)
  var result = getArtistTitle(test.input, options)
  if (!result || result[0] !== test.expected[0] || result[1] !== test.expected[1]) {
    if (test.optional && !args.strict) {
      optionalTestFailed(test, result)
      return 'optionalFail'
    } else {
      testFailed(test, result)
      return 'fail'
    }
  }
  testSucceeded(test, result)
  return 'success'
}

function runSuite (suite) {
  var score = { fail: 0, optionalFail: 0, success: 0 }
  suite.tests
    .map(runTest.bind(null, suite.options || {}))
    .forEach(function (result) {
      score[result]++
    })
  return score
}

function readSuite (suiteName) {
  var suite = require('./test/' + suiteName)
  return {
    name: suiteName,
    options: suite.options,
    tests: suite.tests
  }
}

function getMaxLength (strs) {
  return strs.reduce(function (max, str) {
    return max > str.length ? max : str.length
  }, 0)
}

function padTo (str, len, ch) {
  while (str.length < len) str += ch || ' '
  return str
}

var suites = fs.readdirSync('test').filter(function (name) {
  return /\.js$/.test(name)
})

if (args.grep) {
  suites = suites.filter(function (name) {
    return name.indexOf(args.grep) !== -1
  })
}

var total = { fail: 0, optionalFail: 0, success: 0 }
var results = suites.map(function (suiteName) {
  var suite = readSuite(suiteName)

  var title = suiteName.replace(/\.js$/, '')
  console.log(title)
  console.log(title.replace(/./g, '-'))

  var result = runSuite(suite)
  console.log(
    chalk.red(' ✖ ' + result.fail) + '  ' +
    chalk.yellow(' ⚠ ' + result.optionalFail) + ' ' +
    chalk.green(' ✔ ' + result.success)
  )

  total.fail += result.fail
  total.optionalFail += result.optionalFail
  total.success += result.success

  result.name = title
  return result
})

console.log('')
console.log('summary')
console.log('-------')

var maxL = getMaxLength(results.map(function (r) {
  return r.name
}))
results.forEach(function (result) {
  console.log(
    padTo(result.name, maxL) + ' | ' +
    chalk.red(' ✖ ' + padTo('' + result.fail, 3)) + '  ' +
    chalk.yellow(' ⚠ ' + padTo('' + result.optionalFail, 3)) + ' ' +
    chalk.green(' ✔ ' + padTo('' + result.success, 3))
  )
})

console.log('-------')
console.log(
  padTo('', maxL + 2),
  chalk.red(' ✖ ' + padTo('' + total.fail, 3)) + '  ' +
  chalk.yellow(' ⚠ ' + padTo('' + total.optionalFail, 3)) + ' ' +
  chalk.green(' ✔ ' + padTo('' + total.success, 3))
)

if (total.fail > 0) {
  process.exit(1)
}
