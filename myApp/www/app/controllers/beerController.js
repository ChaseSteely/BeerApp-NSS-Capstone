angular
    .module("BeerApp")
    .controller("BeerCtrl", function (BeerFactory, $timeout, $scope, $cordovaCamera, $cordovaFile, Firebase_Config) {
        $scope.beers = []
        $scope.query = ""
        $scope.downloadURL = ""
        $scope.myRating = ""
        /**
         * Use factory to get all breweries from Firebase
         */
        // BeerFactory.getMarkers().then(data => {
        //     $scope.breweries = data
        // })
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
                if ($scope.downloadURL !== null) {
                    let beerLog = {
                        "data": data,
                        "url": $scope.downloadURL,
                        // "name": data.beer.beer_name,
                        // "brewery": data.beer.brewery.brewery_name,
                        // "style": data.beer.beer_style,
                        // "ibu": data.beer.beer_ibu,
                        // "untapRating" : data.beer.weighted_rating_score.toFixed(2),
                        "rating": $scope.myRating,
                        // "abv": data.beer.beer_abv + "%",
                        "wishlist": false
                        // "id": data.beer.bid
                    }
                }else {
                    let beerLog = {
                        "data": data,
                        // "name": data.beer.beer_name,
                        // "brewery": data.beer.brewery.brewery_name,
                        // "style": data.beer.beer_style,
                        // "ibu": data.beer.beer_ibu,
                        // "untapRating" : data.beer.weighted_rating_score.toFixed(2),
                        "rating": $scope.myRating,
                        // "abv": data.beer.beer_abv + "%",
                        "wishlist": false
                        // "id": data.beer.bid
                    }
                    console.log($scope.downloadURL)
                    console.log(beerLog)
                    BeerFactory.logBeer(beerLog)
                }
            })




        }

        $scope.takePhoto = function () {
            let options = {
                quality: 80,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 250,
                targetHeight: 250,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
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
                        console.log($scope.downloadURL)
                        // const photo = {
                        //     "url": $scope.downloadURL,
                        //     "uid": firebase.auth().currentUser.uid,
                        //     "time": Date.now()
                        // }

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