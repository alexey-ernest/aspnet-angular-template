﻿/**
 * @fileOverview Home view.
 * @module home
 */

(function (window, angular) {
    "use strict";

    var module = angular.module("home", [
      "ui.router",
      "facility"
    ]);

    // Routes
    module.config([
      "$stateProvider", function ($stateProvider) {
          $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "home.html",
                controller: "HomeCtrl",
                data: {
                    pageTitle: "ASP.NET Angular Material Template"
                }
            });
      }
    ]);

    // Controllers
    module.controller("HomeCtrl", [
      "$scope", function ($scope) {
        
      }
    ]);

})(window, window.angular);