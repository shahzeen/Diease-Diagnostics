'use strict'
billapp.controller('maintabController', function($scope, $state) {
	console.log('Main tab controller called');
	$scope.billpayer = [
                   		{ 	"id": "1001",
                   			"name": "Arnab"
                   		},
                   		{ 	"id": "1002",
                   			"name": "Saurav"
                   		},
                   		{ 	"id": "1003",
                   			"name": "Tanmoy"
                   		},
                   		{ 	"id": "1004",
                   			"name": "Sayan"
                   		},
                   		{ 	"id": "1005",
                   			"name": "Bipra"
                   		}
                   ];
	
	$scope.logoutBtnClick = function(){
		console.log('Logout button clicked');
		$state.go('login');
	}
});