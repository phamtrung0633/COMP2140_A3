import React, { useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SongTabs from "../components/songTabs";
import TrackPage from "../components/trackPage";
//The stack navigator
const Stack = createStackNavigator()
/**
 * The music nearby screen component, 
 *
 * @param musicNearby - The music nearby state which is a boolean 
 * @param locationNearby - The location nears the user most
 * @param text - The user's profile name
 * @param photoState - The user's profile photo
 * @returns "MusicNearby" screen component
 */
function MusicNearby( { musicNearby, locationNearby, text, photoState } ) {
    //The state used to store all the songs from this location if there's any
    const [songs, setSongs] = useState([])
    //The function used to fetch song ids from the nearby location
    function fetchSongsFromNearby() {
        const id = locationNearby.id
        const url = `https://comp2140.uqcloud.net/api/sampletolocation/?api_key=SREr2lsVOu&location_id=${id}`
        async function fetchAllData() {
            const response = await fetch(url)
            const data = await response.json()
            //Enrich the songs data from this location by getting their relative recording date, etc
            const results = await Promise.all(
                data.map(async (element) => {
                    const url2 = `https://comp2140.uqcloud.net/api/sample/${element.sample_id}/?api_key=SREr2lsVOu`
                    const response2 = await fetch(url2)
                    const data2 = await response2.json()
                    return {
                        sample_id: element.sample_id,
                        datetime: element.datetime,
                        ...data2
                    }
                })
            )
            return {
                data: results
            }
        } 
        fetchAllData().then((results) => {
            setSongs(results)
        })
    }

    //The hook used to fetch songs from the nearby location when its changed
    useEffect(() => {
        if (locationNearby != null) {
            fetchSongsFromNearby()
        } else {
            setSongs([])
        }
    }, [locationNearby])
    //The stack navigator render the Song Tabs component which is a list of songs for this location
    //and the Track Page component which is the specialized page for a specific song whose id contained in
    //the parameters passed through the route
    return (
            <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={"SongTabs"}
                >
                    <Stack.Screen
                        name="SongTabs"
                        children={props => <SongTabs {...props} songss={songs} locationName={locationNearby?.name} musicNearby={musicNearby} />}
                    />
                    <Stack.Screen
                        name="TrackPage"
                        children={props => <TrackPage {...props} text={text} photoState={photoState}/>}
                    />
            </Stack.Navigator>
    );
}

export default MusicNearby;