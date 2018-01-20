function bestTime(arr){
  var newArr = filterArray(arr)
  var best = bestWorstId(newArr).best
  return newArr[best]
}

