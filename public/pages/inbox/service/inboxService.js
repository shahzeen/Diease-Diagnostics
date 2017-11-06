'use strict'
billapp.service('inboxHttpService', ['$http', '$q', function($http, $q){
	
	return {
		getInbox: function(stage) {
			$('.loader').show();
			var apikey = authService.apiKey;
			var role = authService.role;
			return $http.get('/api/v1/operator/inbox/stage/'+stage,
			{
				headers: {'authtoken': apikey}
			})
			.then(function(response){
				//console.log('inbox response ==>'+JSON.stringify(response.data));
				$('.loader').hide();
				return response.data;
			},
			function(errResponse){
				$('.loader').hide();
				return $q.reject(errResponse);
			});
		},
		testResultRecording: function(req,id,apikey){
			return $http({
				method:'PUT',
				url:'/api/v1/operator/qaresult/id/'+id,
				"headers": {
					"authtoken": apikey,
					"Content-Type": "application/json"
				},
				data: req
			})
			.then(function(response){
                    //console.log('req = '+JSON.stringify(response));
                    return response;
                }, function(errResponse){
                	console.log(errResponse);
                	return errResponse;
                });
		}
	};
}]);