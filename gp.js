// Domain

const range = (size, arr) => size > 0 ? range(size - 1, [size - 1].concat(arr || [])) : arr

const seed = (size, seedOne) => range(size).map(() => seedOne())

const evaluate = (pop, evaluator, sorter) => pop.map(one => [one, evaluator(one)]).sort(sorter)

const popify = popWithScores => popWithScores.map(one => one[0])

const killOff = popWithScores => popify(popWithScores.slice(0, Math.ceil(popWithScores.length / 2)))

// const combine = (popWithScores, combiner) => ((popWithScores, midPoint) => popify(popWithScores.filter(curr => curr[1] < midPoint)).map(combiner))(popWithScores, popWithScores.reduce((sum, curr) => sum + curr[1], 0) / 2)

const combine = (pop, combiner) => range(2).reduce((offspring) => offspring.concat(pop.map(combiner)), [])

const evolve = (pop, evolver) => pop.map(one => evolver(one))


// Business

const equations = [
  (a,b,c,d) => a * b,
  (a,b,c,d) => a,
  (a,b,c,d) => c + d,
  (a,b,c,d) => a * b + c * d,
];

// a = 1, b = 2, c = 3, d = 4
const truth = [
  2,
  1,
  7,
  14
];

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

const fitness = (pop) => evaluate(pop, one => evaluator(one, equations, truth), (x, y) => x[1] < y[1] ? -1 : 1)

const report = (pop, iteration) => {
  console.log(iteration + ': ', fitness(pop)[0])
  return pop
}

fitness(range(10).reduce((pop, _, i) => report(evolve(combine(killOff(fitness(pop)), combiner), (one) => evolver(one, 0.05)), i), seed(1000, () => seedVector(4, range(4).map(() => 100))))).slice(0,5)
