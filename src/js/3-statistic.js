// FILTERING ARRAY
/////////////////////////

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
function filterArray(arr){
  var cloneArr = JSON.parse(JSON.stringify(arr))
  return cloneArr
  .map(plus2)
  .map(dnf)
  .filter(del)
  .reverse()
}
    

// AVERANGES
/////////////////////////

// Ao(n) remove best and worst time form array
function bestWorstId(arr){
  var bestIndex = 0
  var worstIndex = 0 
  for(var i=0; i < arr.length; i++){
    if(arr[i].times_ms < arr[bestIndex].times_ms){
      bestIndex = i
    }
    if(arr[i].times_ms > arr[worstIndex].times_ms){
      worstIndex = i
    }
  }
  return {best: bestIndex, worst: worstIndex}
}

function removeBestWorstArr(arr){
  var out = arr
    .filter(function(row, index){
      return index !== bestWorstId(arr).best
  })
    .filter(function(row, index){
      return index !== bestWorstId(arr).worst
  }) 

  return out
}

function removeInfinityArr(arr){
  var out = arr
    .filter(function(row){
      return row.dnf !== 1
    })
  return out
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
  if(ao > 12 || ao < 5){
    aoArr = removeInfinityArr(aoArr)
  }
  return aoArr
}

// averange
function averange(arr){
  var sum = arr.reduce(function(sum, row){
    return sum += row.times_ms
  },0)  
  return Math.floor(sum / arr.length)
}


// OUTPUT
/////////////////////////

// top1
function bestTime(arr){
  var newArr = filterArray(arr)
  var best = bestWorstId(newArr).best
  return newArr[best]
}

// mo3, ao5, ao12 mo50, mo100 ect.
function aoTime(arr, ao){
  var newArr = filterArray(arr)
  var removedBestWorst = aoArr(newArr, ao)
  var avTime = averange(removedBestWorst)
  return avTime


}

if (typeof module !== "undefined" && module.exports) {
  exports.plus2 = plus2
  exports.dnf = dnf
  exports.del = del
  exports.filterArray = filterArray 
  exports.bestWorstId = bestWorstId
  exports.removeBestWorstArr = removeBestWorstArr
  exports.removeInfinityArr = removeInfinityArr
  exports.aoArr = aoArr
  exports.averange = averange
  exports.bestTime = bestTime
  exports.aoTime = aoTime
}
