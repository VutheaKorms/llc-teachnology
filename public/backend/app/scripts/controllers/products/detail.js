'use strict';

angular.module('app')
    .controller('ProductDetailCtrl', function($scope, $http, $state, $stateParams, Notification) {
        $scope.id = $stateParams.id;
        var API_URL = 'api/products/';

        function loadData() {
            $http({
                method: 'GET',
                url: API_URL + $scope.id,
            }).then(function (success){
                $scope.products = success.data;
                console.log(success);
            },function (error){
                console.log(error, " can't get data.");
            });
        }

        loadData();

        $scope.goBack = function() {
            window.history.back();
        };

        $scope.back = function() {
            $state.go("dashboard.product");
        }

    });
