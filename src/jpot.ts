const rand = require('random-number-csprng')

// Generates n [min, .. max] unique numbers, sorted numerically
const gen = async (n: number, min: number, max: number) => {
  let l: number[] = []
  for (let i = 0; i < n; i++) {
    let num
    do {
      num = (await rand(min, max)) as number
    } while (l.indexOf(num) >= 0)
    l.push(num)
  }
  l = l.sort((a, b) => a - b)
  return l
}

const ejpot = async () => {
  return {
    main: await gen(5, 1, 50),
    secondary: await gen(2, 1, 10),
  }
}

export { gen, ejpot }
