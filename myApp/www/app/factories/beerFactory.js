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
                        url: `https://api.untappd.com/v4/beer/info/${beerID}?client_id=${Untappd.clientID}&client_secret=${Untappd.clientSecret}&compact="true"`,
                    }).then(response => {
                        return response.data.response
                    })
                }
            },
            "pub": {
                value: function () {
                    return $http({
                        method: "GET",
                        url: `https://api.untappd.com/v4/thepub/local/?lat=36.1&lng=-86.7&client_id=${Untappd.clientID}&client_secret=${Untappd.clientSecret}`,
                    }).then(response => {
                        return response.data.response
                    })
                }
            },
            "visitBrewery": {
                value: function (breweryID) {
                    return $http({
                        method: "GET",
                        url: `https://api.untappd.com/v4/brewery/info/${breweryID}?client_id=${Untappd.clientID}&client_secret=${Untappd.clientSecret}`,
                    }).then(response => {
                        return response.data.response
                    })
                }
            },
            "searchBrewery": {
                value: function (query) {
                    return $http({
                        method: "GET",
                        url: `https://api.untappd.com/v4/search/brewery/?q=${query}&client_id=${Untappd.clientID}&client_secret=${Untappd.clientSecret}`,
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
                                url: `${Firebase_Config.databaseURL}/nashvilleBreweries/.json?auth=${idToken}`
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
            "getEvents": {
                value: function () {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "GET",
                                url: `${Firebase_Config.databaseURL}/events/.json?auth=${idToken}`
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
            "getUserEvents": {
                value: function (id) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "GET",
                                url: `${Firebase_Config.databaseURL}/savedEvents/.json?auth=${idToken}&orderBy="uid"&equalTo="${id}"`
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
            "getLoggedBeers": {
                value: function (id) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "GET",
                                url: `${Firebase_Config.databaseURL}/loggedBeer/.json?auth=${idToken}&orderBy="uid"&equalTo="${id}"`
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
            "getLoggedBreweries": {
                value: function (id) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "GET",
                                url: `${Firebase_Config.databaseURL}/loggedBreweries/.json?auth=${idToken}&orderBy="uid"&equalTo="${id}"`
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
            "getSingleEvent": {
                value: function (key) {
                    return firebase.auth().currentUser.getIdToken(true)
                    return $http({
                        method: "GET",
                        url: `${Firebase_Config.databaseURL}/events/${key}/.json?auth=${idToken}`
                    }).then(response => {
                        return response.data
                    })
                }
            },
            "byeByeEvent": {
                value: function (key) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "DELETE",
                                url: `${Firebase_Config.databaseURL}/savedEvents/${key}/.json?auth=${idToken}`
                            })
                        })
                }
            },
            "wishGranted": {
                value: function (placeholder, key, target) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "PUT",
                                url: `${Firebase_Config.databaseURL}/loggedBeer/${key}/${target}/.json?auth=${idToken}`,
                                data: placeholder
                            })
                        })
                }
            },
            "logBeer": {
                value: function (entry) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "POST",
                                url: `${Firebase_Config.databaseURL}/loggedBeer/.json?auth=${idToken}`,
                                data: entry
                            })
                        })
                }
            },
            "logBrewery": {
                value: function (entry) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "POST",
                                url: `${Firebase_Config.databaseURL}/loggedBreweries/.json?auth=${idToken}`,
                                data: entry
                            })
                        })
                }
            },
            "postEvent": {
                value: function (entry) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "POST",
                                url: `${Firebase_Config.databaseURL}/events/.json?auth=${idToken}`,
                                data: entry
                            })
                        })
                }
            },
            "logEvent": {
                value: function (entry) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "POST",
                                url: `${Firebase_Config.databaseURL}/savedEvents/.json?auth=${idToken}`,
                                data: entry
                            })
                        })
                }
            }//END logEvent
        })
    })