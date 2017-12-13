angular.module('BeerApp')
    .factory('BeerFactory', function ($http, AuthFactory, Firebase_Config, Untappd) {
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
            "beerMe": {
                value: function (beerID) {
                    return $http({
                        method: "GET",
                        url: `https://api.untappd.com/v4/search/beer/?q=${beerID}&compact/"true"client_id=${Untappd.clientID}&client_secret=${Untappd.clientSecret}`,
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
                                url: `${Firebase_Config.databaseURL}/breweries/.json?auth=${idToken}`
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
                        url: `${Firebase_Config.databaseURL}/breweries/${key}/.json?auth=${idToken}`
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
                        url: `${Firebase_Config.databaseURL}/breweries/${key}/.json?auth=${idToken}`
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
                        url: `${Firebase_Config.databaseURL}/breweries/${key}/.json?auth=${idToken}`,
                        data: placeHolder
                    })
                }
            },
            "logBeer": {
                value: function (photo) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "POST",
                                url: `${Firebase_Config.databaseURL}/users/loggedBeer.json?auth=${idToken}`,
                                data: photo

                            })
                        })

                }

            }
        })
    })