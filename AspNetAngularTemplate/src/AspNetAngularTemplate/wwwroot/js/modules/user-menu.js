/**
 * @fileOverview User menu directive.
 * @module 
 */

(function (window, angular) {
    "use strict";

    var module = angular.module("userMenu", []);

    /**
     * Encapsulates user menu logic and markup.
     */
    module.directive("appUserMenu",
    [
        function() {
            // Usage:
            //     <app-user-menu></app-user-menu>
            // Creates:
            // 
            return {
                restrict: "EA",
                replace: true,
                templateUrl: "user-menu.html",
                link: ["$scope", function($scope) {
                }]
            };
        }
    ]);
    
})(window, window.angular);