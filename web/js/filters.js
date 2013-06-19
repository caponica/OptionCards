angular.module('ocFilters', []).filter('ocBmcSegment', function() {
  return function(inputs, toggleBmcTick) {
    var filtered = [];
    angular.forEach(inputs, function(input) {
      var passedAllTests = true;
      for (var tickKey in toggleBmcTick) {
        if (toggleBmcTick.hasOwnProperty(tickKey)) {
          if (toggleBmcTick[tickKey] > 0) {
            if (input.ticks[tickKey] < toggleBmcTick[tickKey] || input.ticks[tickKey] == undefined) {
              passedAllTests = false;
            }
          }
        }
      }
      if (passedAllTests) {
        filtered.push(input);
      }
    });
    return filtered;
  };
});