'use strict';

app.service('BusProvider', function ($http, secHeaders, $q, apiAddress) {

    this.save = function (bus) {

        var deferred = $q.defer();
        $http.post(apiAddress + '/api/bus', bus, {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.getBusPosition = function (bus) {


        var deferred = $q.defer();
        $http.get(apiAddress + '/api/bus/' + bus.id + '/position', {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getBusService = function (bus) {


        var deferred = $q.defer();
        $http.get(apiAddress + '/api/bus/' + bus.id + '/service', {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getBusTicketCount = function (bus) {
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/bus/' + bus.id + '/tickets/count', {
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
        $http.get(apiAddress + '/api/bus/societe/' + societe.id + '/localisation/leftbottom/' + leftBottom.x + '/' + leftBottom.y + '/righttop/' + rightTop.x + '/' + rightTop.y + '/', {
            headers: secHeaders
        }).success(function (resp) {
            deferred.resolve(resp);
        }).error(function (err) {
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getBusNegativeRecipe = function (bus) {
        var deferred = $q.defer();
        $http.get(apiAddress + '/api/bus/' + bus.id + '/recipe/negative', {
            headers: secHeaders
        }).success(function (resp) {
            deferred.resolve(resp);
        }).error(function (err) {
            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getBusLastTicket = function (bus) {

        var deferred = $q.defer();
        $http.get(apiAddress + '/api/bus/' + bus.id + '/tickets/last', {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getBusCancelledTicketCount = function (bus) {

        var deferred = $q.defer();
        $http.get(apiAddress + '/api/bus/' + bus.id + '/tickets/cancelled/count', {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getBusRecipe = function (bus) {

        var deferred = $q.defer();
        $http.get(apiAddress + '/api/bus/' + bus.id + '/recipe', {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getBusVitesse = function (bus) {

        var deferred = $q.defer();
        $http.get(apiAddress + '/api/bus/' + bus.id + '/vitesse', {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getBusDistance = function (bus) {


        var deferred = $q.defer();
        $http.get(apiAddress + '/api/bus/' + bus.id + '/distance', {
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
        $http.get(apiAddress + '/api/bus/societe/' + societe.id, {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.getAll = function () {


        var deferred = $q.defer();
        $http.get(apiAddress + '/api/bus', {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.update = function (bus) {


        var deferred = $q.defer();
        $http.put(apiAddress + '/api/bus/' + bus.id, bus, {
            headers: secHeaders
        }).success(function (resp) {

            deferred.resolve(resp);
        }).error(function (err) {

            console.error(JSON.stringify(err));
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.delete = function (bus) {

        var deferred = $q.defer();
        $http.delete(apiAddress + '/api/bus/' + bus.id, {
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