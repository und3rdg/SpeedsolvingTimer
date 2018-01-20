function bestTime(arr){
  var newArr = filterArray(arr)
  var best = bestWorstId(newArr).best
  return newArr[best]
}
 
if (typeof module !== "undefined" && module.exports) {
    exports.bestTime = bestTime
}

