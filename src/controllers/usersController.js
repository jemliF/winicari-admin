'use strict';

app.controller('UsersController', function ($scope, AdminProvider, userId) {
    AdminProvider.getAdminById(userId).then(function (resp) {
        $scope.currentUser = resp;
        
        AdminProvider.getBySocieteAndRole($scope.currentUser.societe, 'user').then(function (result) {
            
            $scope.users = result;
        }, function (err) {
            
            new PNotify({
                title: 'Données non disponible',
                type: 'dark',
                text: 'SVP, vérifier votre connexion Internet.',
                nonblock: {nonblock: true, nonblock_opacity: .2}
            });
        });
    }, function (err) {
        console.error(err);
    });

    $scope.save = function (user) {
        user.role = "user";
        user.societe = $scope.currentUser.societe;
        AdminProvider.saveAdmin(user).then(function (resp) {
            $scope.users.push(resp);
        }, function (err) {
            new PNotify({
                title: 'Echéc lors de l\'ajout de l\'utilisateur',
                text: 'Un autre utilisateur ayant cet email est déja existant!',
                type: 'error'
            });
            console.error(err);
        });
    }
    $scope.selectUser = function (user) {
        $scope.selectedUser = user;
        $scope.oldUser = _.clone(user);
    };
    $scope.update = function (user) {
        AdminProvider.updateAdmin(user).then(function (resp) {
            $scope.users[$scope.users.indexOf($scope.selectedUser)] = $scope.oldUser;
        }, function (err) {
            new PNotify({
                title: 'Echéc lors de la modification de l\'utilisateur',
                text: 'Un autre utilisateur ayant cet email est déja existant!',
                type: 'error'
            });
            console.error(err);
        });
    };
    $scope.delete = function (user) {
        AdminProvider.deleteAdmin(user).then(function (resp) {
            $scope.users.splice($scope.users.indexOf(user), 1);
        }, function (err) {
            console.error(err);
        });
    };
});
