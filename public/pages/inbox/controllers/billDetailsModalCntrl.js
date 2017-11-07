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

    /*submit button function */
    

});
