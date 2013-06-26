'use strict';

angular.module('optionCards', ['ocFilters'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',                            { templateUrl: 'index.html' })
      .when('/addDeck.html',                { templateUrl: 'addDeckTemplate.html' })
      .when('/viewDeck.:deckId.html',       { templateUrl: 'viewDeckTemplate.html' })
      .when('/addCard.:deckId.html',        { templateUrl: 'addCardTemplate.html' })
      .when('/viewCard.:deckAndCardId.html',{ templateUrl: 'viewCardTemplate.html' })
      .otherwise({redirectTo: '/'})
    ;
  }])
;

function DeckListCtrl($scope) {
  $scope.decks = capOc.loadDecks();
}

function DeckAddCtrl($scope, $window) {
  $scope.addDeckName = '';

  $scope.addDeck = function() {
    if ($scope.addDeckName !== '') {
      var deckId = capOc.generateUuid();
      capOc.decks[deckId] = { id: deckId, name: $scope.addDeckName, cards: [] }
      capOc.persistDecks();
      $scope.decks = capOc.loadDecks();
      $scope.addDeckName = '';

      $window.location.replace('/');
    }
  }
}

function DeckViewCtrl($scope, $window, $routeParams) {
  $scope.deck = capOc.ng.loadDeckOr404($window, $routeParams.deckId);

//  console.log($scope.deck);
  $scope.filterString = null;
  $scope.filterBmc = { ticks: {}, showBigCanvas: false };
  $scope.filterBmc.ticks[capOc.SEGMENT_KEY_PARTNERS]      = capOc.TICK_EMPTY;
  $scope.filterBmc.ticks[capOc.SEGMENT_KEY_ACTIVITIES]    = capOc.TICK_EMPTY;
  $scope.filterBmc.ticks[capOc.SEGMENT_KEY_RESOURCES]     = capOc.TICK_EMPTY;
  $scope.filterBmc.ticks[capOc.SEGMENT_VALUE_PROPOSITION] = capOc.TICK_EMPTY;
  $scope.filterBmc.ticks[capOc.SEGMENT_CUSTOMER_LOVE]     = capOc.TICK_EMPTY;
  $scope.filterBmc.ticks[capOc.SEGMENT_DIST_CHANNEL]      = capOc.TICK_EMPTY;
  $scope.filterBmc.ticks[capOc.SEGMENT_CUSTOMER_SEGMENT]  = capOc.TICK_EMPTY;
  $scope.filterBmc.ticks[capOc.SEGMENT_COST_STRUCTURE]    = capOc.TICK_EMPTY;
  $scope.filterBmc.ticks[capOc.SEGMENT_REVENUE_STREAM]    = capOc.TICK_EMPTY;
  
  $scope.toggleBmcFilter = function() {
    $scope.filterBmc.showBigCanvas = !$scope.filterBmc.showBigCanvas;
    $('table.big-canvas').width(Math.min($('table.big-canvas').width(),360));
    $('table.big-canvas').height($('table.big-canvas').width()/16*9);
  }

  $scope.toggleBmcTick = function(i, $event) {
    $scope.filterBmc.ticks[i] = ($scope.filterBmc.ticks[i] + 1 ) % 3;
    $event.preventDefault();
    $event.stopPropagation();
  }
}

function CardAddCtrl($scope, $window, $routeParams) {
  $scope.deck = capOc.ng.loadDeckOr404($window, $routeParams.deckId);
  $scope.editCard = new capOc.Card({ deckId: $scope.deck.id, content: '' });

  $scope.addCard = function() {
    $scope.deck.cards.push($scope.editCard);
    capOc.persistDecks();
  }

  $scope.toggleBmcTick = function(i, $event) {
    $scope.editCard.ticks[i] = ($scope.editCard.ticks[i] + 1 ) % 3;
    $event.preventDefault();
    $event.stopPropagation();
  }
}

function CardViewCtrl($scope, $window, $routeParams) {
  if ($routeParams.deckAndCardId === undefined || $routeParams.deckAndCardId.indexOf('.')<0) {
    capOc.ng.redirect404($window, 'Could not find the requested card');
  }

  var params = $routeParams.deckAndCardId.match(/[^.]+/g);
  if (params.length !== 2) {
    capOc.ng.redirect404($window, 'Could not find the requested card');
  }

  $scope.deck = capOc.ng.loadDeckOr404($window, params[0]);
  $scope.editCard = capOc.ng.loadCardOr404($window, params[1], params[0]);

  $scope.updateCard = function() {
//    $scope.deck.cards.push($scope.editCard);
    capOc.persistDecks();
  }

  $scope.toggleBmcTick = function(i, $event) {
    $scope.editCard.ticks[i] = ($scope.editCard.ticks[i] + 1 ) % 3;
    $event.preventDefault();
    $event.stopPropagation();
  }
}


