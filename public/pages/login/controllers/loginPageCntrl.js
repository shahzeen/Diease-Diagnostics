'use strict'
billapp.controller('loginPageController', function($scope, $http, $state, $uibModal, loginHttpService, authService) {
	
	// $scope.loginBtnclicked = function(){
	// 	console.log('on Login btn click');
	// 	if($scope.usernameModel == 'room204c' && $scope.passwordModel == 'welcome'){
	// 		console.log('success');
	// 		$state.go('maintab.dashboard');
	// 	}else if($scope.usernameModel == '1111' && $scope.passwordModel == 'welcome') {
	// 		$state.go('tab.inbox');
	// 	}else{
	// 		console.log('err');
	// 		swal({
	// 			   title: "Wrong Username or Password",
	// 			   type: "error" });
	// 	}
	// }
	$scope.loginBtnclicked = function () {
		var user = JSON.stringify({
			"username": $scope.usernameModel,
			"password": $scope.passwordModel
		});

		// $state.go('maintab.home.winding');
		if ($scope.usernameModel != undefined && $scope.passwordModel != undefined) {
			loginHttpService.loginAPI(user)
			.then(function (data) {
				var apiKey = data.data.authtoken;
				var unserInfo = data.data.userinfo;
				var firstname = unserInfo.firstname;
				var lastname = unserInfo.lastname;
				var userId=unserInfo.userid;
				if (apiKey !== undefined && typeof apiKey === "string") {
					authService.apiKey = apiKey;
					authService.firstname = firstname;
					authService.lastname = unserInfo.lastname;

					console.log('loginPageController::loginAPI:: User name is = '+authService.firstname+' '+authService.lastname);
					if($scope.usernameModel == 'admin' && $scope.passwordModel == 'admin')
						$state.go('tab.inbox');
					else
						$state.go('maintab.dashboard');
				}
			}, function (errResp) {
				try {
					switch(errResp.status){
                        case 404:
                            $scope.openModal('Login', 'Username does not exist. Please create an account');
                        	break;

                        case 422:
                            $scope.openModal('Login', 'Password is incorrect.');
                        	break;

                        case -1:
                            $scope.openModal('Login', 'Network is Not Connected. Please check your Network Connection');
                        	break;

                        default:
                            $scope.openModal('Login', 'Error while login.');
					}
				} catch (ex) {
					console.log('loginPageController::loginAPI:: Error in login resp :: '+ex);
				}
			});
		}
		else {
				if ($scope.usernameModel == undefined && $scope.passwordModel == undefined) {
					$scope.openModal('Login', 'Please enter username and password.');
				} else {
					if ($scope.usernameModel != undefined && $scope.passwordModel == undefined) {
						$scope.openModal('Login', 'Please enter password.');
					} else {
						if ($scope.usernameModel == undefined && $scope.passwordModel != undefined) {
							$scope.openModal('Login', 'Please enter username.');
						}
					}
				}
			}
	}

	$scope.openModal = function (titleName, message) {
		var modalInstance = $uibModal.open({
			templateUrl: './pages/common/templates/commonModalView.htm',
			controller: 'commonModalViewController',
			resolve: {
				titleNameVal: function () {
					return titleName;
				},
				messageVal: function () {
					return message;
				}
			},
			windowClass: 'smallModalWindow'
		})
	};
	$scope.registerUser = function(){
		var modalInstance = $uibModal.open({
			backdrop: 'static',
			keyboard: false,
			templateUrl: './pages/login/templates/register.htm',
			controller: 'registerPageController',
			windowClass: 'registerModalWindow'
		});
	}
	
});
