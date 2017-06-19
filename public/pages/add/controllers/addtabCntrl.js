'use strict'
billapp.controller('addtabController', function($scope,$http) {

	console.log('On addtabController');
	
	$("#menu_home").attr("class","");
	$("#menu_add").attr("class","active");
	$("#menu_view").attr("class","");
	
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
	
	var billdetailsURLPOST = "http://localhost:8001/api/v1/record/add";
	function recordSubmit(){
		
		console.log('submit button clicked');
		/*console.log('payer = '+$scope.bill_payer.name);
		console.log('date = '+$scope.bill_date);
		console.log('amount = '+$scope.bill_amount.toString());
		console.log('desc = '+$scope.bill_desc);*/
		
		var billdetailsJSON = {
				
				"PAYER": $scope.bill_payer.name,
				"BILLDATE": $scope.bill_date,
				"AMOUNT": $scope.bill_amount.toString(),
				"ARNAB": $scope.arnab1001.toString(),
				"BIPRA": $scope.bipra1005.toString(),
				"SAURAV": $scope.saurav1002.toString(),
				"SAYAN": $scope.sayan1004.toString(),
				"TANMOY": $scope.tanmoy1003.toString(),
				"BILLDESC": $scope.bill_desc
		}
		
		var postFunction = $http({
			    url: billdetailsURLPOST,
			    dataType:"json",
			    crossDomain: true,
			    header : {"Access-Control-Allow-Headers " : "Content-Type "},
			    header : {"X-Requested-With ": "Content-Type" },
			    data: billdetailsJSON,
			    method: "POST"
			 })
			.success(function(response) {//success handling
					console.log('Success response recieved '+ JSON.stringify(response));
					
					if(response.status == "500"){
						console.log('success if');
						swal({
							   title: response.message,
							   type: "error" });					
					}else{
						console.log('success else');
						
						if(response.status == "200"){
							swal({
								   title: response.message,
								   type: "success" });	
						}	
						else if(response.status == "422"){
							swal({
								   title: response.message,
								   type: "warning" });
						}	
						
						$scope.recordReset();
					}
				})
				.error(function(response) {//err handling
					console.log('err');
					console.log('Error response recieved '+ JSON.stringify(response));
					swal({
						   title: response.message,
						   type: "error" });
				});
	}
	$scope.recordSubmit = recordSubmit;
	
	function recordReset(){
		console.log('reset button clicked');
		$scope.bill_payer = '';
		$scope.bill_date = '';
		$scope.bill_amount = '';
		$scope.arnab1001 = '';
		$scope.bipra1005 = '';
		$scope.saurav1002 = '';
		$scope.sayan1004 = '';
		$scope.tanmoy1003 = '';
		$scope.bill_desc = '';
	}
	$scope.recordReset = recordReset;

});