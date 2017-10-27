'use strict'
billapp.controller('loginPageController', function($scope, $http, $state, $modal) {
	
	$scope.loginBtnclicked = function(){
		console.log('on Login btn click');
		if($scope.usernameModel == 'room204c' && $scope.passwordModel == 'welcome'){
			console.log('success');
			$state.go('maintab.dashboard');
		}else{
			console.log('err');
			swal({
				   title: "Wrong Username or Password",
				   type: "error" });
		}
	}

	$scope.registerUser = function(){
		var modalInstance = $modal.open({
			backdrop: 'static',
			keyboard: false,
			templateUrl: './pages/login/templates/register.htm',
			controller: 'registerPageController',
			windowClass: 'registerModalWindow'
		});
	}
	
});
