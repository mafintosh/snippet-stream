var snippets = require('./')

// create a snippet stream
var stream = snippets()

// write some js to it
stream.write('var a = 1\n')
stream.write('function foo () {\n')
stream.write(' return a + 1\n')
stream.write('}\n')
stream.write('foo()')
stream.end()

stream.on('data', function (data) {
  console.log('snippet:')
  console.log(data)
})
