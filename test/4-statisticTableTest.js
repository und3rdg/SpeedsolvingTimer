const assert = require('chai').assert
const app = require('./../src/js/4-statisticTable.js')

fakeArray = [
  {"id":"183","times_ms":"401","date":"2018-01-20 15:04:21","plus2":"0","dnf":"0","del":"0"},
  {"id":"182","times_ms":"505","date":"2018-01-20 15:04:21","plus2":"0","dnf":"0","del":"0"},
  {"id":"181","times_ms":"408","date":"2018-01-19 15:49:35","plus2":"0","dnf":"0","del":"0"},
  // best time but deleted
  {"id":"180","times_ms":"304","date":"2018-01-19 15:36:19","plus2":"0","dnf":"0","del":"1"}, 
  {"id":"179","times_ms":"403","date":"2018-01-19 15:16:16","plus2":"0","dnf":"0","del":"1"},
  {"id":"178","times_ms":"405","date":"2018-01-19 15:16:16","plus2":"0","dnf":"0","del":"0"},
  {"id":"177","times_ms":"608","date":"2018-01-19 15:16:16","plus2":"0","dnf":"0","del":"0"},
  {"id":"176","times_ms":"506","date":"2018-01-19 15:16:16","plus2":"0","dnf":"0","del":"0"},
  {"id":"175","times_ms":"506","date":"2018-01-19 15:08:50","plus2":"0","dnf":"0","del":"0"},
  // best time but dnf
  {"id":"174","times_ms":"303","date":"2018-01-19 15:08:50","plus2":"0","dnf":"1","del":"0"},
  {"id":"173","times_ms":"504","date":"2018-01-19 15:08:50","plus2":"0","dnf":"0","del":"0"},
  {"id":"172","times_ms":"403","date":"2018-01-19 15:08:50","plus2":"0","dnf":"0","del":"0"},
  {"id":"171","times_ms":"506","date":"2018-01-19 15:08:50","plus2":"0","dnf":"0","del":"0"},
  // best time but +2 sec peantly
  {"id":"170","times_ms":"302","date":"2018-01-19 15:08:50","plus2":"1","dnf":"0","del":"0"},
  {"id":"169","times_ms":"404","date":"2018-01-19 15:04:24","plus2":"0","dnf":"0","del":"0"},
  {"id":"168","times_ms":"405","date":"2018-01-19 15:04:24","plus2":"0","dnf":"0","del":"0"},
  // best time
  {"id":"167","times_ms":"305","date":"2018-01-19 14:56:22","plus2":"0","dnf":"0","del":"0"},
  {"id":"166","times_ms":"403","date":"2018-01-19 14:56:22","plus2":"0","dnf":"0","del":"0"},
  {"id":"165","times_ms":"505","date":"2018-01-19 14:56:22","plus2":"0","dnf":"0","del":"0"},
  {"id":"164","times_ms":"405","date":"2018-01-19 14:56:22","plus2":"0","dnf":"0","del":"0"},
  {"id":"163","times_ms":"406","date":"2018-01-19 14:56:22","plus2":"0","dnf":"0","del":"0"},
  {"id":"162","times_ms":"405","date":"2018-01-19 14:55:34","plus2":"0","dnf":"0","del":"0"}
  ]
  // copy paste some data, to lazy to write and convert it
  fakeArray
    .map(function(x){
      x.id = parseFloat(x.id);
      x.times_ms = parseFloat(x.times_ms);
      x.plus2 = parseFloat(x.plus2);
      x.dnf = parseFloat(x.dnf);
      x.del = parseFloat(x.del);
      return x
   })

describe('4-statisticTable.js', ()=>{
  describe('GET FINAL RESULTS RDY TO PUT ON FRONTEND', ()=>{
    describe('bestTime(arr) - get best time. In use filterArray(arr) and bestWorstId(arr)', ()=>{
      // result = app.bestTime(fakeArray)
      it('should by xxx (best time)', ()=>{
        assert.equal(result, 304)
      })
    })
  })
})
