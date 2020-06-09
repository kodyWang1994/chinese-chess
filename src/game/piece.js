class Piece {
  constructor (name, position, camp) {
    // camp： 阵营，-1黑，1红，0空白
    this.name = name
    this.position = position
    this.camp = camp || 0
    this.died = 0
  }
}

Piece.prototype.moveTo = function (newPos) {
  this.position = newPos
}

export default Piece
