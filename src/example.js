import gp from './gp'
import {range, take} from './seq'

const randomElem = (arr) => arr[Math.floor(arr.length * Math.random())]

// seedVector(4, [1,1,1,1]) = [0,1,1,0]
const seedVector = (terms, dimensions) => range(terms).map((_, i) => Math.round(Math.random() * dimensions[i]))

const evaluator = (one, equations, truth) => equations.map(eq => eq(...one)).reduce((score, res, i) => score + Math.abs(truth[i] - res), 0)

const combiner = (one, i, arr) => one.map((v, j) => Math.random() < 0.5 ? v : arr[Math.floor(Math.random() * arr.length)][j])

const evolver = (one, chance) => one.map((v) => Math.random() <= chance ? Math.round(randomElem([
  (i) => i + Math.random() * 5,
  (i) => i - Math.random() * 5,
  (i) => i * Math.random() * 5,
  (i) => i / Math.random() * 5
])(v)) : v)

const fitness = (pop, evaluator) => evaluate(pop, one => evaluator(one, equations, truth), (x, y) => x[1] < y[1] ? -1 : 1)

const report = (pop, iteration) => {
  console.log(iteration + ': ', fitness(pop)[0])
  return pop
}

const result = gp(
  () => seedVector(4, range(4).map(() => 100)),
  (one) => evaluator(one, [
    (a,b,c,d) => a * b,
    (a,b,c,d) => a,
    (a,b,c,d) => c + d,
    (a,b,c,d) => a * b + c * d,
  ], [2,1,7,14]),
  combiner,
  evolver
)

console.log(take(result, 5).map(one => one[0]))
