angular.module("BeerApp")
    .controller("AuthCtrl", function ($scope, $location, $state, AuthFactory, $timeout, $ionicModal, $cordovaCamera) {
        $scope.auth = {}

        //Ionic code needed to show and close Modal
        $ionicModal.fromTemplateUrl('../../partials/registerModal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            $timeout(function(){
                $scope.modal.show(); 
                },0)
        };

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

        $scope.reg = function (registerNewUser) {
            AuthFactory.registerWithEmail(registerNewUser)
            .then(function (didRegister) {
                $scope.modal.hide();
                AuthFactory.updateProfile(registerNewUser)
                $scope.logMeIn(registerNewUser)

            })
        }

        $scope.hideModal = function () {
            $scope.modal.hide();
        };

    })