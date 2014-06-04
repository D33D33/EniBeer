var indexControllers = angular.module( 'indexControllers', ['userServices', 'beerServices', 'cartServices'] );
indexControllers.controller( 'IndexCtrl', ['$scope', '$location', 'User', 'Beers', 'Cart',
    function( $scope, $location, User, Beers, Cart )
    {
        $scope.beers = Beers.getAllBeers();
        $scope.cart = Cart.getCart();
        $scope.user = User;

        $scope.addToCart = function( beer ){
            Cart.addToCart(beer, 1);
        };

        $scope.removeFromCart = function( beer ){
            Cart.removeFromCart(beer, 1);
        };

        $scope.emptyCart = function( ){
            Cart.emptyCart();
        };

        $scope.validateCart = function( ){
            if( User.isLogged ) {
                Cart.validateCart(function (success) {
                    $scope.success = success;
                    if( success )
                        $scope.emptyCart();
                });
            }
            else {
                $location.path( '/signin' );
            }
        };

        $scope.dismiss = function(){
            $scope.success = undefined;
        };

        $scope.signout = function(){
            User.logout();
        }
    }
] );

