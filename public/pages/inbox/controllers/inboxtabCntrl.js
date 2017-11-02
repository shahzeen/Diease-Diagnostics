'use strict'
billapp.controller('inboxtabController', function($scope,$http) {

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
			
			$scope.billCalculate(response);
		});

		 $scope.remove = function (data,index) {
			var billdeleteURLPUT = "/api/v1/record/update/"+data.doc_id;
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
						swal({
							   title: "Please Try Again",
							   text: "Internal Server Error",
							   type: "error" });					
					}else{
						console.log('success else');
						
						if(response.status == "200"){
							swal({
								   title: "Success",
								   text: "Bill details deleted successfully",
								   type: "success" });
							/* http get call */
							$http({
								url: billdetailsURLGET,
								method: "GET"
							}).success(function(response) {
									console.log('List of bills - Success response recieved. '+ JSON.stringify(response)); /* printing API response on console - unit testing purpose*/
									$scope.bills  = response;
									
									$scope.billCalculate(response);
								});	
						}	
						else if(response.status == "422"){
							swal({
								   title: "Please Try Again",
								   text: "Internal Server Error",
								   type: "warning" });
						}
					}
				})
				.error(function(response) {//err handling
					console.log('err');
					console.log('Error response recieved '+ JSON.stringify(response));
					swal({
						   title: "Internal Server Error",
						   type: "error" });
				});
         };
});