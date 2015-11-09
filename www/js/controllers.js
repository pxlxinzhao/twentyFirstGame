angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state) {
    var gameBoard = $("#game-board")
    var tiles = $(".tile");
    var drop = $(".tile-drop");
    var tileWidth = null;
    var placeholder = drop.find('span');
    var range = NUMBERS.length;
    var cards = $('#cards');

    //start new game
    $scope.startNew = startNew;
    deal();

    //do something when success
    $scope.result = 0;
    $scope.$watch('result', function(){
      if ($scope.result == 21)
        alert('You just won!!');
    })

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

    function startNew(){
      //cards.html('<div ng-include="\'templates/cards.tpl.html\'"></div>');
      console.log('start new');
      $state.transitionTo($state.current, null, {reload: true, notify:true});

    }

    function deal(){
      var index = getRandomInt(0, range - 1);
      $scope.deal = NUMBERS[index];
    }

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
