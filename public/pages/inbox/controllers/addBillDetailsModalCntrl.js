'use strict'
billapp.controller('addBillDetailsModalController', function($scope, $http, $modal, $modalInstance) {
	console.log('Add Bill button click');
	/*close modal view */
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    }

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
        showWeeks: false
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

    $scope.open = function ($event) {
        console.log('open '+$scope.popup.opened);
        $event.preventDefault();
        $event.stopPropagation();
        $scope.popup.opened = true;
        console.log('clicked '+$scope.popup.opened);
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
