"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var range = exports.range = function range(size, arr) {
  return size > 0 ? range(size - 1, [size - 1].concat(arr || [])) : arr;
};
var take = exports.take = function take(seq, count) {
  return seq.slice(0, count);
};
var map = exports.map = function map(seq, fn) {
  return seq.map(fn);
};
var reduce = exports.reduce = function reduce(seq, fn, init) {
  return seq.reduce(fn, init);
};