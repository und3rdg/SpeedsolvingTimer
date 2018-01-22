function top1(arr){
  var legitTimesArray = filterArray(arr)
  var top1 = bestTime(legitTimesArray)

  var celBest = $(".top1 td:nth-child(2)")

  celBest.text(top1.times_ms.toString().convTime())

}
