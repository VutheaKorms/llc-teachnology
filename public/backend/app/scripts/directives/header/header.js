'use strict';

angular.module('app')
	.directive('header',function(){
		return {
        templateUrl:'backend/app/scripts/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});


