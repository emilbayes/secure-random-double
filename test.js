/* global BigInt */
const double = require('.')
const assert = require('assert')

for (var i = 0; i < 10000; i++) {
  var a = BigInt(double().toFixed(52).replace('.', ''))
  var b = BigInt(double().toFixed(52).replace('.', ''))

  assert.ok(a / double.DISTANCE < double.POINTS)
  assert.ok(b / double.DISTANCE < double.POINTS)
  assert.ok(a % double.DISTANCE === 0n)
  assert.ok(b % double.DISTANCE === 0n)
  assert.ok((a - b) % double.DISTANCE === 0n)
}
