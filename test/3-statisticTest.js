const assert = require('chai').assert
const app = require('./../src/js/3-statistic.js')

describe('3-statistic.js', ()=>{
  describe('FILTERING TABLE:', () => {
    describe('plus2() - add 2 sec if peantly flag', ()=>{
      it('should add 2000 to 28 (peantly flag)', () => {
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

      it('should return array', ()=>{
        assert.isArray(result)
      })
      it('should not by empty', ()=>{
        assert.isNotEmpty(result)
      })
      it('should by 4(legth of array, reduced 1 DEL record)', ()=>{
        assert.lengthOf(result, 4)
      })
      it('should by infinity(DoNotFinish time)', ()=>{
        assert.equal(result[1].times_ms, Infinity)
      })
      it('should by 2014(plus2 time)', ()=>{
        assert.equal(result[3].times_ms, 2014)
      })
      it('should by 12(unchanged time)', ()=>{
        assert.equal(result[2].times_ms, 12)
      })
      it('should by id 5(unchanged time)', ()=>{
        assert.equal(result[0].times_ms, 5)
      })
      it('should by id 4(arr[3] reduce DEL item)', ()=>{
        assert.equal(result[3].id, 4)
      })
    })
  })


  describe('CALCULATING AVERANGES:', ()=>{
    let arr = [
      {id: 0, times_ms:  40, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 1, times_ms:  70, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 2, times_ms: 100, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 3, times_ms:  40, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 4, times_ms:  30, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 5, times_ms:  55, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 6, times_ms:  80, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 7, times_ms:  50, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 8, times_ms:  88, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 9, times_ms:  50, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 10, times_ms:  29, date: 'date', plus2: 1, dnf: 0, del: 0},
      {id: 11, times_ms:   1, date: 'date', plus2: 0, dnf: 0, del: 1},
      {id: 12, times_ms:  48, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 13, times_ms:  39, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 14, times_ms:  50, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 15, times_ms:  50, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 16, times_ms:  50, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 17, times_ms:  20, date: 'date', plus2: 0, dnf: 1, del: 0},
      {id: 18, times_ms:  50, date: 'date', plus2: 0, dnf: 0, del: 0},
      {id: 19, times_ms:  60, date: 'date', plus2: 0, dnf: 0, del: 0}
    ]

    describe('bestWorstId() - get best time id', ()=>{
      let result = app.bestWorstId(arr)

      it('should by 11 (best time id)', () => {
        assert.equal(result.best, 11)
      })

      it('should by 2 (worst time id)', () => {
        assert.equal(result.worst, 2)
      })
    })

    describe('removeBestWorstArr() - remove best & worst, return array', ()=>{
      let result = app.removeBestWorstArr(arr)

      it('should by 4.length', ()=>{
        assert.lengthOf(result, 18)
      })

      it('should by ARRAY', ()=>{
        assert.isArray(result)
      })
    })

    describe('aoArr(x) - X last times', ()=>{
      let result = app.aoArr

      it('should return 3 (Ao5)', ()=>{
        assert.lengthOf(result(arr, 5), 3)
      })
      it('should return 10 (Ao12)', ()=>{
        assert.lengthOf(result(arr, 12), 10)
      })
      it('should return 4 (Mo4)', ()=>{
        assert.lengthOf(result(arr, 4), 4)
      })
      it('should return 13 (Mo13)', ()=>{
        assert.lengthOf(result(arr, 13), 13)
      })
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

      it('should by 50 (avernage)',()=>{
        assert.equal(result, 50)
      })

      it('should by NUMBER', ()=>{
        assert.typeOf(result, 'number')
      })
    })

    describe('bestTime(arr) - get best time. In use filterArray(arr) and bestWorstId(arr)', ()=>{
      let result = app.bestTime(arr).times_ms
      it('should by 304 (best time)', ()=>{
        assert.equal(result, 30)
      })
    })

  })
})
