function ao(arr, ao, cls){
  var avg = aoTime(arr, ao)
  var celAverange = $(cls + " td:nth-child(2)")

  celAverange.text(avg.toString().convTime())
}

function topScore(arr){
  // BEST TIME
  var top1 = bestTime(arr)
  var celBest = $(".top1 td:nth-child(2)")
  celBest.text(top1.times_ms.toString().convTime())

  ao(arr, 3,   '.mo3')
  ao(arr, 5,   '.ao5')
  ao(arr, 12,  '.ao12')
  ao(arr, 50,  '.mo50')
  ao(arr, 100, '.mo100')
}
