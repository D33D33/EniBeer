var app = angular.module( 'app', [
        'ngRoute',
        'ngCookies',
        'indexControllers',
        'signInControllers',
        'cartsControllers',
        'beerControllers',
        'administrationControllers',
        'userServices',
        'beerServices',
        'cartServices'
    ] )

    .config( ['$routeProvider',
        function( $routeProvider )
        {
            $routeProvider.
                when( '/', {
                    templateUrl: 'views/index.html',
                    controller: 'IndexCtrl'
                } ).
                when( '/signin', {
                    templateUrl: 'views/signin.html',
                    controller: 'SignInCtrl'
                } ).
                when( '/carts', {
                    templateUrl: 'views/carts.html',
                    controller: 'CartsCtrl'
                } ).
                when( '/beers', {
                    templateUrl: 'views/beers.html',
                    controller: 'BeerCtrl'
                } ).
                when( '/administration', {
                    templateUrl: 'views/administration.html',
                    controller: 'AdministrationCtrl'
                } ).
                otherwise( {
                    redirectTo: '/'
                } );
        }] )

    .run( ['$rootScope', '$location', 'User',
        function( $rootScope, $location, User )
        {
        $rootScope.$on( '$routeChangeStart', function( event, next, current )
        {
            if( next.access && next.access.userRequired && !User.isLogged )
            {
                if( current && current.$$route.originalPath == '/signin' )
                {
                    $location.path( $rootScope.prev );
                }
                else
                {
                    $rootScope.next = next.$$route.originalPath;
                    $rootScope.prev = current ? current.$$route.originalPath : '';

                    $location.path( "/signin" ); // load the login route
                }
            }
        } );
        } ] );
