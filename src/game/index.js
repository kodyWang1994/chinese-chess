import Piece from './piece'

class Game {
  constructor () {
    console.log('constructor')
  }

  initGame () {
    console.log('init')
    const blankMap = this.getBlankMap()
    const redPieces = this.getRedPieces()
    const blackPieces = this.getBlackPieces()
    return {
      blankMap,
      redPieces,
      blackPieces
    }
  }

  getBlankMap = function () {
    const map = []

    for (let x = 1; x <= 9; x++) {
      for (let y = 10; y > 0; y--) {
        map.push(new Piece('', [y, x], 0))
      }
    }
    return map
  }

  getRedPieces = function () {
    return [
      new Piece('j1', [1, 1], 1),
      new Piece('j2', [1, 9], 1),
      new Piece('p1', [3, 2], 1),
      new Piece('p2', [3, 8], 1),
      new Piece('m1', [1, 2], 1),
      new Piece('m2', [1, 8], 1),
      new Piece('x1', [1, 3], 1),
      new Piece('x2', [1, 7], 1),
      new Piece('s1', [1, 4], 1),
      new Piece('s2', [1, 6], 1),
      new Piece('z1', [4, 1], 1),
      new Piece('z2', [4, 3], 1),
      new Piece('z3', [4, 5], 1),
      new Piece('z4', [4, 7], 1),
      new Piece('z5', [4, 9], 1),
      new Piece('k', [1, 5], 1)
    ]
  }

  getBlackPieces = function () {
    return [
      new Piece('j1', [10, 1], -1),
      new Piece('j2', [10, 9], -1),
      new Piece('p1', [8, 2], -1),
      new Piece('p2', [8, 8], -1),
      new Piece('m1', [10, 2], -1),
      new Piece('m2', [10, 8], -1),
      new Piece('x1', [10, 3], -1),
      new Piece('x2', [10, 7], -1),
      new Piece('s1', [10, 4], -1),
      new Piece('s2', [10, 6], -1),
      new Piece('z1', [7, 1], -1),
      new Piece('z2', [7, 3], -1),
      new Piece('z3', [7, 5], -1),
      new Piece('z4', [7, 7], -1),
      new Piece('z5', [7, 9], -1),
      new Piece('k', [10, 5], -1)
    ]
  }
}

export default new Game()
