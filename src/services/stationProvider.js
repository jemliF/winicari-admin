'use strict';

app.service('StationProvider', function ($http, secHeaders, $q, apiAddress) {

    this.save = function (station) {

        var deferred = $q.defer();
        $http.post(apiAddress + '/api/stations', station, {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {


            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.getByBoundsAndSociete = function (leftBottom, rightTop, societe) {
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/stations/societe/' + societe.id + '/localisation/leftbottom/' + leftBottom.x + '/' + leftBottom.y + '/righttop/' + rightTop.x + '/' + rightTop.y + '/', {
            headers: secHeaders
        }).success(function (resp) {
            deferred.resolve(resp);
        }).error(function (err) {
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.getBySociete = function (societe) {
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/stations/societe/' + societe.id, {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {


            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.update = function (station) {
        var deferred = $q.defer();
        $http.put(apiAddress + '/api/stations/' + station.id, station, {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {

            ;
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.delete = function (station) {

        var deferred = $q.defer();
        $http.delete(apiAddress + '/api/stations/' + station.id, {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {

            ;
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }
});