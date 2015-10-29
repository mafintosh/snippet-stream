# snippet-stream

Split a stream of JS source code into parsable snippets

```
npm install snippet-stream
```

[![build status](http://img.shields.io/travis/mafintosh/snippet-stream.svg?style=flat)](http://travis-ci.org/mafintosh/snippet-stream)

## Usage

``` js
var snippets = require('snippet-stream')

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
```

Running the above produces the following output

```
snippet:
var a = 1

snippet:
function foo () {
 return a + 1
}

snippet:
foo()
```

## License

MIT
