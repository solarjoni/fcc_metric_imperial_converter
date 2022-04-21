let validUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
let inputRegex = /[a-z]+|[^a-z]+/gi

function ConvertHandler() {
  
  this.getNum = function(input) {
    // console.log('Input: ' + input)
    
    let result = input.match(inputRegex)[0];
    // console.log('Bare Number: ' + result)
    let numberRegex = /\d/
    
    if(validUnits.includes(result)) { // If no Number Input provided
      result = '1'
    } 
    if(numberRegex.test(result) === false) {
      return 'Input is not a Number'
    }
    // console.log('Number: ' + result)
    
    if(result.toString().includes('/')) {
      let values = result.toString().split('/')
      if(values.length != 2) {
        return "invalid number"
      }

    let num1 = parseFloat(values[0])
    let num2 = parseFloat(values[1])
    // console.log('num1: ' + num1, 'num2: ' + num2)

    result = parseFloat(num1 / num2).toFixed(5)
  }

    if(isNaN(result)) {
      return 'Input is not a Number'
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result = input.match(inputRegex)[1]

    if(!result) { // If no Number Input provided, fallback to [0] index, which will be Unit 
      result = input.match(inputRegex)[0] 
    }

    // console.log('Unit: ' + result)
    
    if(!validUnits.includes(result)) {
      return 'invalid unit'
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    if(initUnit === 'gal' || initUnit === 'GAL') {
      result = 'L'
    } else if (initUnit ==='l' || initUnit === 'L') {
      result = 'gal'
    }

    if(initUnit === 'kg' || initUnit === 'KG') {
      result = 'lbs'
    } else if (initUnit ==='lbs' || initUnit === 'LBS') {
      result = 'kg'
    }

    if(initUnit === 'km' || initUnit === 'KM') {
      result = 'mi'
    } else if (initUnit ==='mi' || initUnit === 'MI') {
      result = 'km'
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch (unit) {
      case 'gal':
      case 'GAL':
        result = 'gallons'
        break
      case 'l':
      case 'L':
        result = 'liters'
        break
      case 'lbs':
      case 'LBS':
        result = 'pounds'
        break
      case 'kg':
      case 'KG':
        result = 'kilograms'
        break
      case 'mi':
      case 'MI':
        result = 'miles'
        break
      case 'km':
      case 'KM':
        result = 'kilometers'
        break
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    if(initUnit === 'gal' || initUnit === 'GAL') {
      result = (initNum * galToL).toFixed(5)
    } else if (initUnit ==='l' || initUnit === 'L') {
      result = (initNum / galToL).toFixed(5)
    }

    if(initUnit === 'lbs' || initUnit === 'LBS') {
      result = (initNum * lbsToKg).toFixed(5)
    } else if (initUnit ==='kg' || initUnit === 'KG') {
      result = (initNum / lbsToKg).toFixed(5)
    }

    if(initUnit === 'mi' || initUnit === 'MI') {
      result = (initNum * miToKm).toFixed(5)
    } else if (initUnit ==='km' || initUnit === 'KM') {
      result = (initNum / miToKm).toFixed(5)
    }

    return parseFloat(result); //parseFloat(result)
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit)
    
    return result;
  };
  
}

module.exports = ConvertHandler;
