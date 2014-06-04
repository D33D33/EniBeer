var beerControllers = angular.module( 'beerControllers', ['beerServices'] );
beerControllers.controller( 'BeerCtrl', ['$scope', '$location', 'Beers',
    function( $scope, $location, Beers )
    {
        $scope.beers = Beers.getAllBeers();
        $scope.beer = undefined;

        $scope.editBeer = function( beer ){
            $scope.beer = beer;
        };

        $scope.validate = function()
        {
            Beers.save( $scope.beer);
        };

        $scope.cancel = function()
        {
            if( $scope.beer._id == undefined )
            {
                $scope.beer = undefined;
                return;
            }

            Beers.load( $scope.beer, function( success, beer ){
                $scope.beer = beer;
                for (var i = 0; i < $scope.beers.length; i++) {
                    var b = $scope.beers[i];
                    if( beer._id == b._id )
                    {
                        $scope.beers[i] = beer;
                    }
                }
            });
        };

        $scope.create = function()
        {
            $scope.beer = {};
        };

        $scope.deleteBeer = function(beer){
            Beers.destroy( beer );
        }
    }
] );

