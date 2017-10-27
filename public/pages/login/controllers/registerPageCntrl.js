'use strict'
billapp.controller('registerPageController', function($scope, $http, $modal, $modalInstance) {
	console.log('on Register button click');
	/*close modal view */
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    }
});
