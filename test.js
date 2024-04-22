let arr = new Array(1, 2, 3)
console.log(arr)

let arr2 = new Array(3)
console.log(arr2)

for (let i = 0; i < arr2.length; i++) {
  arr2[i] = i + 1
}

console.log(arr2)

const width = 2
const height = 2

const field2d = new Array(height)
  .fill('0')
  .map((element) => new Array('░', '░'))
console.log(field2d)

for (let index = 0; index < height; index++) {
  console.log('index at ' + index + 'has an array of: ' + field2d[index])
}
