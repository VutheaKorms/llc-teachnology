'use strict';

angular.module('app')
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'backend/app/scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        
        $scope.check = function(x){
          
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;

          else
            $scope.collapseVar = x;
            console.log("dddd" + $scope.collapseVar);
        };

      }
    }
  }]);
