var administrationControllers = angular.module( 'administrationControllers', ['userServices', 'angularCharts'] );

administrationControllers.controller( 'AdministrationCtrl', ['$scope', '$http', '$location', 'User',
    function( $scope, $http, $location, User )
    {
        if( !User.isLogged || !User.isAdmin ) // user launching app on register
        {
            $location.path( '/' );
        }

        $scope.user = User;
        $scope.asError = false;

        $scope.users = [];

        $http( {method: 'GET', url: '/users'} )
            .success( function( data, status, headers, config )
            {
                $scope.users = data;
            } )
            .error( function( data, status, headers, config )
            {
                $scope.asError = true;
            } );

        $scope.savePortalConfig = function()
        {
            //$scope.portal.$save();
        };

        $scope.setAdmin = function( index )
        {
            $scope.saveUser( $scope.users[ index ] );
        };
        $scope.setEnable = function( index )
        {
            $scope.saveUser( $scope.users[ index ] );
        };

        $scope.saveUser = function( user )
        {
            $http( {method: 'POST', url: '/users/' + user._id,
                data: user } )
                .success( function( data, status, headers, config )
                {
                    if( data.error )
                    {
                        $scope.asError = true;
                    }
                } )
                .error( function( data, status, headers, config )
                {
                    $scope.asError = true;
                } );
        };

        $scope.dismissError = function()
        {
            $scope.asError = false;
        };


        // Chart
        $scope.chart = {
            chartType: 'bar',
            config: {
                labels: false,
                legend: {
                    display: false,
                    position: 'right'
                }
            },
            data: {
                series: ['connection'],
                data: [ ]
            }
        };

        $scope.$watch( 'users', function()
        {
            var today = new Date().setHours( 0, 0, 0, 0 );

            $scope.chart.data.data = [];
            var oneDay = 1000 * 60 * 60 * 24;
            for( var i = 0; i < 7; i++ )
            {
                var day = new Date( today - ( (6 - i ) * oneDay ) );
                $scope.chart.data.data.push( {x: day.getDate() /*+ '/' + ( day.getMonth() + 1 )*/, y: [0]} );
            }

            today /= oneDay;
            _.each( $scope.users, function( user )
            {
                if( user.createdAt )
                {
                    var day = new Date( user.createdAt ).getTime() / oneDay,
                        index = Math.floor( today - day + 1 );

                    if( index >= 0 && index < 7 )
                    {
                        $scope.chart.data.data[6 - index].y[0]++;
                    }
                }
            } );
        } );
    }
] );

administrationControllers.directive( 'bootstrapSwitch', function()
{
    return {
        restrict: 'A',
        scope: {
            state: '=',
            eventHandler: '&onChange'
        },
        link: function( scope, element, attrs )
        {
            $( element ).bootstrapSwitch();

            // binding angular->bootstrapSwitch
            scope.$watch( 'state', function()
            {
                $( element ).bootstrapSwitch( 'setState', scope.state );
            } );

            // binding bootstrapSwitch->angular
            $( element ).on( 'switch-change', function( e, data )
            {
                if( scope.state != data.value )
                {
                    scope.$apply( function()
                    {
                        scope.state = data.value;
                    } );

                    scope.eventHandler();
                }
            } );
        }
    };
} );

