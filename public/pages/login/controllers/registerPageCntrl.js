'use strict'
billapp.controller('registerPageController', function($scope, $http, $uibModal, $uibModalInstance, loginHttpService) {
	console.log('on Register button click');
	/*close modal view */
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    }
    
    $scope.regBtnClicked = function(){
        // console.log($scope.firstname, $scope.lastname, $scope.pw);
        var regUserJson = {
            "TYPE": "USER_MASTER",
            "User_Id": $scope.firstname.toLowerCase(),
            "First_Name": $scope.firstname,
            "Last_Name": $scope.lastname,
            "Password": $scope.pw,
            "User_Type": "Individual",
            "Created_by": "admin",
            "Created_date": moment().toISOString()
        };
        loginHttpService.regAPI(regUserJson)
        .then(function(data){
            console.log(data);
            $uibModalInstance.dismiss('cancel');
            if(data.status === 200)
                $scope.openModal('Registration', 'Registration done. Your user id is "'+$scope.firstname.toLowerCase()+'"');
            else
                $scope.openModal('Registration', 'Server down. Please try again later.');
        });
    };

    $scope.openModal = function (titleName, message) {
		var modalInstance = $uibModal.open({
			templateUrl: './pages/common/templates/commonModalView.htm',
			controller: 'commonModalViewController',
			resolve: {
				titleNameVal: function () {
					return titleName;
				},
				messageVal: function () {
					return message;
				}
			},
			windowClass: 'smallModalWindow'
		})
	};
});
