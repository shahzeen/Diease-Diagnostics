'use strict'; 
billapp.controller('noteModalController', ['$scope','$uibModalInstance', function ($scope, $uibModalInstance) {
	
	console.log('On noteModalController');
	
	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
}]);