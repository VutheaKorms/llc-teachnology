'use strict';

angular.module('app')
    .controller('BrandDetailCtrl', function($scope, $http, $state, $stateParams) {
        $scope.id = $stateParams.id;
        var API_URL = 'api/brands/';

        function loadData() {
            $http({
                method: 'GET',
                url: API_URL + $scope.id,
            }).then(function (success){
                $scope.brands = success.data;
                console.log(success);
            },function (error){
                console.log(error, " can't get data.");
            });
        }

        loadData();

        $scope.back = function() {
            $state.go("dashboard.brand");
        }

    });
