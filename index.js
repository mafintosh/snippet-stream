var through = require('through2')
var snippetify = require('snippetify')
var StringDecoder = require('string_decoder').StringDecoder

module.exports = function () {
  var buffer = ''
  var decoder = new StringDecoder()

  return through.obj(write, flush)

  function write (data, enc, cb) {
    buffer += decoder.write(data)

    try {
      var raws = snippetify(buffer).map(toRaw)
    } catch (err) {
      return cb()
    }

    var partials = 1
    while (raws.length - partials >= 0 && raws.length && !raws[raws.length - partials]) partials++

    for (var i = 0; i < raws.length - partials; i++) {
      buffer = buffer.slice(raws[i].length + 1) // +1 for newline
      this.push(raws[i] + '\n')
    }

    cb()
  }

  function flush (cb) {
    this.push(buffer)
    cb()
  }
}

function toRaw (item) {
  return item.raw
}
