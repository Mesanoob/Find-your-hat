/*  objective of the game is to create  a grid of ░ and O 
Player will use arrow keys to guide * to the ^ symbol.

We have to fisrt start by creating a grid field e.g

░░░0░░░0░░0░
░0░00░░░░0░0
░░░░00░░░░00
░░000░░░░░0
░░░░0░░0░░░
0░░░0░░0░00░
░░000░░░^░░░

after generating a field, we have to give it some values this values maybe passed in by player in parameter e.g

generateField(height, width, howManyholes) 

The hat has to also be placed randomly on the generated field. use Math.floor(Math.random()) to create random number without decimal
Hole also needs to be generated randomly. i guess can use the same ? 
But cann have entire screen with holes. so if the current field does not contain hat can have a hole .

*/
const prompt = require('prompt-sync')({ sigint: true })

// Define game chars400kwh
const hat = '^'
const hole = 'O'
const fieldCharacter = '░'
const pathCharacter = '*'

class Field {
  constructor(field = [[]]) {
    // start position
    this.field = field
    this.locationX = 0
    this.locationY = 0
    // Set position
    this.field[0][0] = pathCharacter
  }

  // Generate random field with given dimensions and percentage of holes
  static generateField(height, width, percentage = 0.1) {
    const field = Array.from({ length: height }, () =>
      Array(width).fill(fieldCharacter)
    )

    // Random hat
    const hatX = Math.floor(Math.random() * width)
    const hatY = Math.floor(Math.random() * height)
    field[hatY][hatX] = hat

    // Random hole %
    const totalTiles = height * width
    const totalHoles = Math.floor(totalTiles * (percentage / 100))

    // Random hole placement
    let holesPlaced = 0
    while (holesPlaced < totalHoles) {
      const holeX = Math.floor(Math.random() * width)
      const holeY = Math.floor(Math.random() * height)
      if (
        field[holeY][holeX] === fieldCharacter &&
        !(holeX === hatX && holeY === hatY)
      ) {
        field[holeY][holeX] = hole
        holesPlaced++
      }
    }

    return field
  }

  // Prompt play input and update input
  askQuestion() {
    const answer = prompt('Which way? (Use WASD keys to move): ').toUpperCase()
    switch (answer) {
      case 'W':
        this.locationY -= 1
        break
      case 'S':
        this.locationY += 1
        break
      case 'A':
        this.locationX -= 1
        break
      case 'D':
        this.locationX += 1
        break
      default:
        console.log('Use WASD keys to move.')
        this.askQuestion()
        break
    }
  }

  // Check if the player is within the bounds of the field
  isInBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    )
  }

  // Check if the player has found the hat
  isHat() {
    return this.field[this.locationY][this.locationX] === hat
  }

  // Check if the player has fallen into a hole
  isHole() {
    return this.field[this.locationY][this.locationX] === hole
  }

  // Print the current state of the field
  print() {
    const displayString = this.field.map((row) => row.join('')).join('\n')
    console.log(displayString)
  }

  // Run the game loop
  runGame() {
    while (true) {
      this.print()
      this.askQuestion()
      if (!this.isInBounds()) {
        console.log('Out of bounds instruction!')
        break
      } else if (this.isHole()) {
        console.log('Sorry, you fell down a hole!')
        break
      } else if (this.isHat()) {
        console.log('Congrats, you found your hat!')
        break
      }
      this.field[this.locationY][this.locationX] = pathCharacter
    }
  }
}

// Generate a random field and start the game
const myfield = new Field(Field.generateField(10, 10, 0.2))
myfield.runGame()
