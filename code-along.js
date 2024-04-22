const prompt = require('prompt-sync')({ sigint: true })

const hat = '^'
const hole = 'O'
const fieldCharacter = '░'
const pathCharacter = '*'

// Set constants to ask the player for inputs on the number of tiles for the game (width and height)
const _MINWIDTH = 50
const _MINHEIGHT = 100
const _WIDTHPROMPT = 'Enter the No. of tiles for the width'
const _HEIGHTPROMPT = 'Enter the no of tiles for the height'
const _INVALID = 'Please enter a valid number'

class Field {
  static gameDimensions() {
    const width = this.setDimensions(_WIDTHPROMPT)
    const height = this.setDimensions(_HEIGHTPROMPT)

    return { width, height }
  }
  static setDimensions(prompter) {
    let dimensionStatus = false
    let dimension = 0

    while (!dimensionStatus) {
      dimension = prompt(prompter)
      if (isNaN(dimension) || dimension < 5 || dimension > 100) {
        console.log(_INVALID)
      } else {
        dimensionStatus = true
      }
    }
    return dimension
  }

  static printDimension(prompter, dimension) {
    prompter === _WIDTHPROMPT
      ? console.log(`Width set: ${dimension} \n`)
      : console.log(`Height set: ${dimension} \n`)
  }

  static createField(width, height) {
    const field = new Array(height).fill('').map((element) => new Array(width))
    let limit = Math.round((Math.random() * 0.1 + 0.1) * 10) / 10
    // for each unit in y (column)
    for (let y = 0; y < height; y++) {
      //for each unit in x (row), setting up the tiles
      for (let x = 0; x < width; x++) {
        const ceiling = Math.round(Math.random * 10) / 10
        field[y][x] = limit < ceiling ? fieldCharacter : hole
      }
    }
    return field
  }
}

console.clear()

console.log('FIND YOUR HAT!!!!!')

const gameDimension = Field.gameDimensions()

const createField = Field.createField(
  Number(gameDimension.width),
  Number(gameDimension.height)
)

console.log(gameDimension)
// create a 2d-array of the game's field using gameDimensions width and height

console.log(gameDimension)
