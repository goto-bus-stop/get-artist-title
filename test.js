var fs = require('fs')
var chalk = require('chalk')
var success = require('success-symbol')
var error = require('error-symbol')
var warning = require('warning-symbol')
var args = require('minimist')(process.argv.slice(2))

var getSongArtistTitle = require('./')

function stringifyTitle (o) {
  return o ? '"' + o[0] + '" - "' + o[1] + '"' : 'nothing'
}

function testFailed (test, result) {
  console.error(chalk.red('   ' + error + ' expected ' + stringifyTitle(test.expected)))
  console.error(chalk.red('     but got  ' + stringifyTitle(result)))
}
function optionalTestFailed (test, result) {
  console.error(chalk.yellow('   ' + warning + ' expected ' + stringifyTitle(test.expected)))
  console.error(chalk.yellow('     but got  ' + stringifyTitle(result)))
}
function testSucceeded (test, result) {
  console.log(chalk.green('   ' + success + ' got ' + stringifyTitle(result)))
}

function runTest (plugins, test) {
  console.log('  ' + test.input)
  var result = getSongArtistTitle(test.input, plugins)
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
    .map(runTest.bind(null, suite.plugins))
    .forEach(function (result) {
      score[result]++
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

var suites = fs.readdirSync('test').filter(function (name) {
  return /\.js$/.test(name)
})

if (args.grep) {
  suites = suites.filter(function (name) {
    return name.indexOf(args.grep) !== -1
  })
}

var total = { fail: 0, optionalFail: 0, success: 0 }
suites.forEach(function (suiteName) {
  var suite = readSuite(suiteName)

  var title = suiteName.replace(/\.txt$/, '')
  console.log(title)
  console.log(title.replace(/./g, '-'))

  var result = runSuite(suite)
  console.log(
    chalk.red(' ' + error + ' ' + result.fail) + '  ' +
    chalk.yellow(' ' + warning + ' ' + result.optionalFail) + ' ' +
    chalk.green(' ' + success + ' ' + result.success)
  )
  total.fail += result.fail
  total.optionalFail += result.optionalFail
  total.success += result.success
})

console.log('')
console.log('summary')
console.log('-------')
console.log(
  chalk.red(' ' + error + ' ' + total.fail) + '  ' +
  chalk.yellow(' ' + warning + ' ' + total.optionalFail) + ' ' +
  chalk.green(' ' + success + ' ' + total.success)
)

if (total.fail > 0) {
  process.exit(1)
}
