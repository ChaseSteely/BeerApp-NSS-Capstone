angular
    .module("BeerApp")
    .controller("BeerCtrl", function (BeerFactory, $timeout,$ionicLoading, $scope, $cordovaCamera, $cordovaFile, Firebase_Config, $cordovaToast) {
        $scope.beers = []
        $scope.query = ""
        $scope.downloadURL = ""
        $scope.myRating = ""
        $scope.beerLog = {}

        //  Use factory to get all beers from Firebase
        $scope.finder = (event, query) => {
            if (event.key === "Enter") {
                BeerFactory.searchUntappd(query).then(data => {
                    $timeout(function () {
                        console.log()
                    }, 100)
                    $scope.beers = data
                    console.log($scope.beers)
                })
            }

        }

        $scope.showRating = function (rating) {
            console.log(rating)
            $scope.myRating = rating
            console.log($scope.myRating)

        }

        $scope.checkIn = function (event) {
            let bID = parseInt(event.target.id)
            console.log(bID)
            BeerFactory.beerMe(bID).then(data => {
                $timeout(function () {
                    console.log()
                }, 100)

                $scope.beerLog = {
                    "data": data,
                    "url": $scope.downloadURL,
                    "rating": $scope.myRating,
                    "wishlist": false,
                    "dateLogged": Date.now(),
                    "uid": firebase.auth().currentUser.uid,
                }

                bLog = $scope.beerLog
                BeerFactory.logBeer(bLog)
                // create a toast with settings:
            })

        }

        // $scope.showToast = function(message) {
        //     if (window.plugins && window.plugins.toast) {
        //         window.plugins.toast.showLongCenter("Cheers");
        //     }
        //     else $ionicLoading.show({ template: "Cheers", noBackdrop: true, duration: 2000 });
        // }
          
          

        $scope.takePhoto = function () {
            let options = {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.srcImage = "data:image/jpeg;base64," + imageData;
                console.log($scope.srcImage)
                let storage = firebase.storage();
                console.log(storage)
                let storageRef = storage.ref();
                let fileRef = storageRef.child("images/" + Date.now() + '.jpeg')
                console.log(fileRef)
                let uploadTask = fileRef.putString($scope.srcImage, 'data_url')

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function (snapshot) {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, function (error) {

                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;

                            case 'storage/canceled':
                                // User canceled the upload
                                break;

                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                        }
                    }, function () {
                        // Upload completed successfully, now we can get the download URL
                        $scope.downloadURL = uploadTask.snapshot.downloadURL;
                    });

            }, function (err) {
                // error
            });
        }

    })

    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };

    }]);