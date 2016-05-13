/**
 * @fileOverview Facility view.
 * @module facility
 */

(function(window, angular) {
    "use strict";

    var module = angular.module("facility",
    [
        "ui.router",
        "api"
    ]);

    // Routes
    module.config([
        "$stateProvider", function($stateProvider) {
            $stateProvider
                .state("facilities",
                {
                    url: "/facilities",
                    templateUrl: "facilities.html",
                    controller: "FacilitiesCtrl",
                    data: {
                        pageTitle: "Facilities List"
                    }
                })
                .state("facility",
                {
                    url: "/facilities/{id}/accesspoints",
                    templateUrl: "facility.html",
                    controller: "FacilityCtrl",
                    data: {
                        pageTitle: "Facility Details"
                    }
                })
                .state("facility-update",
                {
                    url: "/facilities/{id}/update",
                    templateUrl: "facility-update.html",
                    controller: "FacilityUpdateCtrl",
                    data: {
                        pageTitle: "Update Facility Details"
                    }
                })
                .state("accesspoint-update",
                {
                    url: "/facilities/{fid}/accesspoints/{id}/update",
                    templateUrl: "accesspoint-update.html",
                    controller: "AccessPointUpdateCtrl",
                    data: {
                        pageTitle: "Update Access Point Details"
                    }
                });
        }
    ]);

    // Controllers
    module.controller("FacilitiesCtrl",
    [
        "$scope", "facilityApi", "$mdDialog",
        function($scope, facilityApi, $mdDialog) {
            $scope.facilities = [];
            $scope.loading = false;

            function loadFacilities() {
                $scope.loading = true;
                facilityApi.getAll()
                    .then(function(res) {
                            $scope.facilities = res.data;
                        },
                        function(res) {
                            console.error("Failed to load facilities: " + res.status);
                            $mdDialog.show($mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Failed to load facilities")
                                .content("Try again.")
                                .ok("Ok"));
                        })
                    .finally(function() {
                        $scope.loading = false;
                    });
            }

            loadFacilities();

            $scope.newFacility = function(e) {
                $mdDialog.show({
                        controller: [
                            "$scope", "$mdDialog", function($scope, $mdDialog) {
                                $scope.facility = {};

                                $scope.hide = function() {
                                    $mdDialog.hide();
                                };
                                $scope.cancel = function() {
                                    $mdDialog.cancel();
                                };
                                $scope.confirm = function(data) {
                                    $mdDialog.hide(data);
                                };
                            }
                        ],
                        templateUrl: "new-facility-dialog.html",
                        parent: angular.element(document.body),
                        targetEvent: e,
                        clickOutsideToClose: true,
                        fullscreen: false
                    })
                    .then(function(data) {
                        $scope.loading = true;
                        facilityApi.add(data.name)
                            .then(function() {
                                    // reload list
                                    loadFacilities();
                                },
                                function(res) {
                                    console.error("Failed to add new facility: " + res.status);
                                    $mdDialog.show($mdDialog.alert()
                                        .clickOutsideToClose(true)
                                        .title("Failed to add new facility")
                                        .content("Try again.")
                                        .ok("Ok"));
                                })
                            .finally(function() {
                                $scope.loading = false;
                            });
                    });
            };
        }
    ]);

    module.controller("FacilityCtrl",
    [
        "$scope", "facilityApi", "accessPointApi", "$mdDialog", "$stateParams", "$state",
        function($scope, facilityApi, accessPointApi, $mdDialog, $stateParams, $state) {
            $scope.accessPoints = [];
            $scope.loading = false;

            function loadFacility(id) {
                $scope.loading = true;
                facilityApi.get(id)
                    .then(function(res) {
                            $scope.facility = res.data;
                        },
                        function(res) {
                            console.error("Failed to load facility details: " + res.status);
                            $mdDialog.show($mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Failed to load facility details")
                                .content("Try again.")
                                .ok("Ok"));
                        })
                    .finally(function() {
                        $scope.loading = false;
                    });
            }

            function loadAccessPoints(id) {
                $scope.loading = true;
                accessPointApi.getAll(id)
                    .then(function(res) {
                            $scope.accessPoints = res.data;
                        },
                        function(res) {
                            console.error("Failed to load facility access points: " + res.status);
                            $mdDialog.show($mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Failed to load access points")
                                .content("Try again.")
                                .ok("Ok"));
                        })
                    .finally(function() {
                        $scope.loading = false;
                    });
            }

            loadFacility($stateParams.id);
            loadAccessPoints($stateParams.id);

            $scope.gotoFacilities = function() {
                $state.go("facilities");
            };
            $scope.gotoUpdateFacility = function() {
                $state.go("facility-update", { id: $stateParams.id });
            };
            $scope.newAccessPoint = function(e) {
                $mdDialog.show({
                        controller: [
                            "$scope", "$mdDialog", function($scope, $mdDialog) {
                                $scope.acessPoint = {};

                                $scope.hide = function() {
                                    $mdDialog.hide();
                                };
                                $scope.cancel = function() {
                                    $mdDialog.cancel();
                                };
                                $scope.confirm = function(data) {
                                    $mdDialog.hide(data);
                                };
                            }
                        ],
                        templateUrl: "new-accesspoint-dialog.html",
                        parent: angular.element(document.body),
                        targetEvent: e,
                        clickOutsideToClose: true,
                        fullscreen: false
                    })
                    .then(function(data) {
                        $scope.loading = true;
                        accessPointApi.add($stateParams.id, data.name)
                            .then(function() {
                                    // reload list
                                    loadAccessPoints($stateParams.id);
                                },
                                function(res) {
                                    console.error("Failed to add new access point: " + res.status);
                                    $mdDialog.show($mdDialog.alert()
                                        .clickOutsideToClose(true)
                                        .title("Failed to add new access point")
                                        .content("Try again.")
                                        .ok("Ok"));
                                })
                            .finally(function() {
                                $scope.loading = false;
                            });
                    });
            };
        }
    ]);

    module.controller("FacilityUpdateCtrl",
    [
        "$scope", "$stateParams", "facilityApi", "$mdDialog", "$state",
        function($scope, $stateParams, facilityApi, $mdDialog, $state) {
            $scope.facility = null;
            $scope.loading = false;

            function loadFacility(id) {
                $scope.loading = true;
                facilityApi.get(id)
                    .then(function(res) {
                            $scope.facility = res.data;
                        },
                        function(res) {
                            console.error("Failed to load facility details: " + res.status);
                            $mdDialog.show($mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Failed to load facility details")
                                .content("Try again.")
                                .ok("Ok"));
                        })
                    .finally(function() {
                        $scope.loading = false;
                    });
            }

            loadFacility($stateParams.id);

            $scope.gotoFacility = function() {
                $state.go("facility", { id: $stateParams.id });
            };
            $scope.update = function(data) {
                $scope.loading = true;
                facilityApi.update(data.id, data.name)
                    .then(function() {
                            $mdDialog.show($mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Facility updated")
                                .content("All changes were saved successfully.")
                                .ok("Ok"));
                            $state.go("facility", { id: $stateParams.id });
                        },
                        function(res) {
                            console.error("Failed to update facility: " + res.status);
                            $mdDialog.show($mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Failed to update facility")
                                .content("Try again.")
                                .ok("Ok"));
                        })
                    .finally(function() {
                        $scope.loading = false;
                    });
            };
        }
    ]);

    module.controller("AccessPointUpdateCtrl",
    [
        "$scope", "$stateParams", "accessPointApi", "$mdDialog", "$state",
        function($scope, $stateParams, accessPointApi, $mdDialog, $state) {
            $scope.accessPoint = null;
            $scope.loading = false;

            function loadAccessPoint(fid, id) {
                $scope.loading = true;
                accessPointApi.get(fid, id)
                    .then(function(res) {
                            $scope.accessPoint = res.data;
                        },
                        function(res) {
                            console.error("Failed to load access point details: " + res.status);
                            $mdDialog.show($mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Failed to load access point details")
                                .content("Try again.")
                                .ok("Ok"));
                        })
                    .finally(function() {
                        $scope.loading = false;
                    });
            }

            loadAccessPoint($stateParams.fid, $stateParams.id);

            $scope.gotoFacility = function() {
                $state.go("facility", { id: $stateParams.fid });
            };
            $scope.update = function(data) {
                $scope.loading = true;
                accessPointApi.update($stateParams.fid, data.id, data.name)
                    .then(function() {
                            $mdDialog.show($mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Access Point updated")
                                .content("All changes were saved successfully.")
                                .ok("Ok"));
                            $state.go("facility", { id: $stateParams.fid });
                        },
                        function(res) {
                            console.error("Failed to update access point: " + res.status);
                            $mdDialog.show($mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title("Failed to update access point")
                                .content("Try again.")
                                .ok("Ok"));
                        })
                    .finally(function() {
                        $scope.loading = false;
                    });
            };
        }
    ]);

})(window, window.angular);