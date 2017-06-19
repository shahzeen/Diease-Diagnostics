'use strict'
billapp.controller('maintabController', function($scope, $state) {
	console.log('Main tab controller called');
	$scope.logoutBtnClick = function(){
		console.log('Logout button clicked');
		$state.go('login');
	}
});