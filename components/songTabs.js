import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Image, Appearance } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../styles.js"
import { colors } from '../styles';
import images from "../data/images.js"
import icons from '../data/icons';
import { useIsFocused } from "@react-navigation/native";

//The color scheme of the mobile phone
const colorScheme = Appearance.getColorScheme()

/**
 * The Song Tab component storing a single song's tab and can navigate to that song's page
 *
 * @param item - The song for the component
 * @param navigation - Used to navigate to different screens
 * @param locationName - The name of the location this song belongs to
 * @param isFocused - Whether the song tabs screen is being focused
 * @returns "SongTab" component
 */
function SongTab( { item, navigation, locationName, isFocused } ) {
    //This function is used to navigate to the "item" song's page
    function traverseToSongPage(locationName, songId, name, recording_data, instrument) {
        navigation.navigate('TrackPage', {
            locationName: locationName,
            id: songId,
            name: name,
            data: recording_data,
            instrument: instrument
        });
    }
    //This state stores the rating for this song
    const [rating, setRating] = useState(0)
    //Rating array is used to create 5 rating stars
    const ratingArray = [1, 2, 3, 4, 5]
    //Fetch the rating of this song whenever the component is rendered
    useEffect(() => {
        const url = `https://comp2140.uqcloud.net/api/samplerating/?api_key=SREr2lsVOu&sample_id=${item.id}`
        async function get_rating() {
            const response = await fetch(url)
            const result = await response.json()
            if (result.length == 1) {
                setRating(result[0].rating)
            }
        }
        get_rating()
        
    }, [])
    //Fetch the rating of this song whenever "isFocused" changes, this is used to updates the song's
    //rating in the case its rating has been changed within the "TrackPage", this way whenever the SongTabs
    //parent screen is navigated to, all ratings are updated again
    useEffect(() => {
        const url = `https://comp2140.uqcloud.net/api/samplerating/?api_key=SREr2lsVOu&sample_id=${item.id}`
        async function get_rating() {
            const response = await fetch(url)
            const result = await response.json()
            if (result.length == 1) {
                setRating(result[0].rating)
            }
        }
        get_rating()
    }, [isFocused])
    return (
        <View style={{flex: 1, paddingLeft: 6, paddingRight: 6}}>
            <TouchableOpacity onPress={() => traverseToSongPage(locationName, item?.id, item?.name, item?.recording_data, item?.type, rating, setRating)}>
                <Text style={{marginBottom: 5, color: colorScheme == "dark" ? colors.whiteColor : colors.blackColorTranslucentMore}}>
                    {item?.name}
                </Text>
                <Text style={{marginBottom: 5, color: colorScheme == "dark" ? colors.whiteColor : colors.blackColorTranslucentMore }}>
                    {item?.datetime.slice(0, 10).split("-").reverse().join("-")}
                </Text>
                <View style={{ justifyContent: "center", flexDirection: "row"}}>
                    {ratingArray.map((ratingScore) => {
                        return (
                            <View key={ratingScore} style={{padding: 6}} >
                                <Image style={{height:30, width: 30 }} tintColor={rating >= ratingScore ? "#FFFF00" : ""} source={icons.ratingStar}/>
                            </View>
                        )
                    })}
                </View>
                <View style={{
                    borderBottomWidth: 1,
                    marginBottom: 5,
                    borderBottomColor: colorScheme == "dark" ? colors.whiteColor : "#ccc"}}>
                </View>
                
            </TouchableOpacity>
        </View>
    )
}

/**
 * The Song Tabs component storing a tabs for all the songs belonging to a location
 *
 * @param navigation - Used to navigate to different screens
 * @param locationName - The name of the location this song belongs to
 * @param route - The route parameters 
 * @param songs - The songs for this component to render
 * @param musicNearby - The state determining whether there's a location nearby 100 meters that potentially can have songs 
 * @returns "SongTabs" component
 */
function SongTabs( { navigation, route, songss, locationName, musicNearby } ) {
    //This is used to determine if the screen is being focused or not, to update the songs' ratings
    const isFocused = useIsFocused()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme == "dark" ? "#800080" : colors.whiteColorTranslucent }}>
            {musicNearby &&
                <FlatList
                    data={songss.data}
                    keyExtractor={item => item?.id}
                    ListHeaderComponent={
                        <View style={styles.location}>
                            <Image style={styles.locationIcon} resizeMode="contain" tintColor={colorScheme == "dark" ? "" : colors.purpleColorLighter} source={colorScheme == "dark" ? images.IconLightpurple : images.IconDarkpurple} />
                            <Text style={colorScheme == "dark" ? styles.locationHeadingDark : styles.locationHeading}>
                                {locationName}
                            </Text>
                        </View>
                    }
                    renderItem={({item}) => (
                        <SongTab item={item} navigation={navigation} locationName={locationName} isFocused={isFocused} />
                    )}
                />
            }
            {!(musicNearby) && 
                <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: colors[colorScheme].fgColor,
                    paddingTop: 280,
                    paddingLeft: 30
                }}>
                    No music available... 
                </Text>
            }
            
        </SafeAreaView >
    );
}

export default SongTabs;