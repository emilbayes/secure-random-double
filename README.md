# `secure-random-double`

> Generate secure, random doubles that are unbiased and equidistant

This module generate doubles (`Number`) in the range `[0, 1)`, with all points
being equidistant and unbiased.

## Usage

```js
const double = require('secure-random-double')

const n = double()
```

## API

### `const n = double()`

Returns a `Number` (double-floating point) in the range `[0, 1)` from a CSPRNG.

### `const points = double.POINTS`

Number of representable points as a `BigInt`

### `const points = double.BASE`

The basis representation of `1` as a `BigInt`

### `const points = double.DISTANCE`

Distance between consecutive points as a `BigInt`

## Math

Random doubles are generated in the range `[1, 2)` and then `1` is subtracted to
generate numbers in `[0, 1)`. In this range all points are
`2.220446049250313080847263336181640625E-16` apart, with equal probability,
meaning no numbers are biased or have multiple representations.
There are `2^52 = 4503599627370496` points in the range, including 0.

Heres a list of fun points:

```
0%     0
0% + ε 0.0000000000000002220446049250313080847263336181640625
50%    0.5000000000000000000000000000000000000000000000000000
100%   0.9999999999999997779553950749686919152736663818359375
```

## Install

```sh
npm install secure-random-double
```

## License

[ISC](LICENSE)
