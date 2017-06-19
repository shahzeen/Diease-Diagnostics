'use strict'
billapp.controller('hometabController', function($scope,$http) {

	console.log('On hometabController');
	
	$("#menu_home").attr("class","active");
	$("#menu_add").attr("class","");
	$("#menu_view").attr("class","");
	
	/* angular clock feature */
	$scope.format = 'EEEE MMMM d,yyyy hh:mm:ss a';//EEEE MMMM d,yyyy hh:mm:ss a Z, dd-MMM-yyyy hh:mm:ss a
	$scope.theme = 'blue-light';//also use dark for dark theme
	
	/* sort feature */
	$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverseSort = !$scope.reverseSort; //if true make it false and vice versa
    }
	
	var billdetailsURLGET = "/api/v1/record/show";
	
	/* http get call */
	var getFuction = $http({
		url: billdetailsURLGET,
		method: "GET"
	}).success(function(response) {
			console.log('List of bills - Success response recieved. '+ JSON.stringify(response)); /* printing API response on console - unit testing purpose*/
			$scope.bills  = response;
			
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
						$scope.bipraDUE1 = parseFloat($scope.bipraDUE1) + parseFloat(response.data[i].BIPRA);
						$scope.sauravDUE1 = parseFloat($scope.sauravDUE1) + parseFloat(response.data[i].SAURAV);
						$scope.sayanDUE1 = parseFloat($scope.sayanDUE1) + parseFloat(response.data[i].SAYAN);
						$scope.tanmoyDUE1 = parseFloat($scope.tanmoyDUE1) + parseFloat(response.data[i].TANMOY);
						
						$scope.arnabRECEIVE = $scope.arnabDUE1+$scope.bipraDUE1+$scope.sauravDUE1+$scope.sayanDUE1+$scope.tanmoyDUE1;
					}/*else{
						$scope.arnab = parseFloat($scope.arnab) - parseFloat(response.data[i].ARNAB);
					}*/
				}
				if(response.data[i].BIPRA != undefined){
					if(response.data[i].PAYER == 'Bipra'){
						//$scope.bipra =  parseFloat(response.data[i].AMOUNT) + parseFloat($scope.bipra) - parseFloat(response.data[i].BIPRA);
						$scope.arnabDUE2 = parseFloat($scope.arnabDUE2) + parseFloat(response.data[i].ARNAB);
						$scope.bipraDUE2 = 0;
						$scope.sauravDUE2 = parseFloat($scope.sauravDUE2) + parseFloat(response.data[i].SAURAV);
						$scope.sayanDUE2 = parseFloat($scope.sayanDUE2) + parseFloat(response.data[i].SAYAN);
						$scope.tanmoyDUE2 = parseFloat($scope.tanmoyDUE2) + parseFloat(response.data[i].TANMOY);
						
						$scope.bipraRECEIVE = $scope.arnabDUE2+$scope.bipraDUE2+$scope.sauravDUE2+$scope.sayanDUE2+$scope.tanmoyDUE2;
					}/*else{
						$scope.bipra = parseFloat($scope.bipra) - parseFloat(response.data[i].BIPRA);
					}*/
				}
				if(response.data[i].SAURAV != undefined){
					if(response.data[i].PAYER == 'Saurav'){
						//$scope.saurav =  parseFloat(response.data[i].AMOUNT) + parseFloat($scope.saurav) - parseFloat(response.data[i].SAURAV);
						$scope.arnabDUE3 = parseFloat($scope.arnabDUE3) + parseFloat(response.data[i].ARNAB);
						$scope.bipraDUE3 = parseFloat($scope.bipraDUE3) + parseFloat(response.data[i].BIPRA);
						$scope.sauravDUE3 = 0;
						$scope.sayanDUE3 = parseFloat($scope.sayanDUE3) + parseFloat(response.data[i].SAYAN);
						$scope.tanmoyDUE3 = parseFloat($scope.tanmoyDUE3) + parseFloat(response.data[i].TANMOY);
						
						$scope.sauravRECEIVE = $scope.arnabDUE3+$scope.bipraDUE3+$scope.sauravDUE3+$scope.sayanDUE3+$scope.tanmoyDUE3;
					}/*else{
						$scope.saurav = parseFloat($scope.saurav) - parseFloat(response.data[i].SAURAV);
					}*/
				}
				if(response.data[i].SAYAN != undefined){
					if(response.data[i].PAYER == 'Sayan'){
						//$scope.sayan =  parseFloat(response.data[i].AMOUNT) + parseFloat($scope.sayan) - parseFloat(response.data[i].SAYAN);
						$scope.arnabDUE4 = parseFloat($scope.arnabDUE4) + parseFloat(response.data[i].ARNAB);
						$scope.bipraDUE4 = parseFloat($scope.bipraDUE4) + parseFloat(response.data[i].BIPRA);
						$scope.sauravDUE4 = parseFloat($scope.sauravDUE4) + parseFloat(response.data[i].SAURAV);
						$scope.sayanDUE4 = 0;
						$scope.tanmoyDUE4 = parseFloat($scope.tanmoyDUE4) + parseFloat(response.data[i].TANMOY);
						
						$scope.sayanRECEIVE = $scope.arnabDUE4+$scope.bipraDUE4+$scope.sauravDUE4+$scope.sayanDUE4+$scope.tanmoyDUE4;
					}/*else{
						$scope.sayan = parseFloat($scope.sayan) - parseFloat(response.data[i].SAYAN);
					}*/
				}
				if(response.data[i].TANMOY != undefined){
					if(response.data[i].PAYER == 'Tanmoy'){
						//$scope.tanmoy =  parseFloat(response.data[i].AMOUNT) + parseFloat($scope.tanmoy) - parseFloat(response.data[i].TANMOY);
						$scope.arnabDUE5 = parseFloat($scope.arnabDUE5) + parseFloat(response.data[i].ARNAB);
						$scope.bipraDUE5 = parseFloat($scope.bipraDUE5) + parseFloat(response.data[i].BIPRA);
						$scope.sauravDUE5 = parseFloat($scope.sauravDUE5) + parseFloat(response.data[i].SAURAV);
						$scope.sayanDUE5 = parseFloat($scope.sayanDUE5) + parseFloat(response.data[i].SAYAN);
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
		});
});