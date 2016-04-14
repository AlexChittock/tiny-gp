'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seq = require('./seq');

var seed = function seed(size, seedOne) {
  return (0, _seq.range)(size).map(function () {
    return seedOne();
  });
};

var evaluate = function evaluate(pop, evaluator, sorter) {
  return pop.map(function (one) {
    return [one, evaluator(one)];
  }).sort(sorter);
};

var popify = function popify(popWithScores) {
  return popWithScores.map(function (one) {
    return one[0];
  });
};

var killOff = function killOff(popWithScores) {
  return popify((0, _seq.take)(popWithScores, Math.ceil(popWithScores.length / 2)));
};

var combine = function combine(pop, combiner) {
  return (0, _seq.range)(2).reduce(function (offspring) {
    return offspring.concat(pop.map(combiner));
  }, []);
};

var evolve = function evolve(pop, evolver) {
  return pop.map(function (one) {
    return evolver(one);
  });
};

var fitness = function fitness(pop, evaluator) {
  return evaluate(pop, function (one) {
    return evaluator(one);
  }, function (x, y) {
    return x[1] < y[1] ? -1 : 1;
  });
};

exports.default = function (seeder, evaluator, combiner, mutator) {
  var iterations = arguments.length <= 4 || arguments[4] === undefined ? 10 : arguments[4];
  var populationSize = arguments.length <= 5 || arguments[5] === undefined ? 1000 : arguments[5];
  var mutationChance = arguments.length <= 6 || arguments[6] === undefined ? 0.05 : arguments[6];

  return fitness((0, _seq.range)(iterations).reduce(function (pop, _, i) {
    return evolve(combine(killOff(fitness(pop, evaluator)), combiner), function (one) {
      return mutator(one, mutationChance);
    });
  }, seed(populationSize, function () {
    return seeder();
  })), evaluator);
};