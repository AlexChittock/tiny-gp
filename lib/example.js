'use strict';

var _gp = require('./gp');

var _gp2 = _interopRequireDefault(_gp);

var _seq = require('./seq');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var randomElem = function randomElem(arr) {
  return arr[Math.floor(arr.length * Math.random())];
};

// seedVector(4, [1,1,1,1]) = [0,1,1,0]
var seedVector = function seedVector(terms, dimensions) {
  return (0, _seq.range)(terms).map(function (_, i) {
    return Math.round(Math.random() * dimensions[i]);
  });
};

var evaluator = function evaluator(one, equations, truth) {
  return equations.map(function (eq) {
    return eq.apply(undefined, _toConsumableArray(one));
  }).reduce(function (score, res, i) {
    return score + Math.abs(truth[i] - res);
  }, 0);
};

var combiner = function combiner(one, i, arr) {
  return one.map(function (v, j) {
    return Math.random() < 0.5 ? v : arr[Math.floor(Math.random() * arr.length)][j];
  });
};

var evolver = function evolver(one, chance) {
  return one.map(function (v) {
    return Math.random() <= chance ? Math.round(randomElem([function (i) {
      return i + Math.random() * 5;
    }, function (i) {
      return i - Math.random() * 5;
    }, function (i) {
      return i * Math.random() * 5;
    }, function (i) {
      return i / Math.random() * 5;
    }])(v)) : v;
  });
};

var fitness = function fitness(pop, evaluator) {
  return evaluate(pop, function (one) {
    return evaluator(one, equations, truth);
  }, function (x, y) {
    return x[1] < y[1] ? -1 : 1;
  });
};

var report = function report(pop, iteration) {
  console.log(iteration + ': ', fitness(pop)[0]);
  return pop;
};

var result = (0, _gp2.default)(function () {
  return seedVector(4, (0, _seq.range)(4).map(function () {
    return 100;
  }));
}, function (one) {
  return evaluator(one, [function (a, b, c, d) {
    return a * b;
  }, function (a, b, c, d) {
    return a;
  }, function (a, b, c, d) {
    return c + d;
  }, function (a, b, c, d) {
    return a * b + c * d;
  }], [2, 1, 7, 14]);
}, combiner, evolver);

console.log((0, _seq.take)(result, 5).map(function (one) {
  return one[0];
}));