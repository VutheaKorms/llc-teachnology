'use strict';

angular.module('app')
    .controller('ProductCategoryDetailCtrl', function($scope, $http, $state, $stateParams) {
        $scope.id = $stateParams.id;
        var API_URL = 'api/categories/';

        function loadData() {
            $http({
                method: 'GET',
                url: API_URL + $scope.id,
            }).then(function (success){
                $scope.categories = success.data;
                console.log(success);
            },function (error){
                console.log(error, " can't get data.");
            });
        }

        loadData();

        $scope.back = function() {
            $state.go("dashboard.productCategory");
        }

    });
