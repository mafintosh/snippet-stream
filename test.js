var snippets = require('./')
var tape = require('tape')

tape('splits into snippets', function (t) {
  var s = snippets()

  s.write('var a = 1\n')
  s.write('function foo () {\n')
  s.write(' return a + 1\n')
  s.write('}\n')
  s.write('var b;')
  s.end()

  var expected = ['var a = 1\n', 'function foo () {\n return a + 1\n}\n', 'var b;']

  s.on('data', function (data) {
    t.same(data, expected.shift(), 'snippet match expected output')
  })

  s.on('end', function () {
    t.same(expected.length, 0, 'no more snippets')
    t.end()
  })
})
