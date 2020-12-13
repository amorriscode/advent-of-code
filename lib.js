export function product(arr) {
  return arr.reduce((a, b) => a * b)
}

// Modular multiplicative inverse
// https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
// x where `ax % m == 1`
export function bigIntModMulInverse(a, m) {
  let b = a % m

  for (let i = 1n; i < m; ++i) {
    if ((b * i) % m == 1n) {
      return i
    }
  }

  return 1n
}

// Chinese remainder theorem
// https://en.wikipedia.org/wiki/Chinese_remainder_theorem
// x where `x % Ni == Ai` for all i
export function bigIntChineseRemainder(A, N) {
  let prod = product(N)
  let p
  let sum = 0n

  for (let i = 0; i < A.length; ++i) {
    p = prod / N[i]
    sum += A[i] * p * bigIntModMulInverse(p, N[i])
  }

  return sum % prod
}

export function modulo(x, m) {
  while (x < 0) x += m
  return x % m
}
