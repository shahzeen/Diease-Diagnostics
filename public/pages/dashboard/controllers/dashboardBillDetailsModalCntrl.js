'use strict'
billapp.controller('dashboardBillDetailsModalController', function($scope, $http, $uibModalInstance, rowData) {
    // console.log('rowData = '+JSON.stringify(rowData));
    $scope.BILLID = rowData.BILLID;
    $scope.PAYER = rowData.PAYER;
    $scope.BILLDATE = rowData.BILLDATE;
    $scope.AMOUNT = rowData.AMOUNT;
    $scope.ARNAB = rowData.ARNAB;
    $scope.BIPRA = rowData.BIPRA;
    $scope.SAURAV = rowData.SAURAV;
    $scope.SAYAN = rowData.SAYAN;
    $scope.TANMOY = rowData.TANMOY;
    $scope.BILLDESC = rowData.BILLDESC;
    $scope.CREATED_DATE = rowData.CREATED_DATE;
    $scope.MODIFIED_DATE = rowData.MODIFIED_DATE;
	/*close modal view */
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    }
    
});
