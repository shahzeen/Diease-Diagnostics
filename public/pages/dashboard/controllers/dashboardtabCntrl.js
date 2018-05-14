'use strict'
billapp.controller('dashboardtabController', function($scope,$http,$uibModal) {

	console.log('On dashboardtabController');
	
	$("#menu_dashboard").attr("class","active");
	$("#menu_billentry").attr("class","");
	$("#menu_billupdate").attr("class","");
	
	$scope.curdt = new Date().getMonth();
	$scope.openAddBillModal = function () {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
			keyboard: false,
			templateUrl: './pages/billentry/templates/billEntryModal.htm',
			controller: 'billentrytabController',
			windowClass: 'registerModalWindow'
		});
	}
	$scope.openNotelModal = function () {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
			keyboard: false,
			templateUrl: './pages/note/templates/noteModal.htm',
			controller: 'noteModalController',
			windowClass: 'registerModalWindow'
		});
	}
	$scope.openBillDetailsModal = function (data) {
		var modalInstance = $uibModal.open({
			backdrop: 'static',
			keyboard: false,
			templateUrl: './pages/dashboard/templates/dashboardBillDetailsModal.htm',
			controller: 'dashboardBillDetailsModalController',
			resolve:{
				rowData: function(){
					return data;
				}
			},
			windowClass: 'billDetailsModalWindow'
		});
	}
	/* angular clock feature */
	$scope.format = 'EEEE MMMM d,yyyy';//EEEE MMMM d,yyyy hh:mm:ss a Z, dd-MMM-yyyy hh:mm:ss a, EEEE MMMM d,yyyy hh:mm:ss a
	$scope.theme = 'blue-light';//also use dark for dark theme
	
	/* sort feature */
	$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverseSort = !$scope.reverseSort; //if true make it false and vice versa
    }
	
	var billdetailsURLGET = "/api/v1/record/show";
	$('.loader, .overlay').show();
	/* http get call */
	$http({
		url: billdetailsURLGET,
		method: "GET"
	}).success(function(response) {
			$('.loader, .overlay').hide();
			response.data.sort(function(a,b){
				/*sort by name */
				// var nameA = a.PAYER.toLowerCase();
				// var nameB = b.PAYER.toLowerCase();
				// if(nameA<nameB)
				// 	return -1;
				// if(nameA>nameB)
				// 	return 1;
				// return 0;

				/*sort by date */
				var dateA = moment(a.BILLDATE);
				var dateB = moment(b.BILLDATE);
				return dateB - dateA;
			});
			// console.log('List of bills - Success response recieved. '+ JSON.stringify(response)); /* printing API response on console - unit testing purpose*/
			$scope.bills  = response;
			
			$scope.billCalculate(response);
		});

		/* individual bill calculation */
		$scope.billCalculate = function (response) {
            $scope.arnabRECEIVE = 0;
			$scope.bipraRECEIVE = 0;
			$scope.sauravRECEIVE = 0;
			$scope.sayanRECEIVE = 0;
			$scope.tanmoyRECEIVE = 0;
			
			$scope.arnabDUE1 = 0;$scope.arnabDUE2 = 0;$scope.arnabDUE3 = 0;$scope.arnabDUE4 = 0;$scope.arnabDUE5 = 0;
			$scope.bipraDUE1 = 0;$scope.bipraDUE2 = 0;$scope.bipraDUE3 = 0;$scope.bipraDUE4 = 0;$scope.bipraDUE5 = 0;
			$scope.sauravDUE1 = 0;$scope.sauravDUE2 = 0;$scope.sauravDUE3 = 0;$scope.sauravDUE4 = 0;$scope.sauravDUE5 = 0;
			$scope.sayanDUE1 = 0;$scope.sayanDUE2 = 0;$scope.sayanDUE3 = 0;$scope.sayanDUE4 = 0;$scope.sayanDUE5 = 0;
			$scope.tanmoyDUE1 = 0;$scope.tanmoyDUE2 = 0;$scope.tanmoyDUE3 = 0;$scope.tanmoyDUE4 = 0;$scope.tanmoyDUE5 = 0;
			
			for(var i=0;i<response.data.length;i++){
				if(response.data[i].ARNAB != undefined){
					if(response.data[i].PAYER == 'Arnab'){
						//$scope.arnab =  parseFloat(response.data[i].AMOUNT) + parseFloat($scope.arnab) - parseFloat(response.data[i].ARNAB);
						$scope.arnabDUE1 = 0;
						$scope.bipraDUE1 = parseFloat($scope.bipraDUE1) + parseFloat(response.data[i].ANUPAM);
						$scope.sauravDUE1 = parseFloat($scope.sauravDUE1) + parseFloat(response.data[i].SUBHASIS);
						$scope.sayanDUE1 = parseFloat($scope.sayanDUE1) + parseFloat(response.data[i].DEBU);
						$scope.tanmoyDUE1 = parseFloat($scope.tanmoyDUE1) + parseFloat(response.data[i].TANMOY);
						
						$scope.arnabRECEIVE = $scope.arnabDUE1+$scope.bipraDUE1+$scope.sauravDUE1+$scope.sayanDUE1+$scope.tanmoyDUE1;
					}/*else{
						$scope.arnab = parseFloat($scope.arnab) - parseFloat(response.data[i].ARNAB);
					}*/
				}
				if(response.data[i].ANUPAM != undefined){
					if(response.data[i].PAYER == 'Bipra'){
						//$scope.bipra =  parseFloat(response.data[i].AMOUNT) + parseFloat($scope.bipra) - parseFloat(response.data[i].ANUPAM);
						$scope.arnabDUE2 = parseFloat($scope.arnabDUE2) + parseFloat(response.data[i].ARNAB);
						$scope.bipraDUE2 = 0;
						$scope.sauravDUE2 = parseFloat($scope.sauravDUE2) + parseFloat(response.data[i].SUBHASIS);
						$scope.sayanDUE2 = parseFloat($scope.sayanDUE2) + parseFloat(response.data[i].DEBU);
						$scope.tanmoyDUE2 = parseFloat($scope.tanmoyDUE2) + parseFloat(response.data[i].TANMOY);
						
						$scope.bipraRECEIVE = $scope.arnabDUE2+$scope.bipraDUE2+$scope.sauravDUE2+$scope.sayanDUE2+$scope.tanmoyDUE2;
					}/*else{
						$scope.bipra = parseFloat($scope.bipra) - parseFloat(response.data[i].ANUPAM);
					}*/
				}
				if(response.data[i].SUBHASIS != undefined){
					if(response.data[i].PAYER == 'Saurav'){
						//$scope.saurav =  parseFloat(response.data[i].AMOUNT) + parseFloat($scope.saurav) - parseFloat(response.data[i].SUBHASIS);
						$scope.arnabDUE3 = parseFloat($scope.arnabDUE3) + parseFloat(response.data[i].ARNAB);
						$scope.bipraDUE3 = parseFloat($scope.bipraDUE3) + parseFloat(response.data[i].ANUPAM);
						$scope.sauravDUE3 = 0;
						$scope.sayanDUE3 = parseFloat($scope.sayanDUE3) + parseFloat(response.data[i].DEBU);
						$scope.tanmoyDUE3 = parseFloat($scope.tanmoyDUE3) + parseFloat(response.data[i].TANMOY);
						
						$scope.sauravRECEIVE = $scope.arnabDUE3+$scope.bipraDUE3+$scope.sauravDUE3+$scope.sayanDUE3+$scope.tanmoyDUE3;
					}/*else{
						$scope.saurav = parseFloat($scope.saurav) - parseFloat(response.data[i].SUBHASIS);
					}*/
				}
				if(response.data[i].DEBU != undefined){
					if(response.data[i].PAYER == 'Sayan'){
						//$scope.sayan =  parseFloat(response.data[i].AMOUNT) + parseFloat($scope.sayan) - parseFloat(response.data[i].DEBU);
						$scope.arnabDUE4 = parseFloat($scope.arnabDUE4) + parseFloat(response.data[i].ARNAB);
						$scope.bipraDUE4 = parseFloat($scope.bipraDUE4) + parseFloat(response.data[i].ANUPAM);
						$scope.sauravDUE4 = parseFloat($scope.sauravDUE4) + parseFloat(response.data[i].SUBHASIS);
						$scope.sayanDUE4 = 0;
						$scope.tanmoyDUE4 = parseFloat($scope.tanmoyDUE4) + parseFloat(response.data[i].TANMOY);
						
						$scope.sayanRECEIVE = $scope.arnabDUE4+$scope.bipraDUE4+$scope.sauravDUE4+$scope.sayanDUE4+$scope.tanmoyDUE4;
					}/*else{
						$scope.sayan = parseFloat($scope.sayan) - parseFloat(response.data[i].DEBU);
					}*/
				}
				if(response.data[i].TANMOY != undefined){
					if(response.data[i].PAYER == 'Tanmoy'){
						//$scope.tanmoy =  parseFloat(response.data[i].AMOUNT) + parseFloat($scope.tanmoy) - parseFloat(response.data[i].TANMOY);
						$scope.arnabDUE5 = parseFloat($scope.arnabDUE5) + parseFloat(response.data[i].ARNAB);
						$scope.bipraDUE5 = parseFloat($scope.bipraDUE5) + parseFloat(response.data[i].ANUPAM);
						$scope.sauravDUE5 = parseFloat($scope.sauravDUE5) + parseFloat(response.data[i].SUBHASIS);
						$scope.sayanDUE5 = parseFloat($scope.sayanDUE5) + parseFloat(response.data[i].DEBU);
						$scope.tanmoyDUE5 = 0;
						
						$scope.tanmoyRECEIVE = $scope.arnabDUE5+$scope.bipraDUE5+$scope.sauravDUE5+$scope.sayanDUE5+$scope.tanmoyDUE5;
					}/*else{
						$scope.tanmoy = parseFloat($scope.tanmoy) - parseFloat(response.data[i].TANMOY);
					}*/
				}
				
			}
			
			$scope.arnabPAY = $scope.arnabDUE1+$scope.arnabDUE2+$scope.arnabDUE3+$scope.arnabDUE4+$scope.arnabDUE5;
			$scope.bipraPAY = $scope.bipraDUE1+$scope.bipraDUE2+$scope.bipraDUE3+$scope.bipraDUE4+$scope.bipraDUE5;
			$scope.sauravPAY = $scope.sauravDUE1+$scope.sauravDUE2+$scope.sauravDUE3+$scope.sauravDUE4+$scope.sauravDUE5;
			$scope.sayanPAY = $scope.sayanDUE1+$scope.sayanDUE2+$scope.sayanDUE3+$scope.sayanDUE4+$scope.sayanDUE5;
			$scope.tanmoyPAY = $scope.tanmoyDUE1+$scope.tanmoyDUE2+$scope.tanmoyDUE3+$scope.tanmoyDUE4+$scope.tanmoyDUE5;
        };

		 $scope.remove = function (data,index) {
			var billdeleteURLPUT = "/api/v1/record/update/"+data._id;
			// $scope.dt = new Date();
			$('.loader, .overlay').show();
			var billdeleteJSON = {
				"DELETED_DATE": moment().toISOString()
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
					$('.loader, .overlay').hide();
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
									response.data.sort(function(a,b){
										var dateA = moment(a.BILLDATE);
										var dateB = moment(b.BILLDATE);
										return dateB - dateA;
									});
									// console.log('List of bills - Success response recieved. '+ JSON.stringify(response)); /* printing API response on console - unit testing purpose*/
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
		
		$scope.edited = -1;

        $scope.edit = function (index) {
            $scope.edited = index;
        };

		/* Save edited fields */
		function updateEdit(data,billupdate) {
			$('.loader, .overlay').show();
			var billupdateURLPUT = "/api/v1/record/update/"+data._id;
			$scope.dt = billupdate.billdate?moment(billupdate.billdate):data.BILLDATE;
			// $scope.diff = $scope.curdt - Date.parse(data.BILLDATE);
			// console.log('diff = '+Date.parse(data.BILLDATE));
			
			var billupdateJSON = {
				"BILLDATE": $scope.dt,
				"AMOUNT": billupdate.amount,
				"ARNAB": billupdate.arnab,
				"ANUPAM": billupdate.bipra,
				"SUBHASIS": billupdate.saurav,
				"DEBU": billupdate.sayan,
				"TANMOY": billupdate.tanmoy,
				"BILLDESC": billupdate.billdesc,
            	"MODIFIED_DATE": moment().toISOString()
			}
			//console.log('billupdateJSON = '+JSON.stringify(billupdateJSON));
		var postFunction = $http({
			    url: billupdateURLPUT,
			    dataType:"json",
			    crossDomain: true,
			    header : {"Access-Control-Allow-Headers " : "Content-Type "},
			    header : {"X-Requested-With ": "Content-Type" },
			    data: billupdateJSON,
			    method: "PUT"
			 })
			.success(function(response) {//success handling
					console.log('Success response recieved '+ JSON.stringify(response));
					$('.loader, .overlay').hide();
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
							/* http get call */
							$http({
								url: billdetailsURLGET,
								method: "GET"
							}).success(function(response) {
									response.data.sort(function(a,b){
										var dateA = moment(a.BILLDATE);
										var dateB = moment(b.BILLDATE);
										return dateB - dateA;
									});
									// console.log('List of bills - Success response recieved. '+ JSON.stringify(response)); /* printing API response on console - unit testing purpose*/
									$scope.bills  = response;
									
									$scope.billCalculate(response);
							});	
						}	
						else if(response.status == "422"){
							swal({
								   title: response.message,
								   type: "warning" });
						}
					}
				})
				.error(function(response) {//err handling
					console.log('err');
					console.log('Error response recieved '+ JSON.stringify(response));
					swal({
						   title: response.message,
						   type: "error" });
				});
            $scope.edited = -1;

        };
		$scope.updateEdit = updateEdit;

		$scope.close = function () {
			$scope.edited = -1;
			/* http get call */
			$http({
				url: billdetailsURLGET,
				method: "GET"
			}).success(function(response) {
					response.data.sort(function(a,b){
						var dateA = moment(a.BILLDATE);
						var dateB = moment(b.BILLDATE);
						return dateB - dateA;
					});
					// console.log('List of bills - Success response recieved. '+ JSON.stringify(response)); /* printing API response on console - unit testing purpose*/
					$scope.bills  = response;
					$scope.billCalculate(response);
			});
		};
});