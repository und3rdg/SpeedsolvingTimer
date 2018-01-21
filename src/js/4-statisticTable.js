function top1(arr){
  var legitTimesArray = filterArray(arr)
  var top1 = bestTime(legitTimesArray)

  var celBest = $(".top1 td:nth-child(2)")
  var celDate = $(".top1 td:nth-child(3)")
  var celcurrent =  $(".top1 td:nth-child(4)")

  celBest.text(top1.times_ms)
  celDate.text(top1.date)

}
