'use strict'
billapp.controller('billentrytabController', function($scope,$http,$filter,$uibModal, $uibModalInstance) {

	console.log('On billentrytabController');
	
	$("#menu_dashboard").attr("class","active");
	// $("#menu_billentry").attr("class","");
	// $("#menu_billupdate").attr("class","");
	
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
	$scope.billpayer = [
        { 	"id": "1001",
            "name": "Arnab"
        },
        // { 	"id": "1002",
        // 	"name": "Saurav"
        // },
        { 	"id": "1003",
            "name": "Tanmoy"
        },
        { 	"id": "1004",
            "name": "Sayan"
        },
        // { 	"id": "1005",
        // 	"name": "Bipra"
        // }
    ];

	var billdetailsURLPOST = "/api/v1/record/add";
	function recordSubmit(){
		$('.loader, .overlay').show();
		console.log('submit button clicked');

		$scope.num = (Math.floor(Math.random() * 1000000));
		$scope.billid=$scope.bill_payer.id+$scope.num;
		// $scope.dt = new Date($scope.bill_date);

		/*console.log('bill-id = '+$scope.billid);
		console.log('payer = '+$scope.bill_payer.name);
		console.log('date = '+$scope.bill_date);
		console.log('amount = '+$scope.bill_amount.toString());
		console.log('desc = '+$scope.bill_desc);*/
		
		var billdetailsJSON = {
				"TYPE": "USER_GROUP",
				"BILLID": $scope.billid,
				"PAYER": $scope.bill_payer.name,
				"BILLDATE": moment($scope.bill_date),
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
						
						// $scope.recordReset();
					}
				})
				.error(function(response) {//err handling
					console.log('err');
					console.log('Error response recieved '+ JSON.stringify(response));
					$uibModalInstance.dismiss('cancel');
					$scope.openModal("Add Bill", response.message);
					// swal({
					// 	   title: response.message,
					// 	   type: "error" });
				});
	}
	$scope.recordSubmit = recordSubmit;
	
	function recordReset(){
		console.log('reset button clicked');
		$scope.bill_payer = '';
		$scope.bill_date = '';
		$scope.bill_amount = '';
		$scope.arnab1001 = '';
		// $scope.bipra1005 = '';
		// $scope.saurav1002 = '';
		$scope.sayan1004 = '';
		$scope.tanmoy1003 = '';
		$scope.bill_desc = '';
	}
	$scope.recordReset = recordReset;

	/*angular date picker */
    $scope.today = function() {
        $scope.fromDate = new Date();
    };
    //$scope.today();
    $scope.clear = function () {
        $scope.fromDate = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        /*dateDisabled: disabled,*/
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1,
        today: false,
        showWeeks: true
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open = function () {
        $scope.popup.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.fromDate = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMM-yyyy'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup = {
        opened: false
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
});