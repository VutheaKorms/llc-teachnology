'use strict';

angular.module('app')
	.directive('timeline',function() {
    return {
        templateUrl:'backend/app/scripts/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
