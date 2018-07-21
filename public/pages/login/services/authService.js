'use strict'
billapp.service('authService', ['$http', '$q', function($http, $q){
	this.apiKey = undefined;
	this.firstname = undefined;
	this.lastname = undefined;
	this.clear = clear;

	Object.defineProperty(this, "apiKey", {
		get: function() { return sessionStorage.getItem("apiKey") },
		set: function(key) { sessionStorage.setItem("apiKey", key) }
	});

	Object.defineProperty(this, "firstname", {
		get: function() { return sessionStorage.getItem("firstname") },
		set: function(key) { sessionStorage.setItem("firstname", key) }
	});
	Object.defineProperty(this, "lastname", {
		get: function() { return sessionStorage.getItem("lastname") },
		set: function(key) { sessionStorage.setItem("lastname", key) }
	});
	function clear(){
		sessionStorage.removeItem("apiKey");
		sessionStorage.removeItem("firstname");
		sessionStorage.removeItem("lastname");
	}
}]);