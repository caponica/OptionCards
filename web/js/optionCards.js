'use strict';

var capOc = {
  cordovaReady:                   false,

  SEGMENT_KEY_PARTNERS:           'kp',
  SEGMENT_KEY_ACTIVITIES:         'ka',
  SEGMENT_KEY_RESOURCES:          'kr',
  SEGMENT_VALUE_PROPOSITION:      'vp',
  SEGMENT_CUSTOMER_LOVE:          'cl',
  SEGMENT_DIST_CHANNEL:           'dc',
  SEGMENT_CUSTOMER_SEGMENT:       'cu',
  SEGMENT_COST_STRUCTURE:         'cs',
  SEGMENT_REVENUE_STREAM:         'rs',

  TICK_EMPTY:                     0,
  TICK_MAYBE:                     1,
  TICK_YES:                       2,

  decks:                          {},
  cards:                          {},

  generateUuid:                   function () {
    return ('000000'+((Math.random()*2176782336)|0).toString(36)).slice(-6);
  },

  loadDecks: function() {
    if (!window.localStorage.getItem('capOcDecks')) {
      return undefined;
    } else {
      this.decks = JSON.parse(window.localStorage.getItem('capOcDecks'));
      return this.decks;
    }
  },
  persistDecks: function() {
    window.localStorage.setItem('capOcDecks', JSON.stringify(this.decks));
  },
  
  lastItemWithoutAComma:          null
}

// Class definitions
capOc.Card = function (initObject) {
  this.id           = capOc.generateUuid();
  this.deckId       = null;
  this.content      = 'default content';
  this.createDate   = '';
  this.ticks        = {};
  this.ticks[capOc.SEGMENT_KEY_PARTNERS]      = capOc.TICK_EMPTY;
  this.ticks[capOc.SEGMENT_KEY_ACTIVITIES]    = capOc.TICK_EMPTY;
  this.ticks[capOc.SEGMENT_KEY_RESOURCES]     = capOc.TICK_EMPTY;
  this.ticks[capOc.SEGMENT_VALUE_PROPOSITION] = capOc.TICK_EMPTY;
  this.ticks[capOc.SEGMENT_CUSTOMER_LOVE]     = capOc.TICK_EMPTY;
  this.ticks[capOc.SEGMENT_DIST_CHANNEL]      = capOc.TICK_EMPTY;
  this.ticks[capOc.SEGMENT_CUSTOMER_SEGMENT]  = capOc.TICK_EMPTY;
  this.ticks[capOc.SEGMENT_COST_STRUCTURE]    = capOc.TICK_EMPTY;
  this.ticks[capOc.SEGMENT_REVENUE_STREAM]    = capOc.TICK_EMPTY;

  $.extend(this, initObject);
}
capOc.Card.prototype = {
}

// Angular helper methods
capOc.ng = {
/**
  * Takes a deckId and tries to load the related Deck. If it cannot be found alert a message to the user and bounce to the homepage.
  */
  loadDeckOr404: function(scope, window, deckId) {
    if (deckId === undefined || capOc.decks[deckId] === undefined) {
      alert('Could not find the deck.');
      window.location.replace('/');
    }
    scope.deck = capOc.decks[deckId];
  }
}
