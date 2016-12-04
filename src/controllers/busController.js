'use strict';

app.controller('BusController', function ($scope, AdminProvider, userId, BusProvider) {
    AdminProvider.getAdminById(userId).then(function (resp) {
        $scope.currentUser = resp;
        BusProvider.getBySociete($scope.currentUser.societe).then(function (resp) {
            $scope.buss = resp;
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

    $scope.save = function (bus) {
        bus.societe = $scope.currentUser.societe;
        BusProvider.save(bus).then(function (resp) {
            $scope.buss.push(resp);
            new PNotify({
                title: 'Bus ajouté avec succés',
                text: 'Bus ' + bus.code + ' a été ajouté avec succés',
                type: 'success'
            });
        }, function (err) {
            console.error(err);
            new PNotify({
                title: 'Echéc lors de l\'ajout du bus',
                text: 'Un autre bus ayant ce code est déja existant!',
                type: 'error'
            });
        });
    }
    $scope.selectBus = function (bus) {
        $scope.selectedBus = bus;
        $scope.oldBus = _.clone(bus);
    };
    $scope.update = function (bus) {
        BusProvider.update(bus).then(function (resp) {
            new PNotify({
                title: 'Bus modifié avec succés',
                text: 'Bus ' + bus.code + ' a été modifié avec succés',
                type: 'success'
            });
            $scope.buss[$scope.buss.indexOf($scope.selectedBus)] = $scope.oldBus;
        }, function (err) {
            console.error(err);
            new PNotify({
                title: 'Echéc lors de la modification du bus',
                text: 'Un autre bus ayant ce code est déja existant!',
                type: 'error'
            });
        });
        ;
    };
    $scope.delete = function (bus) {
        BusProvider.delete(bus).then(function (resp) {
            $scope.buss.splice($scope.buss.indexOf(bus), 1);
            new PNotify({
                title: 'Bus supprimé avec succés',
                text: 'Bus ' + bus.code + ' a été supprimé avec succés',
                type: 'success'
            });
        }, function (err) {
            new PNotify({
                title: 'Echéc lors de la suppression du bus',
                text: 'Ce bus n\'a pas pu être supprimé',
                type: 'error'
            });
            console.error(err);
        });
    };
});
