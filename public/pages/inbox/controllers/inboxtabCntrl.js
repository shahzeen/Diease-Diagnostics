'use strict'
billapp.controller('inboxtabController', function($scope,$http, $uibModal) {

	console.log('On inboxtabController');
	// console.log('weeks In Year = '+moment().isoWeeksInYear());
	$("#menu_inbox").attr("class","active");
	
	$scope.curYear = moment().year();
	$scope.yearoptions = [2017, 2018, 2019, 2020];
	userinboxData($scope.curYear);
	/* sort feature */
	$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverseSort = !$scope.reverseSort; //if true make it false and vice versa
    }
	$scope.yearwiseInboxData = function(bill_year){
		console.log('selected year = '+bill_year);
		userinboxData(bill_year);
	}
	
	function userinboxData(year){
		var id = 1111;
		var inboxURLGET = "/api/v1/user/inbox/id/"+id+"/year/"+year;
		/* http get call */
		$('.loader, .overlay').show();
		$http({
			url: inboxURLGET,
			method: "GET"
		}).success(function(response) {
			$('.loader, .overlay').hide();
			console.log('Inbox data = '+ JSON.stringify(response));
			$scope.inboxData  = response;
			$scope.responseType = typeof response.data;
		});
	}

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
	$scope.openMonthlyBillModal = function (billingyear) {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
			keyboard: false,
			templateUrl: './pages/inbox/templates/monthlyBillDetailsModal.htm',
			controller: 'monthlyBillDetailsModalController',
			resolve:{
				billingyear: function(){
					return billingyear;
				}
			},
			windowClass: 'registerModalWindow'
		});
	}

	$scope.openBillDetailsModal = function (data) {
		// console.log('data = '+JSON.stringify(data));
		$('.loader, .overlay').show();
		var inboxDetailsURLGET = '/api/v1/user/inbox/id/'+data.user_id+'/weekid/'+data.week_id;
		$http({
			url: inboxDetailsURLGET,
			method: "GET"
		}).success(function(response) {
				$('.loader, .overlay').hide();
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