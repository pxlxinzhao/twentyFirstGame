/**
 * Created by Patrick_Pu on 2015-11-08.
 */

function generateCombinations(){

  var dimension = 13;
  var target = 21;
  var json = [];

  for (var i=1; i<=dimension; i++){
    for (var j=1; j<=dimension; j++){
      for (var k=1; k<=dimension; k++){
        for (var l=1; l<=dimension; l++){
          var length = check({
            inputs: [i,j,k,l],
            target: target
          });
          console.log('checking: ',i,j,k,l, length);
          if (length > 0){
            json.push({
              0: i,
              1: j,
              2: k,
              3: l,
              combinations: length
            });
          }

        }
      }
    }
  }

  console.log(JSON.stringify(json));




  function check(obj){
    // can not differentiate  1+2 and 2+1, duplicates exist
    var target = obj.target;
    var inputs = obj.inputs;
    var results = [];

    var allCombination = generateArrayForMany.apply(this, inputs);

    for (var i=0; i<allCombination.length; i++){
      if (allCombination[i].value === target) results.push(allCombination[i]);
    }

    //for (var i=0; i<results.length; i++){
    //  console.log(i + ': ' + results[i].value + ', ' + results[i].formula);
    //}

    //console.log(results.length + ' out of ' + allCombination.length);

    return results.length;


    function generateArrayForMany(){
      var r = [];
      var args = arguments;
      if (args.length < 2){
        console.error('generateArrayForMany needs at least 2 args');
      }else if (args.length === 2){
        return generateArray(args[0], args[1]);
      }else if(args.length > 2){
        for (var i=0; i<args.length; i++){
          var tempArgs = getArgs(args);
          var indi = tempArgs.shift();
          //r.concat(generateArrayForMany(a, tempArgs));
          var array = generateArrayForMany.apply(this, tempArgs);

          for (var j=0; j<array.length; j++){
            var tempResult = generateArray(indi, array[j]);
            r = r.concat(tempResult);
          }

          args = shift(args);
        }

        return r;
      }
    }

    function generateArray(a, b){
      var r = [];
      r.push({
        value: getValue(a)+getValue(b),
        formula: getFormula(a) + '+' + getFormula(b)
      });
      r.push({
        value: getValue(a)*getValue(b),
        formula: getFormula(a) + '*' + getFormula(b)
      });
      r.push({
        value: getValue(a)-getValue(b),
        formula: getFormula(a) + '-' + getFormula(b)
      });
      r.push({
        value: getValue(b)-getValue(a),
        formula: getFormula(b) + '-' + getFormula(a)
      });
      r.push({
        value: getValue(a)/getValue(b),
        formula: getFormula(a) + '/' + getFormula(b)
      });
      r.push({
        value: getValue(b)/getValue(a),
        formula: getFormula(b) + '/' + getFormula(a)
      });
      return r
    }

    function tidyParenthesis(str){
      //this won't works very well when inputs grow, works fine with 4
      var match = str.match(/\+\(\d+[+|-]/);
      if (match){
        str = spliceString(str, match.index+1, 1);
        str = spliceString(str, str.match(/\)/).index, 1);
      }
      return str;
    }

    function spliceString(str, index, count, add) {
      var ar = str.split('');
      ar.splice(index, count, add);
      return ar.join('');
    }

    function containsPlusMinus(str){
      return !!str.match(/[+|-]/);
    }

    function bracket(str){
      //if (containsPlusMinus(str)) return '(' + tidyParenthesis(str) + ')';
      return '(' + str + ')';
    }

    function getValue(obj){
      if (obj.value){
        return obj.value;
      }else{
        return obj;
      }
    }

    function getFormula(obj){
      if (obj.formula){
        return bracket(obj.formula);
      }else{
        return obj;
      }
    }

    function shift(arr){
      var temp = null;
      temp = arr[0]
      for (var i=0; i<arr.length - 1; i++){
        arr[i] = arr[i + 1];
      }
      arr[arr.length - 1] = temp;
      return arr;
    }

    function getArgs(obj){
      var r = [];
      for (var key in obj){
        r.push(obj[key])
      }
      return r;
    }

    function filter(array){
      var r = {};
      for (var i=0; i<array.length; i++){
        if (array[i].value%1 === 0){
          r[array[i].value] = array[i];
        }
      }
      return r;
    }

    function remove(arr, char){
      var index = arr.indexOf(char);
      if (index > -1){
        arr.splice(index, 1);
      }
      return arr;
    }
  }

}
