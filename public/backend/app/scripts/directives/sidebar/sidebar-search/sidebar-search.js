'use strict';


angular.module('app')
  .directive('sidebarSearch',function() {
    return {
      templateUrl:'backend/app/scripts/directives/sidebar/sidebar-search/sidebar-search.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'home';
      }
    }
  });
