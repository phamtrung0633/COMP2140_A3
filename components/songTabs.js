import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Image, Appearance } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../styles.js"
import { colors } from '../styles';
import images from "../data/images.js"
import icons from '../data/icons';
import { useIsFocused } from "@react-navigation/native";
const colorScheme = Appearance.getColorScheme()
function SongTab( { item, navigation, locationName, isFocused } ) {
    function traverseToSongPage(locationName, songId, name, recording_data, instrument) {
        navigation.navigate('TrackPage', {
            locationName: locationName,
            id: songId,
            name: name,
            data: recording_data,
            instrument: instrument
        });
    }
    const [rating, setRating] = useState(0)
    const ratingArray = [1, 2, 3, 4, 5]
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

function SongTabs( { navigation, route, songss, locationName, musicNearby } ) {
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