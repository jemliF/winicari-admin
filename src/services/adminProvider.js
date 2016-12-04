'use strict';

app.service('AdminProvider', function ($resource, $q, apiAddress, $http, secHeaders) {

    this.getAdminUsers = function () {
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/admins/role=user', {
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
        $http.get(apiAddress + '/api/admins/societe/' + societe.id, {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getBySocieteAndRole = function (societe, role) {

        
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/admins/societe/' + societe.id + '/role/'+role, {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getAdminById = function (id) {
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/admins/' + id, {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.saveAdmin = function (admin) {
        
        var deferred = $q.defer();
        $http.post(apiAddress + '/api/admins', admin, {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.deleteAdmin = function (admin) {
        var deferred = $q.defer();
        $http.delete(apiAddress + '/api/admins/' + admin.id, {
            headers: secHeaders
        }).success(function (resp) {
            
            deferred.resolve(resp);
        }).error(function (err) {
            
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.updateAdmin = function (admin) {
        var deferred = $q.defer();
        $http.put(apiAddress + '/api/admins/' + admin.id, admin, {
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