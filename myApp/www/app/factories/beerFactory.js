angular.module('BeerApp')
    .factory('BeerFactory', function ($http, AuthFactory, Untappd) {
        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            "searchUntappd": {
                value: function (query) {
                    return $http({
                        method: "GET",
                        url: `https://api.untappd.com/v4/search/beer/?q=${query}&client_id=${Untappd.clientID}&client_secret=${Untappd.clientSecret}`,
                    }).then(response => {
                        return response.data.response
                    })
                }
            },
            "getMarkers": {
                value: function () {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "GET",
                                url: `https://beercentricity.firebaseio.com/breweries/.json?auth=${idToken}`
                            }).then(response => {
                                const data = response.data

                                this.cache = Object.keys(data).map(key => {
                                    data[key].id = key
                                    return data[key]
                                })

                                return this.cache
                            })
                        })
                }
            },
            "single": {
                value: function (key) {
                    return firebase.auth().currentUser.getIdToken(true)
                    return $http({
                        method: "GET",
                        url: `https://beercentricity.firebaseio.com/breweries/${key}/.json?auth=${idToken}`
                    }).then(response => {
                        return response.data
                    })
                }
            },
            "murder": {
                value: function (key) {
                    return firebase.auth().currentUser.getIdToken(true)
                    return $http({
                        method: "DELETE",
                        url: `https://beercentricity.firebaseio.com//breweries/${key}/.json?auth=${idToken}`
                    })
                }
            },
            "find": {
                value: function (searchString) {
                    const result = this.cache.find(emp => {
                        return emp.firstName.includes(searchString) ||
                            emp.lastName.includes(searchString)
                    })
                    return result
                }
            },
            "fire": {
                value: function (placeHolder, key) {
                    placeHolder.employmentEnd = Date.now()

                    return $http({
                        method: "PUT",
                        url: `https://beercentricity.firebaseio.com//breweries/${key}/.json?auth=${idToken}`,
                        data: placeHolder
                    })
                }
            },
            "add": {
                value: function (placeHolder) {
                    return $http({
                        method: "POST",
                        url: "https://capstone-571b4.firebaseio.com/breweries/.json",
                        data: placeHolder

                    })
                }
            }
        })
    })