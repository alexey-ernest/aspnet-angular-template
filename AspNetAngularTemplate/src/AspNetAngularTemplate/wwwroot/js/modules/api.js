/**
 * @fileOverview API communication services.
 * @module api
 */

(function (window, angular) {
    "use strict";

    var module = angular.module("api", []);

    /**
     * Facility API service.
     */
    module.factory("facilityApi", ["$http", function ($http) {
        var api = "/api/facilities";

        return {
            /**
             * Creates new facility.
             * @returns Promise.
             */
            add: function(name) {
                  var data = {
                      anme: name
                  };
                  return $http.post(api, data);
            },

            /**
             * Retrieves all facilities.
             * @returns Promise.
             */
            getAll: function() {
                return $http.get(api);
            },

            /**
             * Retrieves facility by id.
             * @param {String} id Facility id.
             * @returns Promise.
             */
            get: function(id) {
                return $http.get(api + "/" + id);
            },

            /**
             * Updates facility.
             * @param {String} id Facility id.
             * @param {String} name New Facility name.
             * @returns Promise.
             */
            update: function(id, name) {
                var data = {
                    name: name
                };
                return $http.put(api + "/" + id, data);
            },

            /**
             * Deletes facility by id.
             * @param {String} id Facility id.
             * @returns Promise.
             */
            remove: function(id) {
                return $http.delete(api + "/" + id);
            }
          };
      }
    ]);

})(window, window.angular);