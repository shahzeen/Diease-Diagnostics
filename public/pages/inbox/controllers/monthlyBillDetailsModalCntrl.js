'use strict'
billapp.controller('monthlyBillDetailsModalController', function($scope, $http, $uibModal, $uibModalInstance) {
	console.log('Add Bill button click');
	/*close modal view */
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
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

    /*angular-chart javascript */
    $scope.labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    $scope.series = ['Expense'];

    $scope.data = [
        [6500, 5900, 8570, 8451, 5760, 5500, 6740, 7800, 4967, 7076, 9500, 10500]
    ];

    /*submit button function */
    $scope.submitBillDetails = function() {
        $('.loader, .overlay').show();
        var billdetailsURLPOST = "/api/v1/record/add";
        var weekID = 'Y'+moment($scope.fromDate).year()+'W'+moment($scope.fromDate).isoWeek();
        
        var billdetailsJSON = {
				"TYPE": "USER",
                "User_Id": "1111",
                "WEEKID": weekID,
                "First_Name": "Tanmoy",
                "Last_Name": "Chaudhury",
				"BILLDATE": moment($scope.fromDate),
				"AMOUNT": $scope.bill_amount,
				"BILLDESC": $scope.bill_desc,
  				"CREATED_DATE": moment().toISOString(),
                "MODIFIED_DATE": null,
  				"DELETED_DATE": null
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
					$uibModalInstance.dismiss('cancel');
                    $('.loader, .overlay').hide();
					if(response.status == "500"){
						console.log('success if');
                        $scope.openModal("Add Bill", response.message);
						// swal({
						// 	   title: response.message,
						// 	   type: "error" });					
					}else{
						console.log('success else');
						
						if(response.status == "200"){
                            $scope.openModal("Add Bill", response.message);
							// swal({
							// 	   title: response.message,
							// 	   type: "success" });	
						}	
						else if(response.status == "422"){
                            $scope.openModal("Add Bill", response.message);
							// swal({
							// 	   title: response.message,
							// 	   type: "warning" });
						}
					}
				})
				.error(function(response) {//err handling
					console.log('Error response recieved '+ JSON.stringify(response));
                    $uibModalInstance.dismiss('cancel');
                    $scope.openModal("Add Bill", response.message);
					// swal({
					// 	   title: response.message,
					// 	   type: "error" });
				});

    };
});
