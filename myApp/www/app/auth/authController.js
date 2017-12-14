angular.module("BeerApp")
    .controller("AuthCtrl", function ($scope, $location, $state, AuthFactory, $timeout) {
        $scope.auth = {}

        $scope.logoutUser = function () {
            AuthFactory.logout()
            $location.url('/tab/login')
        }

        $scope.logMeIn = function () {
            AuthFactory.authenticate($scope.auth).then(function (didLogin) {
                $scope.login = {}
                $timeout(function () {
                    $location.url("/tab/dash")
                }, 1000)
            })
        }

        $scope.registerUser = function (registerNewUser) {
            AuthFactory.registerWithEmail(registerNewUser)
                .then(function (didRegister) {
                    $scope.logMeIn(registerNewUser)
                    AuthFactory.updateProfile(registerNewUser)
                })
        }

    })