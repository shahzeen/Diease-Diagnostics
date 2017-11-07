'use strict'
billapp.controller('inboxtabController', function($scope,$http, $uibModal) {

	console.log('On inboxtabController');
	
	$("#menu_inbox").attr("class","active");
	// $("#menu_billentry").attr("class","");
	// $("#menu_billupdate").attr("class","");
	
	$scope.curdt = new Date().getMonth();
	
	/* sort feature */
	$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverseSort = !$scope.reverseSort; //if true make it false and vice versa
    }
	
	var id = 1111;
	var inboxURLGET = "/api/v1/user/inbox/id/"+id;
	/* http get call */
	$http({
		url: inboxURLGET,
		method: "GET"
	}).success(function(response) {
			console.log('inbox - Success response recieved. '+ JSON.stringify(response)); /* printing API response on console - unit testing purpose*/
			$scope.inboxData  = response;
		});

		$scope.openModal= function(titleName, message){
			var modalInstance= $uibModal.open({
			backdrop: 'static',
			keyboard: false,
			templateUrl: './pages/common/templates/commonModalView.htm',
				controller: 'commonModalViewController',
				resolve:{
					titleNameVal: function(){
						return titleName;
					},
					messageVal: function(){
						return message;
					}
				},
				windowClass: 'smallModalWindow'
			})
		}
	$scope.openAddBillModal = function () {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
			keyboard: false,
			templateUrl: './pages/inbox/templates/addBillDetailsModal.htm',
			controller: 'addBillDetailsModalController',
			windowClass: 'registerModalWindow'
		});
	}

	$scope.openBillDetailsModal = function (data) {
		// console.log('data = '+JSON.stringify(data));
		var inboxDetailsURLGET = '/api/v1/user/inbox/id/'+data.user_id+'/weekid/'+data.week_id;
		$http({
			url: inboxDetailsURLGET,
			method: "GET"
		}).success(function(response) {
				// console.log('inbox ddetails = '+ JSON.stringify(response));
				$scope.inboxDetails  = response.data;
				var modalInstance = $uibModal.open({
					backdrop: 'static',
					keyboard: false,
					templateUrl: './pages/inbox/templates/billDetailsModal.htm',
					controller: 'billDetailsModalController',
					resolve:{
						rowData: function(){
							return data;
						},
						inboxDetails: function(){
							return $scope.inboxDetails;
						}
					},
					windowClass: 'mediumModalWindow'
				});
			});
	}
});