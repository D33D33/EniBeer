var signInControllers = angular.module( 'signInControllers', [
    'userServices'
] );

signInControllers.controller( 'SignInCtrl', ['$scope', '$http', '$location', '$rootScope', 'User',
    function( $scope, $http, $location, $rootScope, User )
    {
        $scope.failureLogin = false;
        $scope.errorLogin = false;

        $scope.validationFailure = {
            emptyName: false,
            emptyEmail: false,
            emptyPassword: false,
            duplicateEmail: false,
            duplicatePhone: false,
            unknown: false
        };

        $scope.signup = {
            lastname: '',
            firstname: '',
            email: '',
            password: '',
            phone: ''
        };

        $scope.login = function()
        {
            // reset
            $scope.validationFailure = {
                emptyName: false,
                emptyEmail: false,
                emptyPassword: false,
                duplicateEmail: false,
                duplicatePhone: false,
                unknown: false
            };

            $http( {method: 'POST', url: '/login', data: {username: $scope.signin.email, password: $scope.signin.password}} )
                .success( function( data, status, headers, config )
                {
                    if( data.success )
                    {
                        // succefull login
                        User.isLogged = true;
                        User.password = $scope.signin.password;
                        $scope.failureLogin = false;
                        $scope.errorLogin = false;

                        User = _.extend( User, data.user );
                        User.saveLocal();

                        $location.path( '/' );
                    }
                    else
                    {
                        User.isLogged = false;
                        $scope.failureLogin = true;
                        $scope.errorLogin = false;
                    }
                } )
                .error( function( data, status, headers, config )
                {
                    User.isLogged = false;
                    $scope.failureLogin = false;
                    $scope.errorLogin = true;
                } );
        };

        $scope.create = function()
        {
            $scope.validationFailure = {
                emptyName: $scope.signup.lastname === '' || $scope.signup.firstname === '',
                emptyEmail: $scope.signup.email === '',
                emptyPassword: $scope.signup.password === '' || $scope.signup.password === undefined,
                duplicateEmail: false,
                duplicatePhone: false,
                unknown: false
            };
            $scope.validationFailure.asError = $scope.validationFailure.emptyName ||
                $scope.validationFailure.emptyEmail ||
                $scope.validationFailure.emptyPassword ||
                $scope.validationFailure.shortPassword;

            $scope.failureLogin = false;
            $scope.errorLogin = false;

            if( $scope.validationFailure.asError )
            {
                return;
            }

            $http( {method: 'POST', url: '/users',
                data: {
                    lastName: $scope.signup.lastname,
                    firstName: $scope.signup.firstname,
                    email: $scope.signup.email,
                    password: $scope.signup.password,
                    phone: $scope.signup.phone
                }} )
                .success( function( data, status, headers, config )
                {
                    if( data.success )
                    {
                        // succefull login
                        User.isLogged = true;
                        User.password = $scope.signup.password;

                        User = _.extend( User, data.user );

                        $location.path( $rootScope.next || '/' );
                    }
                    else
                    {
                        User.isLogged = false;

                        if( data.errorIn == 'email' )
                        {
                            $scope.validationFailure.asError = true;
                            $scope.validationFailure.duplicateEmail = true;
                        }
                        else if( data.errorIn == 'phone' )
                        {
                            $scope.validationFailure.asError = true;
                            $scope.validationFailure.duplicatePhone = true;
                        }
                        else
                        {
                            $scope.validationFailure.asError = false;
                            $scope.validationFailure.unknown = true;
                        }

                    }
                } )
                .error( function( data, status, headers, config )
                {
                    User.isLogged = false;
                    $scope.validationFailure.unknown = true;
                    $scope.validationFailure.asError = false;
                } );
        };
    }
] );

