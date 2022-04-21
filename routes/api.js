'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input
      let initNum = convertHandler.getNum(input)
      let initUnit = convertHandler.getUnit(input)

      if(!initNum && !initUnit) {
        res.send("invalid number and unit")
      } else if (!initNum) {
        res.send("invalid number")
      } else if (!initUnit) {
        res.send("invalid unit")
      }
      
      let returnNum = convertHandler.convert(initNum, initUnit)
      let returnUnit = convertHandler.getReturnUnit(initUnit)
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

      let responseObject = {}
      responseObject['initNum'] = initNum
      if (initUnit === 'l' || initUnit === 'L') {
      responseObject['initUnit'] = 'L'
      } else { responseObject['initUnit'] = initUnit.toLowerCase() }
      responseObject['returnNum'] = returnNum
      responseObject['returnUnit'] = returnUnit
      responseObject['string'] = toString

      if((initNum === 'invalid number' || initNum === 'Input is not a Number') && initUnit === 'invalid unit') {
        res.json('invalid number and unit')
      }
      if(initNum === "invalid number") {
        res.json('invalid number')
      }
      if(initUnit === 'invalid unit') {
        res.json('invalid unit')
      }

      res.json(responseObject)
    })

};
