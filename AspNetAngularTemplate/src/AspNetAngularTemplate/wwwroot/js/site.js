/**
 * @fileOverview Angular application entry point.
 * @module site
 */

(function (angular) {
    "use strict";

    var app = angular.module("app", [
      "ui.router", // for ui routing
      "ngMaterial", // activate material design
      "home",
      "userMenu"
    ]);

    // Config
    app.config([
      "$urlRouterProvider", "$locationProvider", "$stateProvider", "$mdThemingProvider", "$animateProvider",
      function ($urlRouterProvider, $locationProvider, $stateProvider, $mdThemingProvider, $animateProvider) {

          // routes
          $stateProvider
            .state("app", {
                "abstract": true,
                template: "<div ui-view></div>"
            });

          $urlRouterProvider.otherwise("/");

          // defining themes
          var indigo = $mdThemingProvider.extendPalette("indigo", {
              "contrastLightColors": ["500"]
          });
          $mdThemingProvider.definePalette("indigo-custom", indigo);

          var green = $mdThemingProvider.extendPalette("green", {
              "contrastLightColors": ["500"]
          });
          $mdThemingProvider.definePalette("green-custom", green);

          // configuring themes
          $mdThemingProvider.theme("default")
            .primaryPalette("indigo-custom", {
                "default": "500",
                "hue-1": "700",
                "hue-2": "100"
            })
            .accentPalette("green-custom", {
                "default": "500"
            });


          // configure animation
          $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
      }
    ]);

    // Main application controller
    app.controller("AppCtrl", [
      "$rootScope", "$state",
      function ($rootScope, $state) {

          $rootScope.pageTitle = "ASP.NET Angular Material Template";
          $rootScope.$on("$stateChangeSuccess", function (event, toState/*, toParams, from, fromParams*/) {
              if (angular.isDefined(toState.data) && angular.isDefined(toState.data.pageTitle)) {
                  $rootScope.pageTitle = toState.data.pageTitle;
              }
          });

          $rootScope.gotoHome = function () {
              $state.go("home");
          };
      }
    ]);

})((window.angular));