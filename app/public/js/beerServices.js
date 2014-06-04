var beerServices = angular.module('beerServices', []);

beerServices.factory('Beers', ['$http',
    function ($http) {
        var beers = [];

        $http({method: 'GET', url: '/beers'}).
            success(function (data, status, headers, config) {
                for (var i = 0; i < data.length; i++) {
                    beers.push(data[i]);
                }
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        var def = {};
        def.getAllBeers = function () {
            return beers;
        };

        def.save = function (beer) {
            var route = '/beers';
            if (beer.id)
                route += '/' + beer._id;

            $http({method: 'POST', url: route, data: beer}).
                success(function (data, status, headers, config) {
                    beers.push(beer);
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        };

        def.load = function (beer, cb) {
            $http({method: 'GET', url: '/beers/' + beer._id, data: beer}).
                success(function (data, status, headers, config) {
                    cb(true, data);
                }).
                error(function (data, status, headers, config) {
                    cb(false, data);
                });
        };

        def.destroy = function( beer ) {
            $http({method: 'DELETE', url: '/beers/' + beer._id}).
                success(function (data, status, headers, config) {
                    for (var i = 0; i < beers.length; i++) {
                        var b = beers[i];
                        if(b._id == beer._id )
                        {
                            beers.splice(i, 1);
                            return;
                        }
                    }
                }).
                error(function (data, status, headers, config) {

                });
        };

        return def;
    }]);
