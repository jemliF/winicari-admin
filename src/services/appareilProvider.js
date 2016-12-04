'use strict';

app.service('AppareilProvider', function ($http, secHeaders, $q, apiAddress) {

    this.save = function (appareil) {
        
        var deferred = $q.defer();
        $http.post(apiAddress + '/api/appareils', appareil, {
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
        $http.get(apiAddress + '/api/appareils/societe/' + societe.id, {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            
            
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.update = function (appareil) {

        
        var deferred = $q.defer();
        $http.put(apiAddress + '/api/appareils/' + appareil.id, appareil, {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            
            
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.delete = function (appareil) {
        
        var deferred = $q.defer();
        $http.delete(apiAddress + '/api/appareils/' + appareil.id, {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            
            
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }
});