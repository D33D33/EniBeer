var cartServices = angular.module('cartServices', []);

cartServices.factory('Cart', ['$http',
    function ($http) {
        var cart = {
            beers: [],
            amount: 0
        };

        var def = {};
        def.addToCart = function (beer, quantity) {
            cart.amount += beer.price * quantity;

            for (var i = 0; i < cart.beers.length; i++) {
                if (cart.beers[i].code == beer.code) {
                    cart.beers[i].quantity += quantity;
                    return;
                }
            }
            beer.quantity = quantity;
            cart.beers.push(beer);
        };

        def.removeFromCart = function (beer, quantity) {
            cart.amount -= beer.price * quantity;
            for (var i = 0; i < cart.beers.length; i++) {
                if (cart.beers[i].code == beer.code) {
                    cart.beers[i].quantity -= quantity;
                    if (cart.beers[i].quantity <= 0)
                        cart.beers.splice(i, 1);
                    return;
                }
            }
        };

        def.getCart = function () {
            return cart;
        };

        def.emptyCart = function () {
            cart.beers = [];
            cart.amount = 0;
        };

        def.validateCart = function (cb) {
            $http({method: 'POST', url: '/cart', data: cart}).
                success(function (data, status, headers, config) {
                    cb(true);
                }).
                error(function (data, status, headers, config) {
                    cb(false);
                });
        };

        def.getAllCarts = function(cb){
            $http({method: 'GET', url: '/carts'}).
                success(function(data, status, headers, config) {
                    cb( true, data );
                }).
                error(function(data, status, headers, config) {
                    cb( false, data );
                });
        };

        return def;
    }]);
