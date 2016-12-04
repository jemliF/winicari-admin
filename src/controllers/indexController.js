'use strict';

app.controller('IndexController', function ($scope, StationProvider, AdminProvider, userId, BusProvider) {

    AdminProvider.getAdminById(userId).then(function (resp) {
        $scope.currentUser = resp;

        $(document).ready((function () {
            var map, pos, busMarkers = [], stationsMarkers = [], busss, stationss, zoom = 0;

            /*function initialize() {
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
             var busIcon = {
             url: 'vendor/imagess/bus.png',
             size: new google.maps.Size(32, 37),
             origin: new google.maps.Point(0, 0),
             anchor: new google.maps.Point(10, 34)
             };
             var busStopIcon = {
             url: 'vendor/imagess/busstop.png',
             size: new google.maps.Size(32, 37),
             origin: new google.maps.Point(0, 0),
             anchor: new google.maps.Point(10, 34)
             };

             StationProvider.getBySociete($scope.currentUser.societe).then(function (stations) {

             stations.forEach(function (station) {
             var stationMarker = new google.maps.Marker({
             position: {
             lat: station.localisation.x, lng: station.localisation.y
             },
             map: map,
             title: station.nom,
             icon: busStopIcon
             });
             stationMarker.addListener('click', function () {
             var infoWindow = new google.maps.InfoWindow({map: map});
             infoWindow.setPosition({
             lat: station.localisation.x, lng: station.localisation.y
             });
             infoWindow.setContent('<strong>' + station.nom + '</strong>');
             //map.setCenter(stationMarker.getPosition());
             });
             });
             }, function (err) {

             new PNotify({
             title: 'Données non disponible',
             type: 'dark',
             text: 'SVP, vérifier votre connexion Internet.',
             nonblock: {nonblock: true, nonblock_opacity: .2}
             });
             });

             window.setInterval(function () {
             BusProvider.getBySociete($scope.currentUser.societe).then(function (buss) {
             $scope.buss = buss;

             if (busMarkers.length) {
             busMarkers.forEach(function (busMarker) {
             busMarker.setMap(null);
             });
             }
             busMarkers = new Array(buss.length);
             buss.forEach(function (bus) {
             BusProvider.getBusService(bus).then(function (service) {
             if (service.current) {
             BusProvider.getBusPosition(bus).then(function (busPosition) {

             if (busPosition.localisation) {

             var busMarker = new google.maps.Marker({
             position: {
             lat: busPosition.localisation.x, lng: busPosition.localisation.y
             },
             map: map,
             title: bus.immatriculation,
             icon: busIcon
             });
             busMarker.addListener('click', function () {
             var infoWindow = new google.maps.InfoWindow({map: map});
             infoWindow.setPosition({
             lat: busPosition.localisation.x, lng: busPosition.localisation.y
             });
             BusProvider.getBusDistance(bus).then(function (distance) {
             BusProvider.getBusVitesse(bus).then(function (vitesse) {
             BusProvider.getBusRecipe(bus).then(function (recipe) {
             BusProvider.getBusService(bus).then(function (service) {
             BusProvider.getBusTicketCount(bus).then(function (ticketCount) {
             BusProvider.getBusCancelledTicketCount(bus).then(function (cancelledTicketCount) {
             BusProvider.getBusLastTicket(bus).then(function (ticket) {
             voyage = ticket.voyage % 2 == 0 ? 'Aller' : 'Retour';
             infoWindow.setContent('<div style="height: auto; width: auto;"><strong>Date: </strong>' + new Date(busPosition.date) +
             '<br><strong>Code: </strong>' + bus.code +
             '<br><strong>Numéro de chauffeur: </strong>' + service.codeCh + '<br><strong>Numéro de convoyeur: </strong>' +
             service.codeConv + '<br><strong>Ligne: </strong>' + service.codeLigne + '<br><strong>Voyage: </strong>' +
             voyage + '<br><strong>Distance parcourue: </strong>' +
             distance + ' Km<br><strong>Vitesse: </strong>' + vitesse + ' Km/s<br><strong>Nombre de tickets: </strong>' +
             ticketCount + '<br><strong>Nombre d\'annulations: </strong>' + cancelledTicketCount + '<br><strong>Recette: </strong>' +
             recipe + ' DT</div>');
             }, function (err) {
             console.error(err);
             });
             }, function (err) {
             console.error(err);
             });
             }, function (err) {
             console.error(err);
             });
             }, function (err) {
             console.error(err);
             });
             }, function (err) {
             console.error(err);
             });
             }, function (err) {
             console.error(err);
             });
             }, function (err) {
             console.error(err);
             });
             });
             busMarkers.push(busMarker);
             }
             }, function (err) {
             console.error(err);
             });
             }
             });

             });
             }, function (err) {
             new PNotify({
             title: 'Données non disponible',
             type: 'dark',
             text: 'SVP, vérifier votre connexion Internet.',
             nonblock: {nonblock: true, nonblock_opacity: .2}
             });
             console.error(err);
             });
             }, 5000);
             }*/
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
                var busIcon = {
                    url: 'vendor/imagess/bus.png',
                    size: new google.maps.Size(32, 37),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 34)
                };
                var busStopIcon = {
                    url: 'vendor/imagess/busstop.png',
                    size: new google.maps.Size(32, 37),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 34)
                };
                var voyage, leftBottom = null, rightTop = null, bounds = null;
                var onMapProjectionZoneChanged = function () {
                    bounds = null;
                    zoom = map.getZoom();
                    $scope.zoom = zoom;
                    resetStationMarkers();
                    resetBusMarkers();
                    if (map.getZoom() > 10) {
                        $scope.selectedBus = null;
                        leftBottom = {};
                        rightTop = {};
                        bounds = JSON.parse(JSON.stringify(map.getBounds()));
                        console.log('bounds: ' + JSON.stringify(bounds));
                        leftBottom.x = bounds.south;
                        leftBottom.y = bounds.west;
                        rightTop.x = bounds.north;
                        rightTop.y = bounds.east;
                        displayStationsByBounds(leftBottom, rightTop);
                    } else {
                        leftBottom = null, rightTop = null, bounds = null;
                        resetBusMarkers();
                    }
                }
                map.addListener('zoom_changed', function () {
                    onMapProjectionZoneChanged();
                });
                map.addListener('dragend', function () {
                    $scope.selectedBus = null;
                    onMapProjectionZoneChanged();
                });
                setInterval(function () {
                    resetBusMarkers();
                    if (leftBottom !== null && rightTop !== null && zoom > 10) {
                        BusProvider.getByBoundsAndSociete(leftBottom, rightTop, $scope.currentUser.societe).then(function (buss) {
                            busss = buss;
                            console.log('busses: ', JSON.stringify(buss));
                            busMarkers = new Array(buss.length);
                            buss.forEach(function (bus) {
                                BusProvider.getBusService(bus).then(function (service) {
                                    if (service.current) {
                                        var busMarker = new google.maps.Marker({
                                            position: {
                                                lat: bus.localisation.x, lng: bus.localisation.y
                                            },
                                            map: map,
                                            title: bus.immatriculation,
                                            icon: busIcon
                                        });
                                        busMarker.addListener('click', function () {
                                            bus.vitesse = parseInt(bus.vitesse);
                                            $scope.selectedBus = bus;
                                            //console.log('car: ', JSON.stringify($scope.selectedBus));
                                            map.setCenter(new google.maps.LatLng($scope.selectedBus.localisation.x, $scope.selectedBus.localisation.y));
                                            BusProvider.getBusDistance(bus).then(function (distance) {
                                                if (distance) {
                                                    $scope.distance = distance.toFixed(2);
                                                }
                                            }, function (err) {
                                                console.error(err);
                                            });
                                            BusProvider.getBusRecipe(bus).then(function (recipe) {
                                                if (recipe) {
                                                    $scope.recipe = recipe.toFixed(3);
                                                }
                                            }, function (err) {
                                                console.error(err);
                                            });
                                            BusProvider.getBusNegativeRecipe(bus).then(function (negativeRecipe) {
                                                if (negativeRecipe) {
                                                    $scope.negativeRecipe = negativeRecipe.toFixed(3);
                                                }
                                            }, function (err) {
                                                console.error(err);
                                            });
                                            BusProvider.getBusService(bus).then(function (service) {
                                                if (service) {
                                                    $scope.service = service;
                                                }
                                            }, function (err) {
                                                console.error(err);
                                            });
                                            BusProvider.getBusTicketCount(bus).then(function (ticketCount) {
                                                if (ticketCount) {
                                                    $scope.ticketCount = ticketCount;
                                                }
                                            }, function (err) {
                                                console.error(err);
                                            });
                                            BusProvider.getBusCancelledTicketCount(bus).then(function (cancelledTicketCount) {
                                                if (cancelledTicketCount) {
                                                    $scope.cancelledTicketCount = cancelledTicketCount;
                                                }
                                            }, function (err) {
                                                console.error(err);
                                            });
                                            BusProvider.getBusLastTicket(bus).then(function (ticket) {
                                                console.log('ticket: ' + JSON.stringify(ticket));
                                                $scope.lastTicket = ticket;
                                                voyage = ticket.voyage % 2 == 0 ? 'Aller' : 'Retour';
                                                $scope.voyage = ticket.voyage + ' (' + voyage + ')';
                                            }, function (err) {
                                                console.error(err);
                                            });
                                        });
                                        busMarkers.push(busMarker);
                                    }
                                }, function (err) {
                                    console.error(err);
                                });
                                if ($scope.selectedBus && bus.id == $scope.selectedBus.id) {
                                    $scope.selectedBus = bus;
                                    console.log('car: ', JSON.stringify($scope.selectedBus));
                                    BusProvider.getBusDistance(bus).then(function (distance) {
                                        if (distance) {
                                            $scope.distance = distance.toFixed(2);
                                        }
                                    }, function (err) {
                                        console.error(err);
                                    });
                                    BusProvider.getBusRecipe(bus).then(function (recipe) {
                                        if (recipe) {
                                            $scope.recipe = recipe.toFixed(3);
                                        }
                                    }, function (err) {
                                        console.error(err);
                                    });
                                    BusProvider.getBusNegativeRecipe(bus).then(function (negativeRecipe) {
                                                if (negativeRecipe) {
                                                    $scope.negativeRecipe = negativeRecipe.toFixed(3);
                                                }
                                            }, function (err) {
                                                console.error(err);
                                            });
                                    BusProvider.getBusService(bus).then(function (service) {
                                        if (service) {
                                            $scope.service = service;
                                        }
                                    }, function (err) {
                                        console.error(err);
                                    });
                                    BusProvider.getBusTicketCount(bus).then(function (ticketCount) {
                                        if (ticketCount) {
                                            $scope.ticketCount = ticketCount;
                                        }
                                    }, function (err) {
                                        console.error(err);
                                    });
                                    BusProvider.getBusCancelledTicketCount(bus).then(function (cancelledTicketCount) {
                                        if (cancelledTicketCount) {
                                            $scope.cancelledTicketCount = cancelledTicketCount;
                                        }
                                    }, function (err) {
                                        console.error(err);
                                    });
                                    BusProvider.getBusLastTicket(bus).then(function (ticket) {
                                        console.log('ticket: ' + JSON.stringify(ticket));
                                        $scope.lastTicket = ticket;
                                        voyage = ticket.voyage % 2 == 0 ? 'Aller' : 'Retour';
                                        $scope.voyage = ticket.voyage + ' (' + voyage + ')';
                                    }, function (err) {
                                        console.error(err);
                                    });
                                }
                            });
                        }, function (err) {
                            console.error(err);
                        });
                    }
                }, 2000);
                var displayStationsByBounds = function (leftBottom, rightTop) {
                    StationProvider.getByBoundsAndSociete(leftBottom, rightTop, $scope.currentUser.societe).then(function (stations) {
                        stationss = stations;
                        console.log('stations: ', JSON.stringify(stations));
                        stationsMarkers = new Array(stations.length);
                        stations.forEach(function (station) {
                            var stationMarker = new google.maps.Marker({
                                position: {
                                    lat: station.localisation.x, lng: station.localisation.y
                                },
                                map: map,
                                title: station.nom,
                                icon: busStopIcon
                            });

                            stationMarker.addListener('click', function () {
                                var infoWindow = new google.maps.InfoWindow({map: map});
                                infoWindow.setPosition({
                                    lat: station.localisation.x, lng: station.localisation.y
                                });
                                infoWindow.setContent('<strong>' + station.nom + '</strong>');
                                //map.setCenter(stationMarker.getPosition());
                            });
                            stationsMarkers.push(stationMarker);
                        });
                    }, function (err) {
                        console.error(err);
                    });
                }
                var resetStationMarkers = function () {
                    stationsMarkers.forEach(function (stationMarker) {
                        stationMarker.setMap(null);
                    });
                }
                var resetBusMarkers = function () {
                    busMarkers.forEach(function (busMarker) {
                        busMarker.setMap(null);
                    });
                    //busMarkers = new Array(0);
                }
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
        })());
    }, function (err) {
        console.error(err);
    });

    window.gMapsCallback = function () {
        $(window).trigger('gMapsLoaded');
    }
});