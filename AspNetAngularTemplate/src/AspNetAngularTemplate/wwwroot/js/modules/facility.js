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
                .state("facilities.details",
                {
                    url: "/{fid}",
                    templateUrl: "facility.html",
                    controller: "FacilityCtrl",
                    data: {
                        pageTitle: "Facility Details"
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

            function dialogController($scope, $mdDialog) {
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

            $scope.newFacility = function(e) {
                $mdDialog.show({
                        controller: dialogController,
                        templateUrl: "new-facility-dialog.html",
                        parent: angular.element(document.body),
                        targetEvent: e,
                        clickOutsideToClose: true,
                        fullscreen: false
                    })
                    .then(function(data) {
                        $scope.lading = true;
                        facilityApi.add(data.name)
                            .then(function() {
                                    $mdDialog.show($mdDialog.alert()
                                        .clickOutsideToClose(true)
                                        .title("Facility created")
                                        .content("New facility successfully created.")
                                        .ok("Ok"));

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
        "$scope", "stateParams", "facilityApi", "$mdDialog",
        function($scope, stateParams, facilityApi, $mdDialog) {
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

            loadFacility($stateParams.fid);

            $scope.update = function(data) {
                $scope.loading = true;
                facilityApi.update(data.id, data.name)
                    .then(function() {
                            // nothing doing
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

})(window, window.angular);