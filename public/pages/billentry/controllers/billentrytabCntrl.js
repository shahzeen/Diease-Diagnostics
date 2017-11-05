'use strict'
billapp.controller('billentrytabController', function($scope,$http,$filter) {

	console.log('On billentrytabController');
	
	$("#menu_dashboard").attr("class","");
	$("#menu_billentry").attr("class","active");
	$("#menu_billupdate").attr("class","");
	
	var billdetailsURLPOST = "/api/v1/record/add";
	function recordSubmit(){
		
		console.log('submit button clicked');

		$scope.num = (Math.floor(Math.random() * 1000000));
		$scope.billid=$scope.bill_payer.id+$scope.num;
		$scope.dt = new Date($scope.bill_date);

		/*console.log('bill-id = '+$scope.billid);
		console.log('payer = '+$scope.bill_payer.name);
		console.log('date = '+$scope.bill_date);
		console.log('amount = '+$scope.bill_amount.toString());
		console.log('desc = '+$scope.bill_desc);*/
		
		var billdetailsJSON = {
				"TYPE": "USER_GROUP",
				"BILLID": $scope.billid,
				"PAYER": $scope.bill_payer.name,
				"BILLDATE": $scope.dt,
				"AMOUNT": $scope.bill_amount,
				"ARNAB": $scope.arnab1001,
				"BIPRA": $scope.bipra1005,
				"SAURAV": $scope.saurav1002,
				"SAYAN": $scope.sayan1004,
				"TANMOY": $scope.tanmoy1003,
				"BILLDESC": $scope.bill_desc,
  				"DELETED_DATE": null
		}
		//console.log('billdetailsJSON = '+JSON.stringify(billdetailsJSON));
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