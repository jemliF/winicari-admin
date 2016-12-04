'use strict';

app.controller('MenuController', function ($scope, AdminProvider, userId) {
    AdminProvider.getAdminById(userId).then(function (resp) {
        $scope.currentUser = resp;
        
    }, function (err) {
        console.error(err);
    });
});