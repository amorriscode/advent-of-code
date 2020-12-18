import input from './input'

const data = input.split('\n')

const evaluate = (expression) => {
  let result = 0
  let operator = '+'

  expression.split(' ').forEach((val) => {
    if (val === '+' || val === '*') {
      operator = val
    } else if (operator === '+') {
      result += parseInt(val)
    } else if (operator === '*') {
      result *= parseInt(val)
    }
  })

  return result
}

const solve = (expression, additionFirst = false) => {
  while (
    expression.includes('(') ||
    (additionFirst &&
      ['+', '*'].every((operator) => expression.includes(operator)))
  ) {
    if (additionFirst) {
      
      expression = expression.replace(/(\d+ \+ )+\d+/g, (subExpression) =>
        evaluate(subExpression)
      )
    }

    expression = expression.replace(/\(([^()]*)\)/g, (_, subExpression) =>
      evaluate(subExpression)
    )
  }

  return evaluate(expression)
}

const part1 = () => {
  return data.map((expression) => solve(expression)).reduce((a, b) => a + b)
}

const part2 = () => {
  return data
    .map((expression) => solve(expression, true))
    .reduce((a, b) => a + b)
}

export default {
  part1,
  part2,
}
