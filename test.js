var fs = require('fs')
var chalk = require('chalk')
var success = require('success-symbol')
var error = require('error-symbol')

var getSongArtistTitle = require('./')

function stringifyTitle (o) {
  return o ? '"' + o[0] + '" - "' + o[1] + '"' : 'nothing'
}

function testFailed (test, result) {
  console.error(chalk.red('   ' + error + ' expected ' + stringifyTitle(test.expected)))
  console.error(chalk.red('     but got  ' + stringifyTitle(result)))
}
function testSucceeded (test, result) {
  console.log(chalk.green('   ' + success + ' got ' + stringifyTitle(result)))
}

function runTest (plugins, test) {
  console.log('  ' + test.input)
  var result = getSongArtistTitle(test.input, plugins)
  if (!result || result[0] !== test.expected[0] || result[1] !== test.expected[1]) {
    testFailed(test, result)
    return false
  }
  testSucceeded(test, result)
  return true
}

function runSuite (suite) {
  var score = { fail: 0, success: 0 }
  suite.tests
    .map(runTest.bind(null, suite.plugins))
    .forEach(function (success) {
      if (success) {
        score.success++
      } else {
        score.fail++
      }
    })
  return score
}

function readSuite (suiteName) {
  var suite = require('./test/' + suiteName)
  return {
    name: suiteName,
    plugins: suite.plugins,
    tests: suite.tests
  }
}

var suites = fs.readdirSync('test')
var total = { fail: 0, success: 0 }
suites.forEach(function (suiteName) {
  var suite = readSuite(suiteName)

  var title = suiteName.replace(/\.txt$/, '')
  console.log(title)
  console.log(title.replace(/./g, '-'))

  var result = runSuite(suite)
  console.log(
    chalk.red(' ' + error + ' ' + result.fail) + '  ' +
    chalk.green(' ' + success + ' ' + result.success)
  )
  total.fail += result.fail
  total.success += result.success
})

if (total.fail > 0) {
  process.exit(1)
}
