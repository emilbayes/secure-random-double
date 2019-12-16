const write = new Uint8Array(8)
const read = new Float64Array(write.buffer)
function gen (frac) {
  const sign = 0b0
  const exp = 0b11110011001

  const lower = frac / 0x100000000

  write[0] = frac & 0xff // 8
  write[1] = (frac & 0xff00) >> 8 // 16
  write[2] = (frac & 0xff0000) >> 16// 24
  write[3] = (frac & 0xff000000) >> 24 // 32
  write[4] = lower & 0xff // 40
  write[5] = (lower & 0xff00) >> 8 // 48
  write[6] = ((exp & 0b00000001111) << 4) | (lower & 0b000011111000000000000000) >> 16 // 53
  write[7] = (sign << 7) | (exp & 0b11111110000) >>> 4

  return read[0]
}

var min = gen(0b0000000000000000000000000000000000000000000000000001) - 1
print(min)
var min1 = gen(0b0000000000000000000000000000000000000000000000000010)
print(min1)
var half = gen(0b1000000000000000000000000000000000000000000000000000)
print(half)
var max1 = gen(0b0111111111111111111111111111111111111111111111111111)
print(max1)
var max = gen(0b1111111111111111111111111111111111111111111111111111)
print(max)

function print (float) {
  read[0] = float

  console.log(byte(write[7]) +
    byte(write[6]) +
    byte(write[5]) +
    byte(write[4]) +
    byte(write[3]) +
    byte(write[2]) +
    byte(write[1]) +
    byte(write[0])
  )
  console.log('s' + '⎣ exponent⎦' + '⎣                    fraction                      ⎦')
}

function sign (float) {
  read[0] = float
  return (write[7] >>> 7) & 0b1
}

function exp (float) {
  read[0] = float
  return (write[7] & 0b01111111) << 4 | (write[6] & 0b11110000) >>> 4
}

function frac (float) {
  read[0] = float

  return (
    (write[0] | write[1] << 8 | write[2] << 16 | write[3] << 24) +
    (write[4] | write[5] << 8 | (write[6] & 0b00001111) << 16) * 0x100000000
  )
}

function byte (b) {
  return b.toString(2).padStart(8, '0')
}
