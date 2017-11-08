'use strict'
billapp.controller('billDetailsModalController', function($scope, $http, $uibModal, $uibModalInstance,rowData,inboxDetails) {
	console.log('Bill Details button click');
    $scope.inboxDetails = inboxDetails;
    $scope.rowData = rowData;
    console.log('rowData = '+JSON.stringify($scope.rowData));
    console.log('inboxDetails = '+JSON.stringify($scope.inboxDetails));
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

    /*delete button function */
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
							$scope.openModal("Delete Bill", "Bill Details DELETED successfully");
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

    /* Edit button functionality  */     
    $scope.edited = -1;

    $scope.edit = function (index) {
        $scope.edited = index;
    };

    $scope.cancel = function () {
		$scope.edited = -1;
    }

    /* Save edited fields */
	$scope.updateEdit =	function (data,billupdate) {
		var billupdateURLPUT = "/api/v1/record/update/"+data._id;	
		var billupdateJSON = {
			"AMOUNT": billupdate.amount,
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
					
			if(response.status == "500"){
                $scope.openModal("Save Bill", response.message);					
			}else{
				if(response.status == "200"){
                    $scope.openModal("Save Bill", response.message);
				}else if(response.status == "422"){
                    $scope.openModal("Save Bill", response.message);
				}
			}
		})
		.error(function(response) {//err handling
			$scope.openModal("Save Bill", response.message);
		});
        $scope.edited = -1;

    };
});
