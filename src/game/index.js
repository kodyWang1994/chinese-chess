import Piece from './piece'

class Game {
  constructor () {
    console.log('constructor')
    this.blankMap = []
    this.redPieces = []
    this.blackPieces = []
  }

  initGame () {
    console.log('init')
    this.blankMap = this.initBlankMap()
    this.redPieces = this.initRedPieces()
    this.blackPieces = this.initBlackPieces()
  }

  getBlankMap () {
    return this.blankMap
  }

  getRedPieces () {
    return this.redPieces
  }

  getBlackPieces () {
    return this.blackPieces
  }

  getAllPieces () {
    return [...this.redPieces, ...this.blackPieces]
  }

  // 获取位置上的棋子
  getPosition (position) {
    const allPieces = this.getAllPieces()
    const piece = allPieces.find(piece => {
      return piece.position.toString() == position.toString()
    })
    if (piece) return piece
    return this.getBlankMap().find(piece => {
      return piece.position.toString() == position.toString()
    })
  }

  initBlankMap = function () {
    const map = []

    for (let x = 1; x <= 9; x++) {
      for (let y = 10; y > 0; y--) {
        // 生成空白棋盘
        map.push(new Piece('', [x, y], 0))
      }
    }
    return map
  }

  initRedPieces = function () {
    return [
      new Piece('j1', [1, 1], 1), // 车
      new Piece('j2', [9, 1], 1), // 车
      new Piece('p1', [2, 3], 1), // 炮
      new Piece('p2', [8, 3], 1), // 炮
      new Piece('m1', [2, 1], 1), // 马
      new Piece('m2', [8, 1], 1), // 马
      new Piece('x1', [3, 1], 1), // 相
      new Piece('x2', [7, 1], 1), // 相
      new Piece('s1', [4, 1], 1), // 士
      new Piece('s2', [6, 1], 1), // 士
      new Piece('z1', [1, 4], 1), // 兵
      new Piece('z2', [3, 4], 1), // 兵
      new Piece('z3', [5, 4], 1), // 兵
      new Piece('z4', [7, 4], 1), // 兵
      new Piece('z5', [9, 4], 1), // 兵
      new Piece('k', [5, 1], 1) // 帅
    ]
  }

  initBlackPieces = function () {
    return [
      new Piece('j1', [1, 10], -1),
      new Piece('j2', [9, 10], -1),
      new Piece('p1', [2, 8], -1),
      new Piece('p2', [8, 8], -1),
      new Piece('m1', [2, 10], -1),
      new Piece('m2', [8, 10], -1),
      new Piece('x1', [3, 10], -1),
      new Piece('x2', [7, 10], -1),
      new Piece('s1', [4, 10], -1),
      new Piece('s2', [6, 10], -1),
      new Piece('z1', [1, 7], -1),
      new Piece('z2', [3, 7], -1),
      new Piece('z3', [5, 7], -1),
      new Piece('z4', [7, 7], -1),
      new Piece('z5', [9, 7], -1),
      new Piece('k', [5, 10], -1)
    ]
  }
}

export default new Game()
