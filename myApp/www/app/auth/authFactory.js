angular.module("BeerApp")
    .factory("AuthFactory", function ($http, $timeout, $location, $state) {
        let currentUserData = null


        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                currentUserData = user

                if ($location.url() !== "/tab/dash") {
                    $timeout(function () {
                        console.log("User is authenticated")
                        $location.url("/tab/dash")
                    }, 1)
                } else {
                    $state.reload();
                }

            } else {
                currentUserData = null
                console.log("User is not authenticated")
                $timeout(function () {
                    $location.url("/tab/login")
                }, 100)
            }
        })

        return Object.create(null, {
            isAuthenticated: {
                value: () => {
                    const user = currentUserData
                    return user ? true : false
                }
            },
            getUser: {
                value: () => firebase.auth().currentUser
            },
            logout: {
                value: () => firebase.auth().signOut()
            },
            authenticate: {
                value: credentials =>
                    firebase.auth()
                        .signInWithEmailAndPassword(
                        credentials.email,
                        credentials.password
                        )
            },
            registerWithEmail: {
                value: user =>
                    firebase.auth()
                        .createUserWithEmailAndPassword(
                        user.email,
                        user.password
                        )
            },
            updateProfile: {
                value: drinker =>
                    firebase.auth().currentUser
                        .updateProfile({
                            displayName: drinker.displayName,
                            photoURL: drinker.photoURL
                        })
            }

        })
    })