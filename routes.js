'use strict';

app.factory('userConnected', function () {
    return localStorage.userId != null;
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'IndexController',
            templateUrl: 'views/acceuil.html',
            resolve: {loggedIn: onlyLoggedIn}
        })
        .when('/users', {
            controller: 'UsersController',
            templateUrl: 'views/users.html',
            resolve: {loggedIn: onlyLoggedIn}
        })
        /*.when('/appareils', {
         controller: 'AppareilsController',
         templateUrl: 'views/appareils.html',
         resolve: {loggedIn: onlyLoggedIn}
         })*/
        .when('/bus', {
            controller: 'BusController',
            templateUrl: 'views/bus.html',
            resolve: {loggedIn: onlyLoggedIn}
        })
        .when('/stations', {
            controller: 'StationsController',
            templateUrl: 'views/stations.html',
            resolve: {loggedIn: onlyLoggedIn}
        })
        .when('/profile', {
            controller: 'ProfileController',
            templateUrl: 'views/profile.html',
            resolve: {loggedIn: onlyLoggedIn}
        })
        .when('/logout', {
            controller: 'LogoutController',
            resolve: {loggedIn: onlyLoggedIn}
        })
        .otherwise({
            templateUrl: 'views/notfound.html',
            resolve: {loggedIn: onlyLoggedIn}
        });
});

var onlyLoggedIn = function ($location, $q) {
    var deferred = $q.defer();
    if (localStorage.userId === undefined || !localStorage.userId.length) {
        window.location = '/adminsite/login/index';
        deferred.reject();
    } else {
        deferred.resolve();
    }
    return deferred.promise;
};