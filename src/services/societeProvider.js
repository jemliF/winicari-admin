'use strict';

app.service('SocieteProvider', function($http, secHeaders, $q, apiAddress){

	this.getSocietes = function () {

          
          var deferred = $q.defer();
          $http.get(apiAddress+'/api/societes', {
            headers : secHeaders
          }).success(function(resp){
            
            deferred.resolve(resp);
        }).error(function(err){
              
              
            console.error(JSON.stringify(err));  
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.update = function (societe) {

          
          var deferred = $q.defer();
          $http.put(apiAddress+'/api/societes/'+societe.id, societe, {
            headers : secHeaders
          }).success(function(resp){
            
            deferred.resolve(resp);
        }).error(function(err){
              
              
            console.error(JSON.stringify(err));  
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.delete = function (societe) {
        
        var deferred = $q.defer();
        $http.delete(apiAddress+'/api/societes/' + societe.id, {
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