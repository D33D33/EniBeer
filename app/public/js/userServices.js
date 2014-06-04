var userServices = angular.module( 'userServices', [] );

userServices.factory( 'User', ['$cookieStore', '$http',
    function( $cookieStore, $http )
    {
        var user = $cookieStore.get( 'user' );

        if( !user )
        {
            user = { isLogged: false };
        }

        user.saveLocal = function()
        {
            $cookieStore.put( 'user', this );
        };

        user.logout = function()
        {
            this.isLogged = false;
            $cookieStore.remove( 'user' );
            $http( {method: 'POST', url: '/signout'} );
        };

        return user;
    }] );
