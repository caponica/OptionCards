'use strict';

angular.module('optionCards', ['ocFilters'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',                          { templateUrl: 'index.html' })
      .when('/addDeck.html',              { templateUrl: 'addDeckTemplate.html' })
      .when('/view.:deckId.html',         { templateUrl: 'viewDeckTemplate.html' })
      .when('/addCard.:deckId.html',      { templateUrl: 'addCardTemplate.html' })
      .when('/view.:deckId.:cardId.html', { templateUrl: 'viewCardTemplate.html' })
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
      capOc.decks[deckId] = { id: deckId, name: $scope.addDeckName }
      capOc.persistDecks();
      $scope.decks = capOc.loadDecks();
      $scope.addDeckName = '';

      $window.location.replace('/');
    }
  }
}

function DeckViewCtrl($scope, $window) {
  $scope.deck = { id: 'abcdef', name: 'Sample deck', cards: [ 
    new capOc.Card({id: 'abc', content: 'Bob can intro us to Acme Widgets Inc', ticks: { kp: capOc.TICK_YES, rs: capOc.TICK_YES }}) , 
    new capOc.Card({id: 'def', content: 'Buy a shiny new car and let customers drive it around', ticks: { ka: capOc.TICK_MAYBE, kr: capOc.TICK_YES, vp: capOc.TICK_YES }}),
    new capOc.Card({id: 'ghi', content: 'Launch tumblr site to appeal to lolcat fanz', ticks: { dc: capOc.TICK_MAYBE, cu: capOc.TICK_YES } }),
    new capOc.Card({id: 'jkl', content: 'Get out of the building to meet some customers', ticks: { cu: capOc.TICK_YES } }),
    new capOc.Card({id: 'mno', content: 'Jump on a bandwagon and drive around', ticks: { cl: capOc.TICK_MAYBE, rs: capOc.TICK_MAYBE } })
  ] };

  console.log($scope.deck);
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
  
  $scope.addCard = function() {
    $scope.deck.cards.push(new capOc.Card({content: 'An example card', ticks: { dc: capOc.TICK_MAYBE, rs: capOc.TICK_MAYBE } }));
  }

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
