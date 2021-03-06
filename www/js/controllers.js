angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout) {
    var gameBoard = $("#game-board")
    var tiles = $(".tile");
    var drop = $(".tile-drop");
    var placeholder = drop.find('span');
    var range = NUMBERS.length;
    var cards = $('#cards');

    //some constant
    var moveOutAnimation = 'fadeOut';
    var moveInAnimation = 'fadeIn';

    //start new game
    $scope.startNew = startNew;
    $scope.restart = restart;
    getCards();
    startNew();

    //for operator
    makeTilesMovable(tiles, 0, 500);
    //drop area
    makeDroppable();

    //do something when success
    $scope.result = 0;
    $scope.$watch('result', function(){
      if ($scope.result == 21)
        alert('You just won!!');
    })

    //define tile behaviour
    function startNew(){
      drop.text('');
      //create cardsio
      deal();
      $scope.cards = [];
      for (var i=0; i<4; i++){
        $scope.cards.push($scope.deal[i]);
      }
      //wait ng-repeat happen and make tile movable
      $timeout(function(){
        makeTilesMovable(cards.find('.tile'));
      });
    }

    function restart(){
      drop.text('');
      cards.find('.tile').css('opacity', '1');
    }

    function deal(){
      var index = getRandomInt(0, range - 1);
      $scope.deal = NUMBERS[index];
      console.log($scope.deal);
    }

    function makeTilesMovable(tiles, delay, duration){
      tiles.each(function(){
        var $this = $(this);
        $this.click(function(){
          if ($this.css('opacity') != 0) drop.text(drop.text() + $this.text());
          if (!$this.hasClass('operator')) $this.css('opacity', 0);
        });

        $this.css('opacity', '1');

        $this.css({
          'height': $this.width(),
          'line-height': $this.width() - 10 + 'px',
          'background-color': Colors[getRandomInt(0, 10)]
        })

        $this.draggable({
          revert: function () {
            //$this.delay(delay);
            return true
          },
          //revertDuration: duration,
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
      var dropHeight = 60;

      drop.css({
        'line-height': dropHeight + 'px',
        'height': dropHeight + 20
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
          if ($scope.draggingTile && !$scope.draggingTile.hasClass('operator')) $scope.draggingTile.css('opacity', '0');

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

    function getCards(){
      var cardNames = [];
      var temp = CARDS;
      var max = 64;

      for (var i=0; i<4; i++){
        var int = getRandomInt(0,max--);
        cardNames.push(temp[int]);
        temp.splice(int, 1);
      }
      $scope.pokerCards = cardNames;
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


//animation stuff

//$this.removeClass(moveOutAnimation + ' ' + moveInAnimation);
//.addClass(moveOutAnimation);
//setTimeout(function(){
//  $this.removeClass(moveOutAnimation + ' ' + moveInAnimation).addClass(moveInAnimation);
//},1000)

//$scope.draggingTile.remove(moveInAnimation);
//$scope.draggingTile.addClass(moveOutAnimation);
