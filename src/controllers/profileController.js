'use strict';

app.controller('ProfileController', function ($scope, AdminProvider, userId) {
    AdminProvider.getAdminById(userId).then(function (resp) {
        $scope.currentUser = resp;
        
    }, function (err) {
        new PNotify({
            title: 'Données non disponible',
            type: 'dark',
            text: 'SVP, vérifier votre connexion Internet.',
            nonblock: {nonblock: true, nonblock_opacity: .2}
        });
        console.error(err);
    });

    $scope.update = function (user) {
        AdminProvider.updateAdmin(user).then(function (resp) {
            $scope.currentUser = resp;
            new PNotify({
                title: 'Profile modifié avec succés',
                text: 'Profile modifié avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
        });
    }
    $scope.updatePassword = function () {
        $scope.currentUser.password = $scope.newPassword;
        AdminProvider.updateAdmin($scope.currentUser).then(function (admin) {
            $scope.currentUser = admin;
            //$('#passModal').close();
            new PNotify({
                title: 'Mot de passe modifié avec succés',
                text: 'Mot de passe modifié avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
        });
    }

});