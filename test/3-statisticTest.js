const assert = require('chai').assert
const app = require('./../src/js/3-statistic.js')

describe('3-statistic.js', ()=>{
  describe('FILTERING TABLE:', ()=> {
    describe('plus2() - add 2 sec if peantly flag', ()=>{
      it('should add 2000 to 28 (peantly flag)', ()=> {
        let arr = {id: 1, times_ms: 28, date: "date", plus2: 1, dnf: 0, del: 0}
        let result = app.plus2(arr).times_ms
        assert.equal(result, 2028)
      })

      it('should return 12 (normal time)', ()=>{
        let arr = {id: 0, times_ms: 12, date: 'date', plus2: 0, dnf: 0, del: 0}
        let result = app.plus2(arr).times_ms
        assert.equal(result, 12)
      })

      it('should by a NUMBER (189)', ()=>{
        let arr = {id: 0, times_ms: 189, date: 'date', plus2: 0, dnf: 0, del: 0}
        let result = app.plus2(arr).times_ms
        assert.typeOf(result, 'number')
      })
    })

    describe('dnf() - set time to infinity if Do Not Finish flag', ()=>{
      it('should return Infinity (do not finish flag)', ()=>{
        let arr = {id: 0, times_ms: 12, date: 'date', plus2: 0, dnf: 1, del: 0}
        let result = app.dnf(arr).times_ms
        assert.equal(result, Infinity)
      })

      it('should return 12 (normal time)', ()=>{
        let arr = {id: 0, times_ms: 15, date: 'date', plus2: 0, dnf: 0, del: 0}
        let result = app.dnf(arr).times_ms
        assert.equal(result, 15)
      })

      it('should by a NUMBER [12]', ()=>{
        let arr = {id: 0, times_ms: 15, date: 'date', plus2: 0, dnf: 0, del: 0}
        let result = app.dnf(arr).times_ms
        assert.typeOf(result, 'number')
      })

      it('should by a NUMBER [Infinity]', ()=>{
        let arr = {id: 0, times_ms: 15, date: 'date', plus2: 0, dnf: 1, del: 0}
        let result = app.dnf(arr).times_ms
        assert.typeOf(result, 'number')
      })
    })

    describe('del() - Removed times if del flag', ()=>{
      it('should return 0 (2 times, 2 deleted)', ()=>{
        let arr = [
          {id: 0, times_ms: 15, date: 'date', plus2: 0, dnf: 0, del: 1},
          {id: 0, times_ms: 15, date: 'date', plus2: 0, dnf: 0, del: 1}
        ]
        let result = arr.filter(app.del)
        assert.lengthOf(result, 0)
      })

      it('should return 2 (4 times, 2 deleted)', ()=>{
        let arr = [
          {id: 0, times_ms: 15, date: 'date', plus2: 0, dnf: 0, del: 1},
          {id: 0, times_ms: 15, date: 'date', plus2: 0, dnf: 0, del: 0},
          {id: 0, times_ms: 15, date: 'date', plus2: 0, dnf: 0, del: 0},
          {id: 0, times_ms: 15, date: 'date', plus2: 0, dnf: 0, del: 1}
        ]
        let result = arr.filter(app.del)
        assert.lengthOf(result, 2)
      })

      it('should return 3 (3 times, 0 deleted)', ()=>{
        let arr = [
          {id: 0, times_ms: 15, date: 'date', plus2: 0, dnf: 0, del: 0},
          {id: 0, times_ms: 15, date: 'date', plus2: 0, dnf: 0, del: 0},
          {id: 0, times_ms: 15, date: 'date', plus2: 0, dnf: 0, del: 0}
        ]
        let result = arr.filter(app.del)
        assert.lengthOf(result, 3)
      })
    })

    describe('filterArray() - FINAL filtering array', ()=>{
      let arr = [
        {id: 0, times_ms:  05, date: 'date', plus2: 0, dnf: 0, del: 0},
        {id: 1, times_ms:  11, date: 'date', plus2: 0, dnf: 1, del: 0},
        {id: 2, times_ms:  12, date: 'date', plus2: 0, dnf: 0, del: 0},
        {id: 3, times_ms:  13, date: 'date', plus2: 0, dnf: 0, del: 1},
        {id: 4, times_ms:  14, date: 'date', plus2: 1, dnf: 0, del: 0}
      ]
      let result = app.filterArray(arr)
      it('should return array', ()=> assert.isArray(result))
      it('should not by empty', ()=> assert.isNotEmpty(result))
      it('should by 4(legth of array, reduced 1 DEL record)', ()=> assert.lengthOf(result, 4))
      it('should by infinity(DoNotFinish time)', ()=> assert.equal(result[2].times_ms, Infinity))
      it('should by 2014(plus2 time)', ()=> assert.equal(result[0].times_ms, 2014))
      it('should by 12(unchanged time)', ()=> assert.equal(result[1].times_ms, 12))
      it('should by id 5(unchanged time)', ()=> assert.equal(result[3].times_ms, 5))
      it('should by id 4(arr[3] reduce DEL item)', ()=> assert.equal(result[2].id, 1))
    })
  })


  describe('CALCULATING AVERANGES:', ()=>{
    let arr = [
      {id:  0, times_ms:  40, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  1, times_ms:  70, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  2, times_ms: 100, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  3, times_ms:  40, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  4, times_ms:  30, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  5, times_ms:  55, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  6, times_ms:  80, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  7, times_ms:  50, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  8, times_ms:  88, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  9, times_ms:  50, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id: 10, times_ms:  29, date: '01-01-99', plus2: 1, dnf: 0, del: 0},
      {id: 11, times_ms:   1, date: '01-01-99', plus2: 0, dnf: 0, del: 1},
      {id: 12, times_ms:  48, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id: 13, times_ms:  39, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id: 14, times_ms:  50, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id: 15, times_ms:  50, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id: 16, times_ms:  50, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id: 17, times_ms:  20, date: '01-01-99', plus2: 0, dnf: 1, del: 0},
      {id: 18, times_ms:  50, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id: 19, times_ms:  60, date: '01-01-99', plus2: 0, dnf: 0, del: 0}
    ]

    describe('bestWorstId() - get best time id', ()=>{
      let result = app.bestWorstId(arr)
      it('should by 11 (best time id)', ()=> assert.equal(result.best, 11))
      it('should by 2 (worst time id)', ()=> assert.equal(result.worst, 2))
    })

    describe('removeBestWorstArr() - remove best & worst, return array', ()=>{
      let result = app.removeBestWorstArr(arr)
      it('should by 4.length', ()=> assert.lengthOf(result, 18))
      it('should by ARRAY', ()=> assert.isArray(result))
    })

    describe('removeInfinityArr() - remove DNF times from array', ()=>{
      let result = app.removeInfinityArr(arr)
      it('should by 19 lengthOf', ()=> assert.lengthOf(result, 19))
    })

    describe('aoArr(x) - X last times', ()=>{
      let result = app.aoArr

      it('should return 3 (Ao5)', ()=> assert.lengthOf(result(arr, 5), 3))
      it('should return 10 (Ao12)', ()=> assert.lengthOf(result(arr, 12), 10))
      it('should return 4 (Mo4)', ()=> assert.lengthOf(result(arr, 4), 4))
      it('should return 13 (Mo13)', ()=> assert.lengthOf(result(arr, 13), 13))
    })

    describe('averange() - calculating averange', ()=>{
      let result = app.averange(arr)
      it('should by 3 (averange)', ()=>{
        let arr = [
          {id: 0, times_ms: 1, date: 'date', plus2: 0, dnf: 0, del: 0},
          {id: 1, times_ms: 2, date: 'date', plus2: 0, dnf: 0, del: 0},
          {id: 2, times_ms: 3, date: 'date', plus2: 0, dnf: 0, del: 0},
          {id: 3, times_ms: 4, date: 'date', plus2: 0, dnf: 0, del: 0},
          {id: 4, times_ms: 5, date: 'date', plus2: 0, dnf: 0, del: 0}
        ]
        let result = app.averange(arr)
        assert.equal(result, 3)
      })
      it('should by 50 (avernage)',()=> assert.equal(result, 50))
      it('should by NUMBER (averange)', ()=> assert.typeOf(result, 'number'))
    })
  })

  describe('OUTPUT - wrapping up ', ()=>{
    let arr = [
      {id:  0, times_ms:  40, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  1, times_ms:  70, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  2, times_ms: 100, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  3, times_ms:  40, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  4, times_ms:  30, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      // mo13   
      {id:  5, times_ms:  63, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      // ao12
      {id:  6, times_ms:  86, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  7, times_ms:  70, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  8, times_ms:  88, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id:  9, times_ms:  50, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id: 10, times_ms:  29, date: '01-01-99', plus2: 1, dnf: 0, del: 0},
      {id: 11, times_ms:   1, date: '01-01-99', plus2: 0, dnf: 0, del: 1},
      {id: 12, times_ms:  48, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id: 13, times_ms:  39, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      // ao5
      {id: 14, times_ms:  70, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id: 15, times_ms:  40, date: '01-01-99', plus2: 0, dnf: 0, del: 1},
      {id: 16, times_ms:  35, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id: 17, times_ms:  20, date: '01-01-99', plus2: 0, dnf: 1, del: 0},
      {id: 18, times_ms:  50, date: '01-01-99', plus2: 0, dnf: 0, del: 0},
      {id: 19, times_ms:  60, date: '01-01-99', plus2: 0, dnf: 0, del: 0}
    ]

    describe('bestTime(arr) - get best time. In use filterArray(arr) and bestWorstId(arr)', ()=>{
      let result = app.bestTime(arr)
      it('should by 30 (best time)', ()=> assert.equal(result.times_ms, 30))
      it('should by a NUMBER (best time)', ()=> assert.typeOf(result.times_ms, 'number'))
      it('should by 4 (id)', ()=> assert.equal(result.id, 4))
      it('should by a NUMBER (id)', ()=> assert.typeOf(result.id, 'number'))
      it('should by 01-01-99 (time)', ()=> assert.equal(result.date, '01-01-99'))
      it('should by a STRING (time)', ()=> assert.typeOf(result.date, 'string'))
    })

    describe('aoTime(arr, mo) - mo3, ao5, ao12, mo50 ect...', ()=>{
      let result = (ao) => app.aoTime(arr, ao)
      it('Mo1 should by av of 60(last time)', ()=> assert.equal(result(1), 60))
      it('Mo2 should by 55(60 and 50)', ()=> assert.equal(result(2), 55))
      it('Mo3 should by infinity', ()=> assert.equal(result(3), 'Infinity'))
      it('Mo4 should by infinity', ()=> assert.equal(result(4), 'Infinity'))
      it('Ao5 should not by infinity(av 3 from 5)', ()=> assert.notEqual(result(5), 'Infinity'))
      it('Ao5 should by 60', ()=> assert.equal(result(5), 60))
      it('Ao12 should by 259', ()=> assert.equal(result(12), 259))
      it('Ao13 should not by infinity', ()=> assert.notEqual(result(13), 'Infinity'))
      it('Ao13 should by 224', ()=> assert.equal(result(13), 224))
    })

  })

})
