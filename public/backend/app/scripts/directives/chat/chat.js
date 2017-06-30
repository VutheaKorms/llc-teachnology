'use strict';

angular.module('app')
	.directive('chat',function(){
		return {
        templateUrl:'backend/app/scripts/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
    	}
	});


