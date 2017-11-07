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
	// $scope.weekNumberfilter = function(response,w_no){
	// 	$scope.filteredArr = [];
	// 	response.data.filter(function (bill){
	// 		$scope.weekid = "Y2017W"+w_no;
	// 		console.log('weekid = '+$scope.weekid+", bill.WEEKID = "+bill.WEEKID);
	// 		return bill.WEEKID === $scope.weekid;
	// 	}, this)
	// 	.forEach(function(filteredData){
	// 		$scope.filteredArr.push(filteredData);
	// 		console.log('filteredArr = '+JSON.stringify($scope.filteredArr));
	// 	});
	// }
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
		 $scope.remove = function (data,index) {
			var billdeleteURLPUT = "/api/v1/record/update/"+data._id;
			$scope.dt = new Date();

			var billdeleteJSON = {
				"DELETED_DATE": $scope.dt
			}
			
			console.log('url = '+billdeleteURLPUT);
			console.log('billupdateJSON = '+JSON.stringify(billdeleteJSON));
			var postFunction = $http({
					url: billdeleteURLPUT,
					dataType:"json",
					crossDomain: true,
					header : {"Access-Control-Allow-Headers " : "Content-Type "},
					header : {"X-Requested-With ": "Content-Type" },
					data: billdeleteJSON,
					method: "PUT"
				})
				.success(function(response) {//success handling
					console.log('Success response recieved '+ JSON.stringify(response));
					
					if(response.status == "500"){
						console.log('success if');
						$scope.openModal("Delete Bill", "Please Try Again later");
						// swal({
						// 	   title: "Please Try Again",
						// 	   text: "Internal Server Error",
						// 	   type: "error" });					
					}else{
						console.log('success else');
						
						if(response.status == "200"){
							$scope.openModal("Delete Bill", "Bill details deleted successfully");
							// swal({
							// 	   title: "Success",
							// 	   text: "Bill details deleted successfully",
							// 	   type: "success" });	
						}	
						else if(response.status == "422"){
							$scope.openModal("Delete Bill", "Please Try Again later");
							// swal({
							// 	   title: "Please Try Again",
							// 	   text: "Internal Server Error",
							// 	   type: "warning" });
						}
					}
				})
				.error(function(response) {//err handling
					console.log('err');
					console.log('Error response recieved '+ JSON.stringify(response));
					$scope.openModal("Delete Bill", "Please Try Again later");
					// swal({
					// 	   title: "Internal Server Error",
					// 	   type: "error" });
				});
         };
	$scope.openAddBillModal = function () {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
			keyboard: false,
			templateUrl: './pages/inbox/templates/addBillDetailsModal.htm',
			controller: 'addBillDetailsModalController',
			windowClass: 'registerModalWindow'
		});
	}
});