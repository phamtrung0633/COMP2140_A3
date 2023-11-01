import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Appearance } from "react-native";
import { useState, useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { getDistance } from "geolib";
import * as Location from 'expo-location';
import { customMapStyle } from "../styles.js";

function Map({ setMusicNearby, setLocationNearby }) {
    const colorScheme = Appearance.getColorScheme();
    const url = "https://comp2140.uqcloud.net/api/location/?api_key=SREr2lsVOu"
    const initialMapState = {
        locationPermission: false,
        locations: [],
        userLocation: {
            latitude: -27.5263381,
            longitude: 153.0954163,
        },
        nearbyLocation: {}
    };
    const [permission, askPermission] = Location.useForegroundPermissions()
    const [mapState, setMapState] = useState(initialMapState)
    useEffect(() => {
        askPermission();
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
    const listener = useRef(null)
    useEffect(() => {
        if (permission?.granted) {
            setMapState({
                ...mapState,
                locationPermission: true
            })
        }
      }, [permission]);
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