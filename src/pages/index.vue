<template>
  <div>
    <div class="status" :class="nextCamp > 0 ? 'red': ''">{{nextCamp > 0 ? '红棋' : '黑棋'}}</div>

    <div class="board">
      <div class="board-wrap">
        <div class="piece blank-item"
          :class="handleHighLight(item)"
          :style="handlePosition(item.position)"
          @click="clickPiece(item)"
          v-for="(item, index) in blankMap"
          :key="'black' + index">
          <!-- {{item.position}} -->
        </div>

        <div class="piece"
          :class="['black-' + item.name, handleHighLight(item)]"
          :style="handlePosition(item.position)"
          @click="clickPiece(item)"
          v-for="item in blackPieces"
          :key="'black' + item.name">
        </div>

        <div class="piece"
          :class="['red-' + item.name, handleHighLight(item)]"
          :style="handlePosition(item.position)"
          @click="clickPiece(item)"
          v-for="item in redPieces"
          :key="'red' + item.name">
        </div>
      </div>
    </div>

    <div v-if="over" class="success-panel">
      <div class="success-title">{{winCamp > 0 ? '红棋' : '黑棋'}}赢了！</div>
      <div class="restart" @click="begin">再来一局</div>
      <div class="restart back" @click="moreGame">更多游戏</div>
    </div>
  </div>
</template>

<script>
import Game from '../game'
import Rule from '../game/rule'

export default {
  data () {
    return {
      nextCamp: 1,
      winCamp: 0,
      over: false,
      blankMap: [],
      redPieces: [],
      blackPieces: [],
      needMovePiece: null,
      highLightPoint: [] // 可移动的点，需要高亮
    }
  },
  created () {
    this.begin()
  },
  methods: {
    begin () {
      this.nextCamp = this.winCamp ? -this.winCamp : 1
      this.winCamp = 0
      this.over = false
      Game.initGame()
      this.blankMap = Game.getBlankMap()
      this.blackPieces = Game.getBlackPieces()
      this.redPieces = Game.getRedPieces()
    },
    moreGame () {
      window.location.href = 'https://kodywang1994.github.io/game-box/dist/index.html#/'
    },
    gameOver (camp) {
      this.winCamp = camp
      this.over = true
    },
    clickPiece (piece) {
      if (this.needMovePiece && this.needMovePiece.camp !== piece.camp) {
        this.moveToAnim(this.needMovePiece, piece)
        this.needMovePiece = null
        this.highLightPoint = []
      } else if (piece.camp && piece.camp === this.nextCamp) {
        this.needMovePiece = piece
        this.highLightPoint = Rule.getMoveLine(this.needMovePiece)
        console.log(this.highLightPoint)
      }
    },
    moveToAnim (needMovePiece, targetPiece) {
      if (Rule.canMove(needMovePiece, targetPiece, this.highLightPoint)) {
        if (targetPiece.camp && targetPiece.camp !== needMovePiece.camp) {
          this.removePiece(targetPiece)
        }
        needMovePiece.moveTo(targetPiece.position)
        this.nextCamp = -this.nextCamp
        // 清除状态
        this.needMovePiece = null
        this.highLightPoint = []
      }
    },
    removePiece (piece) {
      if (piece.name === 'k') {
        this.gameOver(-piece.camp)
      }
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
      let pieceSize = 0.68
      let x = position[0]
      let y = position[1]
      x = (x - 1) * pieceSize - (pieceSize / 2)
      y = (y - 1) * pieceSize - (pieceSize / 2)
      return 'left:' + x + 'rem;bottom:' + y + 'rem;'
    },
    handleHighLight (piece) {
      const positionStr = piece.position.toString()
      for (const point of this.highLightPoint) {
        if (point.toString() === positionStr) {
          if (this.needMovePiece && piece.camp === this.needMovePiece.camp) {
            console.log()
            this.removeHighLightItem(piece)
            return ''
          } else {
            return 'active'
          }
        }
      }
    },
    removeHighLightItem (piece) {
      const strArr = []
      for (const point of this.highLightPoint) {
        strArr.push(point.toString())
      }
      const index = strArr.indexOf(piece.position.toString())
      if (index > -1) {
        this.highLightPoint.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.status {
  font-size: 0.4rem;
  font-weight: 600;
  text-align: center;
  padding-top: 0.2rem;
}
.status.red {
  color: #b82a2a;
}
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
  width: 0.68rem;
  height: 0.68rem;
  background-position: center;
  background-size: 100% 100%;
  transition: all 0.3s;
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
.success-panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.success-title {
  font-size: 30px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}
.restart {
  margin: 20px auto 0;
  width: 120px;
  height: 40px;
  color: #fff;
  font-size: 20px;
  border-radius: 20px;
  background-color: #891e91;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
