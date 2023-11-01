import React, { useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SongTabs from "../components/songTabs";
import TrackPage from "../components/trackPage";
const Stack = createStackNavigator()
function MusicNearby( { musicNearby, locationNearby, text, photoState } ) {
    const [songs, setSongs] = useState([])
    function fetchSongsFromNearby() {
        const id = locationNearby.id
        const url = `https://comp2140.uqcloud.net/api/sampletolocation/?api_key=SREr2lsVOu&location_id=${id}`
        async function fetchAllData() {
            const response = await fetch(url)
            const data = await response.json()
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
    useEffect(() => {
        if (locationNearby != null) {
            fetchSongsFromNearby()
        } else {
            setSongs([])
        }
    }, [locationNearby])
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