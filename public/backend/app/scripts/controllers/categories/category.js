'use strict';

angular.module('app')
    .factory('dataFactory', function ($http) {
        var myService = {
            httpRequest: function(url,method,params,dataPost,upload) {
                var passParameters = {};
                passParameters.url = url;
                if (typeof method == 'undefined'){
                    passParameters.method = 'GET';
                }else{
                    passParameters.method = method;
                }
                if (typeof params != 'undefined'){
                    passParameters.params = params;
                }
                if (typeof dataPost != 'undefined'){
                    passParameters.data = dataPost;
                }
                if (typeof upload != 'undefined'){
                    passParameters.upload = upload;
                }
                var promise = $http(passParameters).then(function (response) {
                    if(typeof response.data == 'string' && response.data != 1){
                        if(response.data.substr('loginMark')){
                            location.reload();
                            return;
                        }
                        $.gritter.add({
                            title: 'Application',
                            text: response.data
                        });
                        return false;
                    }
                    if(response.data.jsMessage){
                        $.gritter.add({
                            title: response.data.jsTitle,
                            text: response.data.jsMessage
                        });
                    }
                    return response.data;
                },function(){
                    $.gritter.add({
                        title: 'Application',
                        text: 'An error occured while processing your request.'
                    });
                });
                return promise;
            }
        };
        return myService;
    })
    .controller('ProductCategoryCtrl', function(dataFactory,$scope, $state, $stateParams, Notification) {
        $scope.id = $stateParams.id;

        $scope.data = [];
        $scope.libraryTemp = {};
        $scope.totalItemsTemp = {};
        $scope.totalItems = 0;

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };
        getResultsPage(1);

        function getResultsPage(pageNumber) {
            if(! $.isEmptyObject($scope.libraryTemp)){
                dataFactory.httpRequest('api/categories?search='+$scope.searchText+'&page='+pageNumber).then(function(data) {
                    $scope.data = data.data;
                    $scope.totalItems = data.total;
                    console.log($scope.data);
                });
            }else{
                dataFactory.httpRequest('api/categories?page='+pageNumber).then(function(data) {
                    $scope.data = data.data;
                    $scope.totalItems = data.total;
                    console.log($scope.data);
                });
            }
        }

        $scope.searchDB = function(){
            if($scope.searchText.length >= 1){
                if($.isEmptyObject($scope.libraryTemp)){
                    $scope.libraryTemp = $scope.data;
                    $scope.totalItemsTemp = $scope.totalItems;
                    $scope.data = {};
                }
                getResultsPage(1);
            }else{
                if(! $.isEmptyObject($scope.libraryTemp)){
                    $scope.data = $scope.libraryTemp ;
                    $scope.totalItems = $scope.totalItemsTemp;
                    $scope.libraryTemp = {};
                }
                getResultsPage(1);
            }
        }

        $scope.form = {
            name: $scope.name,
            brand_id: $scope.brand_id,
            description: $scope.description
        }

        $scope.saveAdd = function(){
            $scope.loading = true;
            $scope.form.brand_id = $scope.selectedBrand;
            dataFactory.httpRequest('api/categories','POST',{},$scope.form).then(function(data) {
                $scope.data.push(data);
                $(".modal").modal("hide");
                Notification.success('Successfully saved');
                $scope.loading = false;
                clear();
                getResultsPage(1);
            });
        }

        $scope.edit = function(id){
            dataFactory.httpRequest('api/categories/'+id+'/edit').then(function(data) {
                console.log(data);
                $scope.form = data;
                $scope.selectedBrand = data.brand_id;
            });
        }
        $scope.saveEdit = function(){
            $scope.loading = true;
            $scope.form.brand_id = $scope.selectedBrand;
            dataFactory.httpRequest('api/categories/'+$scope.form.id,'PUT',{},$scope.form).then(function(data) {
                $(".modal").modal("hide");
                $scope.data = apiModifyTable($scope.data,data.id,data);
                console.log($scope.data);
                Notification.success('Successfully saved');
                $scope.loading = false;
                getResultsPage(1);
            });
        }

        $scope.saveDisable = function(){
            $scope.loading = true;
            dataFactory.httpRequest('api/categories/disable/'+$scope.form.id,'PUT',{},$scope.form).then(function(data) {
                $(".modal").modal("hide");
                $scope.data = apiModifyTable($scope.data,data.id,data);
                console.log($scope.data);
                Notification.success('Successfully saved');
                $scope.loading = false;
                getResultsPage(1);
            });
        }

        $scope.show = function(id){
            dataFactory.httpRequest('api/categories/'+id).then(function(data) {
                console.log(data);
                $scope.form = data;
            });
        }

        $scope.remove = function(item,index){
            var result = confirm("Are you sure delete this brand?");
            if (result) {
                dataFactory.httpRequest('api/categories/'+item.id,'DELETE').then(function(data) {
                    Notification.success('Successfully deleted');
                    $scope.data.splice(index,1);
                    getResultsPage(1);
                });
            }
        }

        $scope.goBack = function() {
            window.history.back();
        };

        function clear() {
            $scope.form.name = null;
            $scope.selectedBrand = null;
            $scope.form.description = null;
        }

        $scope.selectedBrand = null;
        $scope.brands = [];

        function loadBrand(status) {
            dataFactory.httpRequest('api/brands/status/' + status).then(function(data) {
                $scope.brands = data;
                console.log($scope.brands);
            });
        }

        loadBrand(1);

    });
