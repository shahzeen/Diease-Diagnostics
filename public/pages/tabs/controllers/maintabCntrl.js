'use strict'
billapp.controller('maintabController', function($scope, $state, $uibModal, loginHttpService, authService) {
	console.log('Main tab controller called');
	// $scope.billpayer = [
    //                		{ 	"id": "1001",
    //                			"name": "Arnab"
    //                		},
    //                		// { 	"id": "1002",
    //                		// 	"name": "Saurav"
    //                		// },
    //                		{ 	"id": "1003",
    //                			"name": "Tanmoy"
    //                		},
    //                		{ 	"id": "1004",
    //                			"name": "Sayan"
    //                		},
    //                		// { 	"id": "1005",
    //                		// 	"name": "Bipra"
    //                		// }
    //                ];

	$scope.about = function () {
		console.log('opening pop up');
		var modalInstance = $uibModal.open({
			templateUrl: './pages/about/templates/abouttab.htm',
			controller: 'abouttabController',
		});
	}

	// $scope.logoutBtnClick = function(){
	// 	console.log('Logout button clicked');
	// 	$state.go('login');
    // }
    $scope.logoutBtnClick = function(){
		$('.loader, .overlay').show();
		loginHttpService.logoutAPI()
		.then(function() {
			$('.loader, .overlay').hide();
			authService.clear();
			$state.go('login');
		});
	};
});