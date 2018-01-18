var arr = [
  {id:  0, times_ms:   1, date: 'date', plus2: 1, dnf: 1, del: 0},
  {id:  1, times_ms:  10, date: 'date', plus2: 0, dnf: 1, del: 0},
  {id:  2, times_ms:  20, date: 'date', plus2: 0, dnf: 0, del: 1},
  {id:  3, times_ms:  30, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id:  4, times_ms:  40, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id:  5, times_ms:  50, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id:  6, times_ms:  60, date: 'date', plus2: 0, dnf: 1, del: 0},
  {id:  7, times_ms:  70, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id:  8, times_ms:  80, date: 'date', plus2: 0, dnf: 1, del: 0},
  {id:  9, times_ms:  90, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id: 10, times_ms: 100, date: 'date', plus2: 1, dnf: 1, del: 0},
  {id: 11, times_ms: 110, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id: 12, times_ms: 120, date: 'date', plus2: 0, dnf: 1, del: 1},
  {id: 13, times_ms: 130, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id: 14, times_ms: 140, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id: 15, times_ms: 150, date: 'date', plus2: 1, dnf: 1, del: 0},
  {id: 16, times_ms: 160, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id: 17, times_ms: 170, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id: 18, times_ms: 180, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id: 19, times_ms: 190, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id: 20, times_ms: 200, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id: 21, times_ms: 210, date: 'date', plus2: 0, dnf: 0, del: 0},
  {id: 22, times_ms: 220, date: 'date', plus2: 0, dnf: 0, del: 0}
]

// FILTERING ARRAY

// +2 peantly 2s
function plus2(row){
 if(row.plus2 == 1){
    row.times_ms += 2000
  }
  return row
}

// do not finish, solving time is infinity
function dnf(row){
  if(row.dnf == 1){
    row.times_ms = Infinity
  }
  return row
}

// filter deleted times
function del(row){
  return row.del == 0
}

// Final filtering array
function fArr(arr){
  return arr.
  map(plus2).
  map(dnf).
  filter(del)
}
    
// Ao(n) remove best and worst time form array
function bestWorstId(arr){
  var bestId = 0
  var worstId = 0 
  for(var i=0; i < arr.length; i++){
    if(arr[i].times_ms < arr[bestId].times_ms){
      bestId = i
    }
    if(arr[i].times_ms > arr[worstId].times_ms){
      worstId = i
    }
  }
  return {best: bestId, worst: worstId}
}

function removeBestWorstArr(arr){
  return arr.
    filter(function(row){
      return row.id !== bestWorstId(arr).best
  })
    .filter(function(row){
    return row.id !== bestWorstId(arr).worst
  }) 
}

// get array of only x times
// if Ao5 Ao12 remove best & worst
// if Mo3, Mo50 ect. calculate all times
function aoArr(arr, ao){
  var aoArr = []
  for(var i = 0; i < ao; i++){
    aoArr[i] = arr[i] 
  }  

  if(4 < ao && ao <= 12){
    aoArr = removeBestWorstArr(aoArr)
  }
  return aoArr
}

// averange
function averange(arr){
  var sum = arr.reduce(function(sum, row){
    return sum += row.times_ms
  },0)  
  return (sum / arr.length)
}
// start-test
exports.plus2 = plus2
exports.dnf = dnf
exports.del = del
exports.fArr = fArr 
exports.bestWorstId = bestWorstId
exports.removeBestWorstArr = removeBestWorstArr
exports.aoArr = aoArr
exports.averange = averange
// end-test



