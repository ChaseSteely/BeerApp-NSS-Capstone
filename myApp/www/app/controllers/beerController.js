angular
    .module("BeerApp")
    .controller("BeerCtrl", function (BeerFactory, $timeout, $scope, $cordovaCamera, $cordovaFile, Firebase_Config) {
        $scope.beers = []
        $scope.query = ""
        let storage = firebase.storage();
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


        $scope.takePhoto = function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                // An error occured. Show a message to the user
            });
            // File or Blob named mountains.jpg
            let file = $scope.imgURI

            // Create the file metadata
            let metadata = {
                contentType: 'image/jpeg'
            };

            // Upload file and metadata to the object 'images/mountains.jpg'
            let uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

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
                    let downloadURL = uploadTask.snapshot.downloadURL;
                });
        }



    })

    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };

    }]);