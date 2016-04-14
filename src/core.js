import {range, take} from './seq'

const seed = (size, seedOne) => range(size).map(() => seedOne())

const evaluate = (pop, evaluator, sorter) => pop.map(one => [one, evaluator(one)]).sort(sorter)

const popify = popWithScores => popWithScores.map(one => one[0])

const killOff = popWithScores => popify(take(popWithScores, Math.ceil(popWithScores.length / 2)))

const combine = (pop, combiner) => range(2).reduce((offspring) => offspring.concat(pop.map(combiner)), [])

const evolve = (pop, evolver) => pop.map(one => evolver(one))

const fitness = (pop, evaluator) => evaluate(pop, one => evaluator(one), (x, y) => x[1] < y[1] ? -1 : 1)

export default (seeder, evaluator, combiner, mutator, iterations = 10, populationSize = 1000, mutationChance = 0.05) => {
  return fitness(range(iterations).reduce((pop, _, i) => evolve(combine(killOff(fitness(pop, evaluator)), combiner), (one) => mutator(one, mutationChance)), seed(populationSize, () => seeder())), evaluator)
}
