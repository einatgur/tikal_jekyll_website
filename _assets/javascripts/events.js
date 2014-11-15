(function(){

	'use strict';

	var Sn = {};
	var module = angular.module('events-module', []);

	Sn.MeetupsApiParams = {
		baseApiUrl: 'https://api.meetup.com',
		callback: 'JSON_CALLBACK',
		group_urlname: 'full-stack-developer-il',
		text_format: 'plain',
		key: '6b7b184b5a2b2e3fa2a3e216517e42',
		sign: true
	};

	Sn.SiteParams = {
		baseUrl: ''
	};

	module.constant('MeetupsApiParams', Sn.MeetupsApiParams);
	module.constant('SiteParams', Sn.SiteParams);

	module.service('MeetupsService', ['$http', 'MeetupsApiParams', '$q', function($http, MeetupsApiParams, $q){

		function getJSONPParams(status, offset, page, desc){
			var params = {
				status: status,
				offset: offset,
				page: page,
				desc:desc
			};

			if(angular.isDefined(desc)){
				params.desc = desc;
			}

			params = angular.extend(params, MeetupsApiParams);
			delete params.baseApiUrl;

			return params;
		}

		return {

			getMeetups: function(status, offset, page, desc){
				var defer = $q.defer(),
					params = getJSONPParams(status, offset, page, desc);


				function onSuccess(data){
					defer.resolve(data.results);
				}

				function onError(data, status, headers, config){
					//debugger;
					defer.reject('Faild to load meetups'+status.data);
				}

				$http.jsonp(
					MeetupsApiParams.baseApiUrl+'/2/events',
					{params: params}
				)
					.success(onSuccess)
					.error(onError);

				return defer.promise;
			},
			getMeetupRsvps: function(meetupId){
				var defer = $q.defer(),
					apiUrl =
						[MeetupsApiParams.baseApiUrl, '2', 'rsvps'].join('/'),
					params = {
						callback: MeetupsApiParams.callback,
						key: MeetupsApiParams.key,
						event_id: meetupId
					};


				function onSuccess(data){
					defer.resolve(data.results);
				}

				function onError(data, status, headers, config){
					defer.reject('Faild to load meetups');
				}

				$http.jsonp(apiUrl, {params: params})
					.success(onSuccess)
					.error(onError);
				return defer.promise;
			},
			getMeetupAttendance: function(meetupId){
				var defer = $q.defer(),
					apiUrl = [
						MeetupsApiParams.baseApiUrl,
						MeetupsApiParams.group_urlname,
						'events',
						meetupId,
						'attendance'
					].join('/'),
					params = {
						callback: MeetupsApiParams.callback,
						key: MeetupsApiParams.key,
						sign: MeetupsApiParams.sign
					};


				function onSuccess(data){
					defer.resolve(data.results);
				}

				function onError(data, status, headers, config){
					defer.reject('Faild to load meetups');
				}

				$http.jsonp(apiUrl, {params: params})
					.success(onSuccess)
					.error(onError);

				return defer.promise;
			}
		};
	}]);


	module.controller('Sn.MainCtrl', ['$scope', function($scope){

		var _self = this;

		this.displayUpComing = function displayUpComing(){
			this.isUpComing = true;
			this.isPast = false;
		};

		this.displayPast = function displayPast(){
			this.isPast = true;
			this.isUpComing = false;
		};

		(function init(){
			_self.displayUpComing();
		})();

	}]);

	module.controller('Sn.MeetupsCtrl', ['$scope', 'MeetupsService', function($scope, MeetupsService){

		var _self = this,
			lastOffset = 0;

		function onUpComingSuccess(meetups){
			_self.meetupsByStatus.upcoming = meetups;
			var i = 0,
				len = meetups.length;

			for(; i < len; ++i){
				console.log("meetups[i] = ", meetups[i]);
				MeetupsService.getMeetupRsvps(meetups[i].id).then(function(data){
					if (data.length > 0) {
						_self.meetupsRsvps[data[0].event.id] = data;
					}
				});
			}
		}

		function onPastSuccess(meetups){
			var i = 0,
				len = meetups.length;


			for(; i < len; ++i){
				_self.meetupsByStatus.past.push(meetups[i]);
				MeetupsService.getMeetupRsvps(meetups[i].id).then(function(data){
					if(data.length>0){
						_self.meetupsRsvps[data[0].event.id] = data;
					}
				});
			}

		}

		function onError(data){
			//debugger;
		}

		function loadPastEvents(offset){
			MeetupsService
				.getMeetups('past', offset, 3, 'true')
				.then(
				onPastSuccess,
				onError
			);
		}

		_self.loadMore = function loadMore(){
			loadPastEvents(++lastOffset);
		};

		(function init(){

			_self.meetupsByStatus = {
				upcoming: [],
				past: []
			};
			_self.meetupsRsvps = {};

			MeetupsService
				.getMeetups('upcoming', 0, 20)
				.then(
				onUpComingSuccess,
				onError
			);

			loadPastEvents(lastOffset);


		})();
	}]);


	module.directive('meetupEvent', ['$location', function($location){

		return {
			restrict: 'E',
			templateUrl:'/events/meetup-event.html',
			replace: true,
			scope: {
				meetups: '=',
				title: '@',
				isUpcomingEvent: '@',
				rsvps: '='
			},
			link: function (scope, element) {
				var waitlistText = 'Waiting List',
					rsvpText = 'RSVP',
					waitlistClass = 'event-waitlist',
					rsvpClass = 'event-rsvp';

				scope.isWaitlist = function (meetup) {
					return meetup.yes_rsvp_count >= meetup.rsvp_limit || meetup.waitlist_count;
				};

				scope.waitlistRsvpClass = function (meetup) {
					return scope.isWaitlist(meetup) ? waitlistClass : rsvpClass;
				};

				scope.waitlistRsvpText = function (meetup) {
					return scope.isWaitlist(meetup) ? waitlistText : rsvpText;
				};
			}
		};
	}]);

	module.directive('meetupListEvent', ['$location', function($location){

		return {
			restrict: 'E',
			templateUrl:'/block-meetup-event.html',
			replace: true,
			scope: {
				meetups: '=',
				title: '@',
				isUpcomingEvent: '@',
				rsvps: '='
			},
			link: function(scope, element){
			}
		};
	}]);

	module.service('FBDataService', ['$http', '$window', '$q', function($http, $window, $q){
		var fb = $window.FB;

		fb.init({
			appId: '334506690062624',
			status: true,
			cookie: true,
			xfbml: true
		});

		this.getData = function () {
			var deferred = $q.defer();
			fb.api(
				"/v2.2/225585444263260/feed?access_token=334506690062624|wYA-QpptpE0UZBjBTicmS2JKkIU",
				function (response) {
					if(response.error){
						deferred.reject(response.error);
					} else if (response && !response.error) {
						deferred.resolve(response);
					}
				});

			return deferred.promise;

		}

	}]);

	module.controller('FeedCtrl', ['$scope', 'FBDataService', function($scope, FBDataService){
		$scope.data = [];

		FBDataService.getData().then(function(res){
			var feeds = res.data.slice(0,5);
			for (var i=0; i<feeds.length; i++){
				var id = feeds[i].id;
				var feedId = [];
				feedId.push(id.substring(0,id.indexOf("_")));
				feedId.push(id.substring(id.indexOf("_")+1));

				var feed = {
					image: "https://graph.facebook.com/" + feeds[i].from.id + "/picture",
					authorName: feeds[i].from.name,
					profilePage: "https://www.facebook.com/app_scoped_user_id/" + feeds[i].from.id,
					created: feeds[i].created_time,
					message: feeds[i].message,
					postMessage: "https://www.facebook.com/" + feedId[0] + "/posts/" + feedId[1]
				}

				$scope.data.push(feed);
			}

		},function(reason){
			console.log(reason);
		});
	}]);


	module.filter('dateSuffix', function($filter) {
		var suffixes = ["th", "st", "nd", "rd"];
		return function(input) {
			var dtfilter = $filter('date')(input, 'MMM, dd');
			var day = parseInt(dtfilter.slice(-2));
			var relevantDigits = (day < 30) ? day % 20 : day % 30;
			var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
			return dtfilter+suffix;
		};
	});


	module.filter('cut', function () {
		return function (value, wordwise, max, tail) {
			if (!value) return '';

			max = parseInt(max, 10);
			if (!max) return value;
			if (value.length <= max) return value;

			value = value.substr(0, max);
			if (wordwise) {
				var lastspace = value.lastIndexOf(' ');
				if (lastspace != -1) {
					value = value.substr(0, lastspace);
				}
			}

			return value + (tail || ' …');
		};
	});


})();