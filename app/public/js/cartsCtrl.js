var cartsControllers = angular.module( 'cartsControllers', ['cartServices'] );
cartsControllers.controller( 'CartsCtrl', ['$scope', '$location', 'Cart',
    function( $scope, $location, Cart )
    {
        $scope.carts = [];
        $scope.cart = {};

        Cart.getAllCarts(function( success, carts ){
            $scope.carts = carts;
        });

        $scope.view = function(cart){
            $scope.cart = cart;
        }
    }
] );

