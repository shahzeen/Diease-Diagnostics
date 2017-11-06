'use strict'
billapp.controller('registerPageController', function($scope, $http, $uibModal, $uibModalInstance) {
	console.log('on Register button click');
	/*close modal view */
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    }
});
