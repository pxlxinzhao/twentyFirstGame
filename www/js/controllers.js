angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout) {
    var gameBoard = $("#game-board")
    var tiles = $(".tile");
    var drop = $(".tile-drop");
    var tileWidth = null;
    var placeholder = drop.find('span');
    var range = NUMBERS.length;
    var cards = $('#cards');

    //some constant
    var moveOutAnimation = 'fadeOut';
    var moveInAnimation = 'fadeIn';

    //start new game
    $scope.startNew = startNew;
    startNew();

    //for operator
    makeTilesMovable(tiles, 0, 500);

    //do something when success
    $scope.result = 0;
    $scope.$watch('result', function(){
      if ($scope.result == 21)
        alert('You just won!!');
    })

    //define tile behaviour


    function startNew(){

      cards.find('.tile').removeClass(moveOutAnimation + ' ' + moveInAnimation).addClass(moveOutAnimation);

      setTimeout(function () {
        deal();
        $scope.cards = [];

        for (var i=0; i<4; i++){
          $scope.cards.push($scope.deal[i]);
        }

        $timeout(function(){
          console.log('making movable');
          makeTilesMovable(cards.find('.tile'), 2000, 0);
        });
      },800)

    }

    function deal(){
      var index = getRandomInt(0, range - 1);
      $scope.deal = NUMBERS[index];
      console.log($scope.deal);
    }

    function makeTilesMovable(tiles, delay, duration){
      console.log(tiles);

      tiles.each(function(){
        var $this = $(this);
        //$this.removeClass(moveOutAnimation + ' ' + moveInAnimation);
          //.addClass(moveOutAnimation);
        setTimeout(function(){
          $this.removeClass(moveOutAnimation + ' ' + moveInAnimation).addClass(moveInAnimation);
        },1000)


        if (!tileWidth){
          tileWidth = $this.width();
        }
        $this.css({
          'height': tileWidth,
          'line-height': tileWidth - 10 + 'px',
          'background-color': Colors[getRandomInt(0, 10)]
        })
        $this.draggable({
          revert: function () {
            $this.delay(delay);
            return true
          },
          revertDuration: duration,
          start: function( event, ui ) {
            $scope.draggingTile = $this;
          },
          stop: function (event, ui) {
          },
          containment: gameBoard
        });
      });
    }

    function makeDroppable(){
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
          //make tile disappear
          if ($scope.draggingTile)
            $scope.draggingTile.remove(moveInAnimation);
            $scope.draggingTile.addClass(moveOutAnimation);
        },
        over: function(){
          drop.addClass('hover');
          placeholder.remove();
        },
        out: function(){
          drop.removeClass('hover');
        }
      });
    }
  })

.controller('ChatsCtrl', function($scope, Chats) {
  //$scope.$on('$ionicView.enter', function(e) {});

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
