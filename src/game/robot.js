import Game from './index'
import Rule from './rule'
import _ from 'underscore'
import { checkSameItem } from './utils'
window._ = _
// 人机对战

// 获取到我方每一个棋子可以行动的位置，优先走可以消除对方的棋子的，其次是可以保护我方棋子的

// Tips
// 解析棋盘局势，得到我方每个棋子的以下属性：
// 可以走的位置，可以杀的棋子，可以保护的棋子，受保护的情况

/**
 * 获取最佳可移动的棋子
 * @param {当前阵营} currentCamp
 * @return {
    needMovePiece: 需要移动的棋子
    targetPiece: 需要移动到的位置，可能为敌方的棋子
    canMovePositions: 可以移动的所有位置坐标，需要提供给棋盘进行可移动判定
  }
 */
export const getBestMovePiece = function (currentCamp) {
  // 获取到我方可以移动的棋子
  return getCampCanMovePiece(currentCamp)
}

/**
 * 获取对应阵营可以移动的棋子，优先进攻帅，其次是可以消除敌方的棋子
 * @param {当前阵营} currentCamp
 * @returns {
      canMovePositions: 所有可移动的坐标,
      needMovePiece: 当前可移动的棋子,
      targetPiece: 需要移动到的位置，可能为敌方棋子
    }
 */
function getCampCanMovePiece (currentCamp) {
  // 获取到敌方可能移动的棋子
  const enemyList = getCampCanMovePieceList(-currentCamp)
  // 敌方保护的棋子
  const enemySavePiecesPosition = _.flatten(_.pluck(enemyList.canMoveList, 'canSavePiecePositions'))
  // 敌方可以消除我方的棋子
  const enemyRemovePiecesPosition = _.flatten(_.pluck(enemyList.canMoveList, 'canRemovePiecePositions'))
  // 敌方可以移动的所有坐标
  const enemyCanMovePositions = _.flatten(_.pluck(enemyList.canMoveList, 'canMovePositions'))

  // 获取我方可移动的棋子
  const ownerList = getCampCanMovePieceList(currentCamp)
  // 我方保护的棋子
  const ownerSavePiecesPosition = _.flatten(_.pluck(ownerList.canMoveList, 'canSavePiecePositions'))
  // 我方可以消除敌方的棋子
  // const ownerRemovePiecesPosition = _.flatten(_.pluck(ownerList.canMoveList, 'canRemovePiecePositions'))
  // 如果可以杀帅，直接执行
  if (ownerList.king) return ownerList.king
  if (enemyList.king) {
    // 如果敌方将军，我们需要进行保护 TODO
  }
  const canMoveList = ownerList.canMoveList
  // 移动可以消除敌方的棋子, 排除被敌方保护的
  let canRemovePiece = null
  canMoveList.find(item => {
    // 如果我方当前棋子可以保护我方将要被消除的棋子，则不动
    if (checkSameItem(item.canSavePiecePositions, enemyRemovePiecesPosition)) return false
    return item.canRemovePieces.find(i => {
      // 敌方受保护的棋子不杀
      if (enemySavePiecesPosition.indexOf(i.position.toString()) === -1) {
        canRemovePiece = {
          canMovePositions: item.canMovePositions,
          ownerPiece: item.ownerPiece,
          canRemovePiece: i
        }
        return true
      }
    })
  })
  if (canRemovePiece) {
    return {
      canMovePositions: canRemovePiece.canMovePositions,
      needMovePiece: canRemovePiece.ownerPiece,
      targetPiece: canRemovePiece.canRemovePiece
    }
  }
  let canSavePiece = null
  // 移动我方棋子来保护即将被杀死的棋子
  enemyRemovePiecesPosition.find(position => {
    if (ownerSavePiecesPosition.indexOf(position) > -1) return false // 判断该位置是否受保护，如是，则无需处理
    // 如不受保护，则需要移动相应棋子保护该位置
    return canMoveList.find(item => {
      // 如果我方当前棋子可以保护我方将要被消除的棋子，则不动
      if (checkSameItem(item.canSavePiecePositions, enemyRemovePiecesPosition)) return false
      const nextPiece = getCanSavePiecePosition(item.ownerPiece, item.canMoveBlankPieces, position, enemyCanMovePositions)
      if (nextPiece) {
        canSavePiece = {
          canMovePositions: item.canMovePositions,
          ownerPiece: item.ownerPiece,
          canMovePiece: nextPiece
        }
        return true
      }
    })
  })
  if (canSavePiece) {
    return {
      canMovePositions: canSavePiece.canMovePositions,
      needMovePiece: canSavePiece.ownerPiece,
      targetPiece: canSavePiece.canMovePiece
    }
  }
  // 移动我方棋子到空白位置上
  let canMovePiece = null
  canMoveList.find(item => {
    // 如果我方当前棋子可以保护我方将要被消除的棋子，则不动
    if (checkSameItem(item.canSavePiecePositions, enemyRemovePiecesPosition)) return false
    const nextPiece = getCanSavePiecePosition(item.ownerPiece, item.canMoveBlankPieces, '', enemyCanMovePositions)
    if (nextPiece) {
      canMovePiece = {
        canMovePositions: item.canMovePositions,
        ownerPiece: item.ownerPiece,
        canMovePiece: nextPiece
      }
      return true
    }
  })
  if (canMovePiece) {
    return {
      canMovePositions: canMovePiece.canMovePositions,
      needMovePiece: canMovePiece.ownerPiece,
      targetPiece: canMovePiece.canMovePiece
    }
  }
}

// 获取对应阵营所有可以移动的棋子列表
function getCampCanMovePieceList (currentCamp) {
  const ownerPieces = currentCamp === 1 ? Game.getRedPieces() : Game.getBlackPieces()
  // const otherPieces = currentCamp === 1 ? Game.getBlackPieces() : Game.getRedPieces()
  let king = null
  const canMoveList = []
  for (const ownerPiece of ownerPieces) {
    const canMovePositions = Rule.getMoveLine(ownerPiece)
    const canMovePieces = handlePosition(canMovePositions, currentCamp)
    if (canMovePieces.king) {
      // 如果有帅，直接return
      king = {
        canMovePositions,
        needMovePiece: ownerPiece,
        targetPiece: canMovePieces.king
      }
    } else {
      // 如果没有帅可以吃，就先把可以吃掉的棋子和可以移动的位置放入数组，等待循环结束后判定吃哪一个
      canMoveList.push({
        ownerPiece, // 当前可以移动的棋子
        canRemovePieces: canMovePieces.others, // 可以消除敌方的棋子
        canMoveBlankPieces: canMovePieces.blanks, // 可以移动的空白位置
        canSavePieces: canMovePieces.owners, // 可以保护的我方棋子
        canMovePositions: canMovePositions, // 所有可以移动的坐标
        // 保护的棋子位置
        canSavePiecePositions: canMovePieces.owners.map((item) => item && item.position ? item.position.toString() : ''),
        // 可以消除的棋子位置
        canRemovePiecePositions: canMovePieces.others.map((item) => item && item.position ? item.position.toString() : ''),
        // 受保护的棋子
        savedByPieces: []
      })
    }
  }
  handleSavedByPieces(canMoveList)
  return {
    king,
    canMoveList
  }
}

// 组装数据，获取受保护的情况
function handleSavedByPieces (canMoveList) {
  canMoveList.forEach(item => {
    for (const item2 of canMoveList) {
      if (item2.canSavePiecePositions.indexOf(item.ownerPiece.position.toString()) > -1) {
        item.savedByPieces.push(item2.ownerPiece)
      }
    }
  })
  return canMoveList
}

// 获取移动后可以将军或保护其他棋子的位置
function getCanSavePiecePosition (ownerPiece, canMoveBlankPieces, needSavePosition, enemyCanMovePositions) {
  return canMoveBlankPieces.find(item => {
    if (enemyCanMovePositions.indexOf(item.position.toString()) > -1) return false // 如果下一步有危险，则不行动
    const tempPiece = ownerPiece.copy()
    tempPiece.position = item.position // 模拟棋子移动下一步，获取下一步后可以行动的位置信息
    const canMovePositions = Rule.getMoveLine(tempPiece)
    const canMovePieces = handlePosition(canMovePositions, tempPiece.camp)
    if (canMovePieces.king) return true
    if (needSavePosition) {
      // 保护的棋子位置
      const canSavePiecePositions = canMovePieces.owners.map((item) => item && item.position ? item.position.toString() : '')
      if (canSavePiecePositions.indexOf(needSavePosition) > -1) return true
    } else {
      // 可以消除的棋子位置
      return canMovePieces.others.length > 0
    }
  })
}

/**
 * 获取可以消除的对方棋子, 优先进攻帅
 * @param {所有可以移动的位置坐标} canMovePosition
 * @param {当前阵营} currentCamp
 * @returns {
 *  king: null, // 帅
 *  others: [], // 其他可以消除的棋子
 *  owners: [], // 我方可以被保护的棋子
 *  blanks: [] // 其他空白的棋子
 * }
 */
function handlePosition (canMovePosition, currentCamp) {
  let canMovePieces = {
    king: null, // 帅
    others: [], // 其他可以消除的棋子
    owners: [], // 我方可以被保护的棋子
    blanks: [] // 其他空白的棋子
  }
  for (const position of canMovePosition) {
    const piece = Game.getPieceByPosition(position)
    if (piece.camp === 0) { // 空白
      canMovePieces.blanks.push(piece)
    } else if (currentCamp !== piece.camp) { // 敌方阵营
      if (piece.name === 'k') {
        canMovePieces.king = piece // 帅
      } else {
        canMovePieces.others.push(piece)
      }
    } else if (currentCamp === piece.camp) { // 我方阵营
      canMovePieces.owners.push(piece)
    }
  }
  return canMovePieces
}
