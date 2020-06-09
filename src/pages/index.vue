<template>
  <div>
    <div class="board">
      <div class="board-wrap">
        <div class="piece blank-item"
          :style="handlePosition(item.position)"
          @click="clickPiece(item)"
          v-for="(item, index) in blankMap"
          :key="'black' + index">
          <!-- {{item.position}} -->
        </div>

        <div class="piece"
          :class="'black-' + item.name + (needMovePiece && needMovePiece.camp == -1 && needMovePiece.name == item.name ? ' active' : '')"
          :style="handlePosition(item.position)"
          @click="clickPiece(item)"
          v-for="item in blackPieces"
          :key="'black' + item.name">
        </div>

        <div class="piece"
          :class="'red-' + item.name + (needMovePiece && needMovePiece.camp == 1 && needMovePiece.name == item.name ? ' active' : '')"
          :style="handlePosition(item.position)"
          @click="clickPiece(item)"
          v-for="item in redPieces"
          :key="'red' + item.name">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Game from '../game'
// import Rule from '../game/rule'

export default {
  data () {
    return {
      blankMap: [],
      redPieces: [],
      blackPieces: [],
      needMovePiece: null
    }
  },
  created () {
    const gameData = Game.initGame()
    this.blackPieces = gameData.blackPieces
    this.redPieces = gameData.redPieces
    this.blankMap = gameData.blankMap
  },
  methods: {
    clickPiece (piece) {
      if (this.needMovePiece) {
        this.moveToAnim(this.needMovePiece, piece)
        this.needMovePiece = null
      } else if (piece.camp) {
        this.needMovePiece = piece
      }
    },
    moveToAnim (needMovePiece, targetPiece) {
      if (targetPiece.camp && targetPiece.camp !== needMovePiece.camp) {
        this.removePiece(targetPiece)
      }
      needMovePiece.moveTo(targetPiece.position)
    },
    removePiece (piece) {
      if (piece.camp === 1) {
        const index = this.getPieceIndexByName(this.redPieces, piece)
        this.redPieces.splice(index, 1)
      } else {
        const index = this.getPieceIndexByName(this.blackPieces, piece)
        this.blackPieces.splice(index, 1)
      }
    },
    getPieceIndexByName (pieces, piece) {
      for (let index in pieces) {
        if (pieces[index].name === piece.name) {
          return index
        }
      }
    },
    handlePosition (position) {
      let pieceSize = 0.67
      let y = position[0]
      let x = position[1]
      x = (x - 1) * pieceSize - (pieceSize / 2)
      y = (y - 1) * pieceSize - (pieceSize / 2)
      return 'left:' + x + 'rem;bottom:' + y + 'rem;'
    }
  }
}
</script>

<style scoped>
.board {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 7rem;
  height: 7.12rem;
  background-image: url('../assets/board.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  box-shadow: 0.15rem 0.10rem 0.20rem #888888;
}

.board-wrap {
  position: relative;
  left: 0.84rem;
  top: 0.42rem;
  height: 6.2rem;
  width: 5.4rem;
}

.piece {
  position: absolute;
  width: 0.67rem;
  height: 0.67rem;
  background-position: center;
  background-size: 100% 100%;
}

.blank-item {
  font-size: 0.12rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  /* background-color: rgba(100, 100, 100, 0.5); */
}

/* 黑棋 */
.black-j1,
.black-j2 {
  background-image: url('../assets/pieces/-1/j.png');
}

.black-k {
  background-image: url('../assets/pieces/-1/k.png');
}

.black-m1,
.black-m2 {
  background-image: url('../assets/pieces/-1/m.png');
}

.black-p1,
.black-p2 {
  background-image: url('../assets/pieces/-1/p.png');
}

.black-s1,
.black-s2 {
  background-image: url('../assets/pieces/-1/s.png');
}

.black-x1,
.black-x2 {
  background-image: url('../assets/pieces/-1/x.png');
}

.black-z1,
.black-z2,
.black-z3,
.black-z4,
.black-z5 {
  background-image: url('../assets/pieces/-1/z.png');
}
/* 黑棋 */

/* 红棋 */
.red-j1,
.red-j2 {
  background-image: url('../assets/pieces/1/j.png');
}

.red-k {
  background-image: url('../assets/pieces/1/k.png');
}

.red-m1,
.red-m2 {
  background-image: url('../assets/pieces/1/m.png');
}

.red-p1,
.red-p2 {
  background-image: url('../assets/pieces/1/p.png');
}

.red-s1,
.red-s2 {
  background-image: url('../assets/pieces/1/s.png');
}

.red-x1,
.red-x2 {
  background-image: url('../assets/pieces/1/x.png');
}

.red-z1,
.red-z2,
.red-z3,
.red-z4,
.red-z5 {
  background-image: url('../assets/pieces/1/z.png');
}
/* 红棋 */

.active {
  background-color: rgba(59, 187, 209, 0.5);
  border-radius: 100%;
}
</style>
