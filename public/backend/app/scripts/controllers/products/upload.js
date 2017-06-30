

'use strict';

angular.module('app')

    .constant("CSRF_TOKEN", '{{ csrf_token() }}')

    //.controller('ProductUploadCtrl', ['$scope', '$http', function($scope,$http) {
    .controller('ProductUploadCtrl', ['$scope', 'FileUploader', function($scope, FileUploader, CSRF_TOKEN) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'api/test/upload',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]')
            }
        });

        //$scope.submit = function(){
        //    $http({
        //        method: 'POST',
        //        url: 'api/test/upload',
        //
        //        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //    })
        //}



        //uploader.filters.push({
        //    name: 'imageFilter',
        //    fn: function(item /*{File|FileLikeObject}*/, options) {
        //        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        //        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        //    }
        //});

        // CALLBACKS

        //uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //    console.info('onWhenAddingFileFailed', item, filter, options);
        //};
        //uploader.onAfterAddingFile = function(fileItem) {
        //    console.info('onAfterAddingFile', fileItem);
        //};
        //uploader.onAfterAddingAll = function(addedFileItems) {
        //    console.info('onAfterAddingAll', addedFileItems);
        //};
        //uploader.onBeforeUploadItem = function(item) {
        //    console.info('onBeforeUploadItem', item);
        //};
        //uploader.onProgressItem = function(fileItem, progress) {
        //    console.info('onProgressItem', fileItem, progress);
        //};
        //uploader.onProgressAll = function(progress) {
        //    console.info('onProgressAll', progress);
        //};
        //uploader.onSuccessItem = function(fileItem, response, status, headers) {
        //    console.info('onSuccessItem', fileItem, response, status, headers);
        //};
        //uploader.onErrorItem = function(fileItem, response, status, headers) {
        //    console.info('onErrorItem', fileItem, response, status, headers);
        //};
        //uploader.onCancelItem = function(fileItem, response, status, headers) {
        //    console.info('onCancelItem', fileItem, response, status, headers);
        //};
        //uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //    console.info('onCompleteItem', fileItem, response, status, headers);
        //};
        //uploader.onCompleteAll = function() {
        //    console.info('onCompleteAll');
        //};


    }]);





