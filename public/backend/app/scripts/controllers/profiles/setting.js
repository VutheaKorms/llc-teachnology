//'use strict';
//
//angular.module('app')
//    .controller('ProfileCtrl', function($scope, $http, $state, $stateParams) {
//        $scope.id = $stateParams.id;
//        var API_URL = 'api/users/';
//
//        function loadData() {
//            $http({
//                method: 'GET',
//                url: API_URL + $scope.id,
//            }).then(function (success){
//                $scope.brands = success.data;
//                console.log(success);
//            },function (error){
//                console.log(error, " can't get data.");
//            });
//        }
//
//        loadData();
//
//        $scope.goBack = function() {
//            window.history.back();
//        }
//
//    });


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
    .controller('SettingCtrl', function(dataFactory,$scope, $state, $stateParams, Notification) {
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
                dataFactory.httpRequest('api/users?search='+$scope.searchText+'&page='+pageNumber).then(function(data) {
                    $scope.data = data.data;
                    $scope.totalItems = data.total;
                    console.log($scope.data);
                });
            }else{
                dataFactory.httpRequest('api/users?page='+pageNumber).then(function(data) {
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
            email: $scope.email,
            password: $scope.password,
        }

        $scope.saveAdd = function(){
            $scope.loading = true;
            dataFactory.httpRequest('api/users','POST',{},$scope.form).then(function(data) {
                $scope.data.push(data);
                $(".modal").modal("hide");
                Notification.success('Successfully saved');
                $scope.loading = false;
                clear();
                getResultsPage(1);
            });
        }

        $scope.edit = function(id){
            dataFactory.httpRequest('api/users/'+id+'/edit').then(function(data) {
                console.log(data);
                $scope.form = data;
            });
        }
        $scope.saveEdit = function(){
            $scope.loading = true;
            dataFactory.httpRequest('api/users/'+$scope.form.id,'PUT',{},$scope.form).then(function(data) {
                $(".modal").modal("hide");
                $scope.data = apiModifyTable($scope.data,data.id,data);
                console.log($scope.data);
                Notification.success('Successfully saved');
                $scope.loading = false;
                getResultsPage(1);
            });
        }

        $scope.show = function(id){
            dataFactory.httpRequest('api/users/'+id).then(function(data) {
                console.log(data);
                $scope.form = data;
            });
        }

        $scope.remove = function(item,index){
            var result = confirm("Are you sure delete this user?");
            if (result) {
                dataFactory.httpRequest('api/users/'+item.id,'DELETE').then(function(data) {
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
            $scope.form.name = "";
            $scope.form.email = "";
            $scope.form.password ="";
        }

    });

