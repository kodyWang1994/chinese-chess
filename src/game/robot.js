import Game from './index'
import Rule from './rule'
// 人机对战

// 获取到我方每一个棋子可以行动的位置，优先走可以消除对方的棋子的，其次是可以保护我方棋子的

/**
 * 
 * @param {我方的棋子} owerPieces 
 * @param {对方的棋子} otherPieces 
 * @return {
    needMovePiece, 需要移动的棋子
    targetPiece 需要移动到的位置，可能为敌方的棋子
  }
 */
export const getBestMovePiece = function (currentCamp) {
  const owerPieces = currentCamp === 1 ? Game.getRedPieces() : Game.getBlackPieces()
  const otherPieces = currentCamp === 1 ? Game.getBlackPieces() : Game.getRedPieces()
  const canKillList = []
  for (const owerPiece of owerPieces) {
    const canMovePositions = Rule.getMoveLine(owerPiece)
    const canRemovePieces = handlePosition(canMovePositions, currentCamp)
    if (canRemovePieces.king) {
      // 如果有帅，直接return
      return {
        canMovePositions,
        needMovePiece: owerPiece,
        targetPiece: canRemovePieces.king
      }
    } else if (canRemovePieces.others.length > 0) {
      return {
        canMovePositions,
        needMovePiece: owerPiece,
        targetPiece: canRemovePieces.others[0]
      }
    } else if (canRemovePieces.blanks.length > 0) {
      // return {
      //   canMovePositions,
      //   needMovePiece: owerPiece,
      //   targetPiece: canRemovePieces.blanks[0]
      // }
      // 将可以移动的位置和可以消除的pieces都放入数组中
      canKillList.push({
        owerPiece,
        canRemovePieces: canRemovePieces.others,
        canMovePositions: canRemovePieces.blanks
      })
    }
  }
  // canKillList.forEach(item => {
  //   return {
  //     needMovePiece: item.owerPiece,
  //     targetPiece: 
  //   }
  // })
}

// 获取可以消除的对方棋子, 优先进攻帅
function handlePosition (canMovePosition, currentCamp) {
  let canRemovePieces = {
    king: null, // 帅
    others: [], // 其他可以消除的棋子
    blanks: [], // 其他空白的棋子
  }
  for (const point of canMovePosition) {
    const piece = Game.getPosition(point)
    if (piece.camp === 0) { // 空白
      canRemovePieces.blanks.push(piece)
    } else if (currentCamp != piece.camp) { // 敌方阵营
      if (piece.name === 'k') {
        canRemovePieces.king = piece // 帅
      } else {
        canRemovePieces.others.push(piece)
      }
    }
  }
  return canRemovePieces
}
