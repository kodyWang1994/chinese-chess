// 检查两个数组有没有相同的值
export function checkSameItem (arr1, arr2) {
  return !!arr1.find(i => {
    return arr2.indexOf(i) > -1
  })
}
