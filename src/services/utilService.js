'use strict';

app
    .factory('apiAddress', function () {
        return 'http://51.254.212.179:8080'
    })
    .factory('secHeaders', function () {
        var authdata = {
            username: 'user',
            password: 'ramindjawadi'
        };
        var headers = authdata && authdata.username ? {
            Authorization: "Basic "
            + btoa(authdata.username + ":"
                + authdata.password)
        } : {};
        return headers;
    })
    .factory('userId', function (AdminProvider) {
        var userId = localStorage.getItem('userId');
        AdminProvider.getAdminById(userId).then(function (resp) {
            if (resp.nom === undefined) {
                window.location = '/adminsite/login/index';
            } else {
                
                return userId;
            }
        });
        return userId;
    });