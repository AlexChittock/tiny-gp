export const range = (size, arr) => size > 0 ? range(size - 1, [size - 1].concat(arr || [])) : arr
export const take = (seq, count) => seq.slice(0, count)
export const map = (seq, fn) => seq.map(fn)
export const reduce = (seq, fn, init) => seq.reduce(fn, init)
