import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Appearance } from "react-native";
import { useState, useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { getDistance } from "geolib";
import * as Location from 'expo-location';
import { customMapStyle } from "../styles.js";

/**
 * The Map screen component
 *
 * @param setMusicNearby - The set function for music nearby state
 * @param setLocationNearby - The set function for the location nearby state
 * @returns "Map" component
 */
function Map({ setMusicNearby, setLocationNearby }) {
    //The color scheme of the mobile phone
    const colorScheme = Appearance.getColorScheme();
    //The URL used to fetch the locations to be displayed in the map
    const url = "https://comp2140.uqcloud.net/api/location/?api_key=SREr2lsVOu"
    //The variable storing the inital state of the Map screen
    const initialMapState = {
        locationPermission: false,
        locations: [],
        userLocation: {
            latitude: -27.5263381,
            longitude: 153.0954163,
        },
        nearbyLocation: {}
    };
    //The hook used to ask the user for permission to track location
    const [permission, askPermission] = Location.useForegroundPermissions()
    //The state storing the Map screen details
    const [mapState, setMapState] = useState(initialMapState)
    useEffect(() => {
        //Ask user for tracking location permission
        askPermission();
        //Fetch the map's locations from the API
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                const locationsModified = result.map((location) => {
                    location.coordinates = {
                        latitude: parseFloat(location.latitude),
                        longitude: parseFloat(location.longitude)
                    }
                    return location
                })
                setMapState({
                    ...mapState,
                    locations: locationsModified
                })
            })
    }, [])
    //Use ref hook used for keeping reference to the "unsubscribe" returned from Location's watch position async promise
    const listener = useRef(null)
    //The hook used to set the map's location permission when user allows
    useEffect(() => {
        if (permission?.granted) {
            setMapState({
                ...mapState,
                locationPermission: true
            })
        }
      }, [permission]);

    //The hook used to start tracking user when permission is granted
    useEffect(() => {
        // Function to retrieve location nearest to current user location
        function calculateDistance(userLocation) {
            const nearestLocations = mapState.locations.map(location => {
                const metres = getDistance(
                    userLocation,
                    location.coordinates
                );
                location["distance"] = {
                    metres: metres, 
                    nearby: metres <= 100 ? true : false
                };
                return location;
            }).sort((previousLocation, thisLocation) => {
                return previousLocation.distance.metres - thisLocation.distance.metres;
            });
            return nearestLocations.shift();
        }
        //Track the user's real time location and update the nearby location/music along the way
        if(mapState.locationPermission) {
            Location.watchPositionAsync(
                {
                accuracy: Location.Accuracy.High,
                distanceInterval: 10 // in meters
                },
                location => {
                const userLocation = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }
                const nearbyLocation = calculateDistance(userLocation);
                if (nearbyLocation?.distance?.nearby == true) {
                    setMusicNearby(true)
                    setLocationNearby(nearbyLocation)
                } else {
                    setMusicNearby(false)
                    setLocationNearby(null)
                }
                setMapState({
                    ...mapState,
                    userLocation,
                    nearbyLocation: nearbyLocation
                });
                }
            ).then((unsub) => {
                listener.current = unsub
            }
            )
            return () => {
                listener.current?.remove()
            };
        }
    }, [mapState.locationPermission]);
    return (
        <>
            <MapView 
                camera={{
                    center: mapState.userLocation,
                    pitch: 0, // Angle of 3D map
                    heading: 0, // Compass direction
                    altitude: 3000, // Zoom level for iOS
                    zoom: 15 // Zoom level For Android
                }}
                showsUserLocation={mapState.locationPermission}
                style={{flex: 1}}
                provider={PROVIDER_GOOGLE}
                customMapStyle={colorScheme == "dark" ? customMapStyle : ""}
            >
                {mapState.locations.map(location => (
                <Circle
                    key={location.id}
                    center={location.coordinates}
                    radius={100}
                    strokeWidth={3}
                    strokeColor="#A42DE8"
                    fillColor={colorScheme == "dark" ? "rgba(128,0,128,0.5)" : "rgba(210,169,210,0.5)"}
                />
                ))}
            </MapView>
        </>
    );
}

export default Map;