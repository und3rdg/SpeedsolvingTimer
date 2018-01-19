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



