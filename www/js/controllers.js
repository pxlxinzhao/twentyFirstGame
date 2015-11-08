angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
    var gameBoard = $("#game-board")
    var tiles = $(".tile");
    var drop = $(".tile-drop");
    var tileWidth = null;
    var placeholder = drop.find('span');

    doCheck({
      inputs: [1,1,1,6],
      target: 21
    });

    $scope.result = 0;

    tiles.each(function(){
      var $this = $(this);
      if (!tileWidth){
        tileWidth = $this.width();
      }
      $this.css({
        'height': tileWidth,
        'line-height': tileWidth - 10 + 'px',
        'background-color': Colors[getRandomInt(0, 10)]
      })
      $this.draggable({
        start: function( event, ui ) {
          $scope.draggingTile = $this;
        },
        stop: function (event, ui) {
        },
        containment: gameBoard
      });
    });

    drop.css({
      'line-height': tileWidth + 'px',
      'height': tileWidth + 20
    });
    drop.droppable({
      accept:'.tile',
      drop: function(event, ui){

        var value = $scope.draggingTile ? $scope.draggingTile.text() : '';
        var newText = drop.text() + value;
        drop.text(newText);

        $scope.$apply(function(){
          var result = myEval(newText);
          $scope.result = result;
        });

        drop.removeClass('hover');
        if ($scope.draggingTile)
          $scope.draggingTile.addClass('animated rotateOut');
      },
      over: function(){
        drop.addClass('hover');
        placeholder.remove();
      },
      out: function(){
        drop.removeClass('hover');
      }
    });
  })

.controller('ChatsCtrl', function($scope, Chats) {
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});



var Colors = [
  "EEE4DA", // 2
  "#EAE0C8", // 4
  "#F59563", // 8
  "#3399ff", // 16
  "#ffa333", // 32
  "#cef030", // 64
  "#E8D8CE", // 128
  "#990303", // 256
  "#6BA5DE", // 512
  "#DCAD60", // 1024
  "#B60022" // 2048
]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function myEval(value) {
  try {
    return eval(value);
  } catch (e) {
    if (e instanceof SyntaxError) {
      //expected
    }
    return '...';
  }
}

//pass in target:int and inputs:array<int>
function doCheck(obj){
  //var sequence = []; //1 means replace right, 0 means replace left;
  //var needParenthesis= false;
  var formula = [];

  check(obj);
  //console.log('before: ', formula);

  //while(formula && formula.length > 1){
  //  var last = formula.pop();
  //  formula[formula.length-1] = concatenate(formula[formula.length-1], last);
  //}
  //console.log('after: ',formula);
  //
  //function concatenate(str1, str2){
  //  if (str2.match(/[+|-]/) && str1.match(/[*|/]/)){
  //    needParenthesis = true;
  //  }
  //  var seq = sequence.pop();
  //  var index = str1.match(/[/|*|+|-]/).index;
  //  var result = null;
  //  if (seq){
  //    var s = str1.substring(0, index + 1);
  //    if (needParenthesis) str2 = '(' + str2 + ')';
  //    result = s + str2;
  //  }else{
  //    var s= str1.substring(index);
  //    if (needParenthesis) str2 = '(' + str2 + ')';
  //    result = str2 + s;
  //  }
  //
  //  needParenthesis = false;
  //  return result;
  //}

  function check(obj){
    //var target = obj.target;
    //var inputs = obj.inputs;
    //var canAchieve = check21forMany.apply(this, inputs);
    //var result = {};

    var result = generateArrayForMany(1,2,3);

    for (var i=0; i<result.length; i++){
      console.log(i + ': ' + result[i].value + ', ' + result[i].formula);
    }
    //if (formula.length > 0){
    //  var tempArray = formula[formula.length-1].split(/[/|*|+|-]/);
    //  var firstChar = tempArray[0];
    //  var lastChar = tempArray[1];
    //
    //  if (canAchieve && inputs.indexOf(lastChar/1) === -1){
    //    sequence.push(1);
    //    check({
    //      target: lastChar/1,
    //      inputs: remove(inputs, firstChar/1)
    //    });
    //  }else if(canAchieve && inputs.indexOf(firstChar/1) === -1){
    //    sequence.push(0);
    //    check({
    //      target: firstChar/1,
    //      inputs: remove(inputs, lastChar/1)
    //    });
    //  }
    //}

    return result;

    //function check21forMany(){
    //  var args = arguments;
    //  if (args.length < 2){
    //    console.error('check21forMany needs at least 2 args');
    //  }else if (args.length === 2){
    //    return check21for2(args[0], args[1]);
    //  }else if(args.length > 2){
    //    for (var i=0; i<args.length; i++){
    //      var tempArgs = getArgs(args);
    //      var indi = tempArgs.shift();
    //
    //      //console.log(indi, tempArgs);
    //
    //      //if (check21forMany.apply(this, tempArgs)){
    //      //  return true;
    //      //}
    //      var arr = generateArrayForMany.apply(this, tempArgs);
    //
    //      for (var j=0; j<arr.length; j++){
    //        if (check21for2(indi, arr[j])){
    //          //canAchieve = printMath(tempArgs[0],tempArgs[1],j);
    //          //formula.push(canAchieve);
    //          return true;
    //        }
    //      }
    //
    //      args = shift(args);
    //    }
    //
    //    return false;
    //  }
    //}
    //
    //function check21for2(a, b){
    //
    //  var arr = generateArrayForMany(a, b);
    //
    //  for (var i=0; i<arr.length; i++){
    //    //console.log(arr[i]);
    //    if (arr[i] === target){
    //      canAchieve = printMath(a,b,i);
    //      formula.push(canAchieve);
    //      return true
    //    }
    //
    //  }
    //  return false
    //}

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
        //return Object.keys(filter(r));
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
        value: getValue(a)+getValue(b),
        formula: getFormula(a) + '/' + getFormula(b)
      });
      r.push({
        value: getValue(a)+getValue(b),
        formula: getFormula(b) + '/' + getFormula(a)
      });
      return r
    }

    function bracket(str){
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

    function printMath(a,b,i){
      switch(i){
        case 0:
          return a + '+' + b;
          break;
        case 1:
          return a + '*' + b;
          break;
        case 2:
          return a + '-' + b;
          break;
        case 3:
          return b + '-' + a;
          break;
        case 4:
          return a + '/' + b;
          break;
        case 5:
          return b + '/' + a;
          break;
        default:
          return null;
      }

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

