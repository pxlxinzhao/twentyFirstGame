angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
    var gameBoard = $("#game-board")
    var tiles = $(".tile");
    var drop = $(".tile-drop");
    var tileWidth = null;
    var placeholder = drop.find('span');

    check({
      inputs: [1,2,4,5,7],
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

//a wrapper function of check providing logs..

function check(obj){
  var target = obj.target;
  var inputs = obj.inputs;
  var results = [];

  var allCombination = generateArrayForMany.apply(this, inputs);

  for (var i=0; i<allCombination.length; i++){
    if (allCombination[i].value === target) results.push(allCombination[i]);
  }

  for (var i=0; i<results.length; i++){
    console.log(i + ': ' + results[i].value + ', ' + results[i].formula);
  }

  console.log(results.length + ' out of ' + allCombination.length);

  return results;


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

  function containsMinus(str){
    return str.indexOf('-') > -1;
  }

  function bracket(str){
    if (containsMinus(str)) return '(' + str + ')';
    else return str;
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


