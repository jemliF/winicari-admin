'use strict';

app.controller('AppareilsController', function ($scope, AdminProvider, userId, AppareilProvider) {
    AdminProvider.getAdminById(userId).then(function (resp) {
        $scope.currentUser = resp;
        AppareilProvider.getBySociete($scope.currentUser.societe).then(function (resp) {
            $scope.appareils = resp;
        }, function (err) {
            console.error(err);
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

    $scope.save = function (appareil) {
        appareil.localisation = {
            x: 0.0,
            y: 0.0
        };
        appareil.societe = $scope.currentUser.societe;
        
        AppareilProvider.save(appareil).then(function (resp) {
            $scope.appareils.push(appareil);
            new PNotify({
                title: 'Appareil ajouté avec succés',
                text: 'Appareil ' + appareil.reference + ' a été ajouté avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
            new PNotify({
                title: 'Echéc lors de l\'ajout du appareil',
                text: 'Un autre appareil ayant ce référence est déja existant!',
                type: 'error'
            });
        });
    }
    $scope.updateAppareil = function (appareil) {
        $scope.selectedAppareil = appareil;
        $scope.oldAppareil = _.clone(appareil);
    };
    $scope.update = function (appareil) {
        AppareilProvider.update(appareil).then(function (resp) {
            new PNotify({
                title: 'Appareil modifié avec succés',
                text: 'Appareil ' + appareil.reference + ' a été modifié avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
            new PNotify({
                title: 'Echéc lors de la modification du appareil',
                text: 'Un autre appareil ayant ce référence est déja existant!',
                type: 'error'
            });
        });
        ;
    };

    $scope.deleteAppareil = function (appareil) {
        $scope.selectedAppareil = appareil;
        $scope.oldAppareil = _.clone(appareil);
    };
    $scope.delete = function (appareil) {
        AppareilProvider.delete(appareil).then(function (resp) {
            $scope.appareils.splice($scope.appareils.indexOf(appareil), 1);
            new PNotify({
                title: 'Appareil supprimé avec succés',
                text: 'Appareil ' + appareil.reference + ' a été supprimé avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
            new PNotify({
                title: 'Echéc lors de la suppression du appareil',
                text: 'Ce appareil n\'a pas pu être supprimé',
                type: 'error'
            });
        });
    };
});
