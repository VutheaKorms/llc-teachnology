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
    .controller('ProductCtrl', function(dataFactory,$scope, $state, Notification) {

        $scope.data = [];
        $scope.libraryTemp = {};
        $scope.totalItemsTemp = {};
        $scope.totalItems = 0;

        $scope.selectedBrand = null;
        $scope.brands = [];
        $scope.selectedCategory = null;
        $scope.productCategory = [];


        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };
        getResultsPage(1);

        function getResultsPage(pageNumber) {
            if(! $.isEmptyObject($scope.libraryTemp)){
                dataFactory.httpRequest('api/products?search='+$scope.searchText+'&page='+pageNumber).then(function(data) {
                    $scope.data = data.data;
                    $scope.totalItems = data.total;
                    console.log($scope.data);
                });
            }else{
                dataFactory.httpRequest('api/products?page='+pageNumber).then(function(data) {
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
            product_name: $scope.product_name,
            product_code: $scope.product_code,
            price: $scope.price,
            brand_id: $scope.selectedBrand,
            category_id: $scope.selectedCategory,
            description: $scope.description
        }

        $scope.saveAdd = function(){
            $scope.form.brand_id = $scope.selectedBrand;
            $scope.form.category_id= $scope.selectedCategory;
            dataFactory.httpRequest('api/products','POST',{},$scope.form).then(function(data) {
                $scope.data.push(data);
                Notification.success('Successfully saved');
                $(".modal").modal("hide");
                clear();
                getResultsPage(1);
            });
        }
        $scope.edit = function(id){
            dataFactory.httpRequest('api/products/'+id+'/edit').then(function(data) {
                console.log(data);
                $scope.form = data;
                $scope.selectedBrand = data.brand_id;
                $scope.selectedCategory = data.category_id;
            });
        }
        $scope.saveEdit = function(){
            $scope.form.brand_id = $scope.selectedBrand;
            $scope.form.category_id= $scope.selectedCategory;
            dataFactory.httpRequest('api/products/'+$scope.form.id,'PUT',{},$scope.form).then(function(data) {
                $(".modal").modal("hide");
                $scope.data = apiModifyTable($scope.data,data.id,data);
                Notification.success('Successfully saved');
                console.log($scope.data);
                getResultsPage(1);
            });
        }

        $scope.remove = function(item,index){
            var result = confirm("Are you sure delete this item?");
            if (result) {
                dataFactory.httpRequest('api/products/'+item.id,'DELETE').then(function(data) {
                    $scope.data.splice(index,1);
                    Notification.success('Successfully deleted');
                    getResultsPage(1);
                });
            }
        }

        $scope.show = function(id){
            dataFactory.httpRequest('api/products/'+id).then(function(data) {
                console.log(data);
                $scope.form = data;
            });
        }

        $scope.goBack = function() {
            window.history.back();
        };

        function loadBrand(status) {
            dataFactory.httpRequest('api/brands/status/' + status).then(function(data) {
                $scope.brands = data;
                console.log($scope.brands);
            });
        }

        loadBrand(1);

        function loadCategory(status) {
            dataFactory.httpRequest('api/categories/status/' + status).then(function(data) {
                $scope.productCategory = data;
                console.log($scope.productCategory);
            });
        }

        loadCategory(1);

        function clear() {
            $scope.form.description = "";
            $scope.form.product_name= "";
            $scope.form.product_code="";
            $scope.form.price= "";
            $scope.selectedBrand = null;
            $scope.selectedCategory = null;
        }

        $scope.saveDisable = function(){
            $scope.loading = true;
            dataFactory.httpRequest('api/products/disable/'+$scope.form.id,'PUT',{},$scope.form).then(function(data) {
                $(".modal").modal("hide");
                $scope.data = apiModifyTable($scope.data,data.id,data);
                console.log($scope.data);
                Notification.success('Successfully saved');
                $scope.loading = false;
                getResultsPage(1);
            });
        }

    });
