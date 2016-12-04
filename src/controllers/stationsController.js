'use strict';

app.controller('StationsController', function ($scope, AdminProvider, userId, StationProvider, $http) {

    var map, pos, busIcon, busStopIcon, stationMarkers = [], infoWindows = [];
    window.gMapsCallback = function () {
        $(window).trigger('gMapsLoaded');
    }
    $(document).ready((function () {
        AdminProvider.getAdminById(userId).then(function (resp) {
            $scope.currentUser = resp;
            StationProvider.getBySociete($scope.currentUser.societe).then(function (resp) {
                $scope.stations = resp;
            }, function (err) {
                console.error(err);
                new PNotify({
                    title: 'Données non disponible',
                    type: 'dark',
                    text: 'SVP, vérifier votre connexion Internet.',
                    nonblock: {nonblock: true, nonblock_opacity: .2}
                });
            });
            $scope.selectedStation = {};

            function initialize() {
                pos = {
                    lat: 35.758075,
                    lng: 10.596399
                };
                
                var mapOptions = {
                    zoom: 8,
                    center: new google.maps.LatLng(pos.lat, pos.lng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById('map'), mapOptions);
                busIcon = {
                    url: 'vendor/imagess/bus.png',
                    size: new google.maps.Size(32, 37),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 34)
                };
                busStopIcon = {
                    url: 'vendor/imagess/busstop.png',
                    size: new google.maps.Size(32, 37),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 34)
                };
                google.maps.event.addListener(map, 'click', function (event) {
                    $scope.station = {};
                    $scope.station.societe = $scope.currentUser.societe;
                    $scope.station.localisation = {
                        x: event.latLng.lat(),
                        y: event.latLng.lng()
                    };
                    $('#addStation').modal('show');
                    /*$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + event.latLng.lat() + ',' + event.latLng.lng()).success(function (response) {
                     if (response.status === 'OK') {
                     
                     if (response.results[0].formatted_address.indexOf('Tunisia') === -1) {
                     new PNotify({
                     title: 'Echéc lors de l\'ajout de la station',
                     text: 'SVP, sélectionnez des emplacements dans le territoire Tunisien!',
                     type: 'error'
                     });
                     } else {
                     $scope.station = {};
                     $scope.station.societe = $scope.currentUser.societe;
                     $scope.station.localisation = {
                     x: event.latLng.lat(),
                     y: event.latLng.lng()
                     };
                     $('#addStation').modal('show');
                     }
                     }
                     }).error(function (err) {
                     console.error(err);
                     });*/
                });

                StationProvider.getBySociete($scope.currentUser.societe).then(function (stations) {
                    
                    stations.forEach(function (station) {
                        
                        var marker = new google.maps.Marker({
                            position: {
                                lat: station.localisation.x, lng: station.localisation.y
                            },
                            map: map,
                            title: station.nom,
                            icon: busStopIcon,
                            draggable: true
                        });
                        marker.addListener('click', function () {
                            var infoWindow = new google.maps.InfoWindow({map: map});
                            infoWindow.setPosition({
                                lat: station.localisation.x, lng: station.localisation.y
                            });
                            $scope.selectedStation = {};
                            $scope.selectedStation = station;
                            
                            infoWindow.setContent('<strong>' + station.nom + '</strong>&nbsp;<button class="btn btn-link" style="margin-bottom: 0px;" data-toggle="modal" ng-click="selectStation(' + station + ')" data-target="#updateStation">Modifier</button>&nbsp;<button class="btn btn-link" style="margin-bottom: 0px;" data-toggle="modal" data-target="#deleteStation" ng-click="selectStation(station)">Supprimer</button>');
                            infoWindows.push(infoWindow);
                        });
                        marker.addListener('rightclick', function () {
                            alert('right click');
                        });
                        marker.addListener('dragend', function () {

                            station.localisation.x = marker.getPosition().lat();
                            station.localisation.y = marker.getPosition().lng();
                            
                            StationProvider.update(station).then(function (resp) {
                                new PNotify({
                                    title: 'Station modifié avec succés',
                                    text: 'Station ' + station.code + ' a été modifié avec succés',
                                    type: 'success'
                                });
                            }, function (err) {
                                console.error(err);
                                new PNotify({
                                    title: 'Echéc lors de la modification de la station',
                                    text: 'Une autre station ayant ce code est déja existante!',
                                    type: 'error'
                                });
                            });
                        });
                        stationMarkers.push(marker);

                        
                    });
                }, function (err) {
                    
                    new PNotify({
                        title: 'Données non disponible',
                        type: 'dark',
                        text: 'SVP, vérifier votre connexion Internet.',
                        nonblock: {nonblock: true, nonblock_opacity: .2}
                    });
                });
            }

            //async defer
            function loadGoogleMaps() {
                var script_tag = document.createElement('script');
                script_tag.setAttribute("type", "text/javascript");
                script_tag.setAttribute("src", "http://maps.google.com/maps/api/js?key=AIzaSyCFIrO_FkWanN6bqCu2oWIyh5mxdj7-cGs&callback=gMapsCallback");
                (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
            }

            $(window).bind('gMapsLoaded', initialize);
            loadGoogleMaps();
            $scope.update = function (station) {
                
                StationProvider.update(station).then(function (resp) {
                    for (var i = 0; i < stationMarkers.length; i++) {
                        
                        
                        if ((stationMarkers[i].position.lat === station.localisation.x) && (stationMarkers[i].position.lng === station.localisation.y)) {
                            stationMarkers[i].title = station.nom;
                            infoWindows[i].setContent('<strong>' + station.nom + '</strong>&nbsp;<button class="btn btn-link" style="margin-bottom: 0px;" data-toggle="modal" ng-click="selectStation(' + station + ')" data-target="#updateStation">Modifier</button>&nbsp;<button class="btn btn-link" style="margin-bottom: 0px;" data-toggle="modal" data-target="#deleteStation" ng-click="selectStation(station)">Supprimer</button>');
                        }
                    }
                    new PNotify({
                        title: 'Station modifié avec succés',
                        text: 'Station ' + station.code + ' a été modifié avec succés',
                        type: 'success'
                    });
                }, function (err) {
                    console.error(err);
                    new PNotify({
                        title: 'Echéc lors de la modification de la station',
                        text: 'Une autre station ayant ce nom est déja existante!',
                        type: 'error'
                    });
                });
                ;
            };
            $scope.cancel = function () {
                $scope.selectedStation = {};
            }
            $scope.delete = function (station) {
                
                StationProvider.delete(station).then(function (resp) {
                    for (var i = 0; i < stationMarkers.length; i++) {
                        
                        
                        if (stationMarkers[i].title === station.nom) {
                            stationMarkers.slice(i, 1);
                            stationMarkers[i].setMap(null);
                            //infoWindows[i].close();
                            infoWindows.slice(i, 1);
                        }
                    }
                    new PNotify({
                        title: 'Station supprimé avec succés',
                        text: 'Station ' + station.code + ' a été supprimé avec succés',
                        type: 'success'
                    });
                }, function (err) {
                    new PNotify({
                        title: 'Echéc lors de la suppression de la station',
                        text: 'La station n\'a pas pu être supprimé',
                        type: 'error'
                    });
                    console.error(err);
                });
            };
            $scope.selectStation = function (station) {
                
                $scope.selectedStation = station;
            }
            $scope.add = function (station) {
                StationProvider.save(station).then(function (response) {
                    var marker = new google.maps.Marker({
                        position: {
                            lat: response.localisation.x, lng: response.localisation.y
                        },
                        map: map,
                        title: response.nom,
                        icon: busStopIcon,
                        draggable: true
                    });
                    marker.addListener('click', function () {
                        
                        var infoWindow = new google.maps.InfoWindow({map: map});
                        infoWindow.setPosition({
                            lat: response.localisation.x, lng: response.localisation.y
                        });
                        $scope.selectedStation = station;
                        infoWindow.setContent('<strong>' + station.nom + '</strong>&nbsp;<button class="btn btn-link" style="margin-bottom: 0px;" data-toggle="modal" ng-click="selectStation(' + station + ')" data-target="#updateStation">Modifier</button>&nbsp;<button class="btn btn-link" style="margin-bottom: 0px;" data-toggle="modal" data-target="#deleteStation" ng-click="selectStation(station)">Supprimer</button>');
                        infoWindows.push(infoWindow);
                    });
                    marker.addListener('dragend', function () {
                        station.localisation.x = marker.getPosition().lat();
                        station.localisation.y = marker.getPosition().lng();
                        StationProvider.update(station).then(function (resp) {
                            new PNotify({
                                title: 'Station modifié avec succés',
                                text: 'Station ' + station.code + ' a été modifié avec succés',
                                type: 'success'
                            });
                        }, function (err) {
                            console.error(err);
                            new PNotify({
                                title: 'Echéc lors de la modification de la station',
                                text: 'Une autre station ayant ce code est déja existante!',
                                type: 'error'
                            });
                        });
                    });
                    stationMarkers.push(marker);
                }, function (err) {
                    console.error(err);
                });
            };
        }, function (err) {
            console.error(err);
        });

    })());


});
