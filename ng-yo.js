angular.module('ngYo', []);
angular.module('ngYo').constant('YoConfig', {
	token : 'your-token-here',
	yoAllUrl: "https://api.justyo.co/yoall/",
	yoUrl: "https://api.justyo.co/yo/",
	checkUsernameUrl: "https://api.justyo.co/check_username/",
	subscribersCountUrl: "https://api.justyo.co/subscribers_count/",
	accountsUrl: "https://api.justyo.co/accounts/"
});

angular.module('ngYo').factory('YoService', ['$http', '$q', 'YoConfig', function($http, $q, YoConfig) {
	
	return {
		
		yoAll: function() {
			$http({
				url: YoConfig.yoAllURL,
				method:'POST',
				headers: {
					"Content-type": "application/x-www-form-urlencoded",
					"Connection": "close"
				},
				data: {
					api_token: YoConfig.token
				}
			}).success(function(){
				console.log(arguments);
			});
		},

		yo: function(username) {
			$http({
				url: YoConfig.yoUrl,
				method:'POST',
				headers: {
					"Content-type": "application/x-www-form-urlencoded",
					"Connection": "close"
				},
				data: {
					api_token: YoConfig.token,
					username: username
				}
			}).success(function(){
				console.log(arguments);
			});
		},

		checkUsername: function(username) {
			var deferred = $q.defer();
			$http({
				url: YoConfig.checkUsernameUrl + '?api_token=' + YoConfig.token + '&username=' + username,
				method:'GET',
				headers: {
					"Content-type": "application/x-www-form-urlencoded",
					"Connection": "close"
				}
			}).success(function(result) {
				console.log(arguments);
				deferred.resolve(result);
			}).error(function() {
				deferred.reject();
			});

			return deferred.promise;
		},

		subscribersCount: function() {
			var deferred = $q.defer();
			$http({
				url: YoConfig.subscribersCountUrl + '?api_token='+ YoConfig.token,
				method:'GET',
				headers: {
					"Content-type": "application/x-www-form-urlencoded",
					"Connection": "close"
				}
			}).success(function(result) {
				console.log(arguments);
				deferred.resolve(result);
			}).error(function() {
				deferred.reject();
			});

			return deferred.promise;	
		},

		accounts: function(username, passcode, email, description, needsLocation, callbackUrl) {
			var deferred = $q.defer();
			$http({
				url: YoConfig.accountsUrl,
				method:'POST',
				headers: {
					"Content-type": "application/x-www-form-urlencoded",
					"Connection": "close"
				},
				data: {
					api_token: YoConfig.token,
					new_account_username: username.toUpperCase(),
					new_account_passcode: passcode,
					callbackUrl: callbackUrl,
					email: email,
					description: description,
					needs_location: needsLocation
				}
			}).success(function(result) {
				deferred.resolve(result);
			}).error(function() {
				deferred.reject();
			});

			return deferred.promise;
		}

	};
}]);