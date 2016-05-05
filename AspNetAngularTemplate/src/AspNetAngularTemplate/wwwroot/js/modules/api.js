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
                      name: name
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

    /**
     * AccessPoint API service.
     */
    module.factory("accessPointApi", ["$http", function ($http) {
        function buildApiUrl(id) {
            return "/api/facilities/" + id + "/accesspoints";
        }

        return {
            /**
             * Creates new access point.
             * @param {String} fid Facility id.
             * @returns Promise.
             */
            add: function (fid, name) {
                var data = {
                    name: name
                };
                return $http.post(buildApiUrl(fid), data);
            },

            /**
             * Retrieves all access points for facility.
             * @param {String} fid Facility id.
             * @returns Promise.
             */
            getAll: function (fid) {
                return $http.get(buildApiUrl(fid));
            },

            /**
             * Retrieves access point by id.
             * @param {String} fid Facility id.
             * @param {String} id Access point id.
             * @returns Promise.
             */
            get: function (fid, id) {
                return $http.get(buildApiUrl(fid) + "/" + id);
            },

            /**
             * Updates access points.
             * @param {String} fid Facility id.
             * @param {String} id Access point id.
             * @param {String} name New Facility name.
             * @returns Promise.
             */
            update: function (fid, id, name) {
                var data = {
                    name: name
                };
                return $http.put(buildApiUrl(fid) + "/" + id, data);
            },

            /**
             * Deletes access point by id.
             * @param {String} fid Facility id.
             * @param {String} id Access point id.
             * @returns Promise.
             */
            remove: function (fid, id) {
                return $http.delete(buildApiUrl(fid) + "/" + id);
            }
        };
    }
    ]);

})(window, window.angular);