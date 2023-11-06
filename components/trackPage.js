import React from "react";
import { SafeAreaView, View, Text, Image, Button, TouchableOpacity, Dimensions, Appearance } from "react-native";
import { styles } from "../styles.js"
import { colors } from '../styles';
import images from "../data/images.js"
import { useRef, useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import icons from '../data/icons';
//The color scheme of this mobile phone
const colorScheme = Appearance.getColorScheme()
//The dimensions of this mobile phone
const { width, height } = Dimensions.get("window");
/**
 * The Track Page component for any specific song track
 *
 * @param route - Storing the parameters passed when this route is navigated to
 * @param navigation - Used to navigate to different screens
 * @param text - The user profile's name
 * @param photoState - The user's profile photo
 * @returns "TrackPage" component
 */
function TrackPage( {navigation, route, text, photoState} ) {
    //The parameters passed from the route - location of this song, id/name of this song, 
    //recording data of this song, instrument that the song is played in
    const { locationName, id, name, data, instrument } = route.params
    //The state storing the rating of this song
    const [rating, setRating] = useState(0)
    //The rating array used to display 5 stars for rating
    const ratingArray = [1, 2, 3, 4, 5]
    //The state storing whether the web view used to play the song is loaded 
    const [ webViewState, setWebViewState ] = useState({
        loaded: false,
        actioned: false,
    });
    //The useRef hook to keep reference of the web view
    const webViewRef = useRef();
    //Fetch the rating of this song
    useEffect(() => {
        const url = `https://comp2140.uqcloud.net/api/samplerating/?api_key=SREr2lsVOu&sample_id=${id}`
        async function get_rating() {
            const response = await fetch(url)
            const result = await response.json()
            if (result.length == 1) {
                setRating(result[0].rating)
            }
        }
        get_rating()
    }, [])
    //Function to set web view state when it is loaded
    function webViewLoaded() {
        setWebViewState({
            ...webViewState,
            loaded: true
        });
    }
    //Function used to inject JS into the web view to play the current song
    function handleActionPress() {
        if(!webViewState.actioned) {
            const instrumentType = instrument.toLowerCase()
            //The recording data of the song
            const modifiedData = JSON.parse(data)
            //This "map" operation is used because the format of the recording data that I stored from A2
            //is different from the format of recording data that the web view provided from the Contact
            //accept, therefore it is used to check if the recording data is from my previous A2, if yes,
            //reformat the data to the format accepted by the contact's play song webview, if not then do nothing
            const modifiedData2 = modifiedData.map((item) => {
                const keys = Object.keys(item)
                if (keys[0].length > 1) {
                    const newKey = keys[0].slice(0, 1)
                    const newValue = item[keys[0]].map((oldValue) => {
                        return oldValue.barEnabled
                    })
                    return {
                        [newKey]: newValue
                    }
                } else {
                    return item
                }
            })
            
            const playYourSong = `preparePreview(${JSON.stringify(modifiedData2)}, '${instrumentType}'); playPreview();`
            webViewRef.current.injectJavaScript(playYourSong);   
        }
        else {
            webViewRef.current.injectJavaScript("stopSong()");   
        }
        setWebViewState({
            ...webViewState,
            actioned: !webViewState.actioned
        });
    }
    //Function used to update the rating of the song in the API
    async function handleRating(ratingScore) {
        setRating(ratingScore)
        const url = `https://comp2140.uqcloud.net/api/samplerating/?api_key=SREr2lsVOu&sample_id=${id}`
        const response = await fetch(url)
        const result = await response.json()
        if (result.length != 1) {
            const url2 = "https://comp2140.uqcloud.net/api/samplerating/?api_key=SREr2lsVOu"
            const dataToPost = {
                "api_key": "SREr2lsVOu",
                "sample_id": id,
                "rating": Math.round(ratingScore) 
            }
            const response2  = await fetch(url2, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToPost)
            });
        } else {
            const idInstance = result[0].id
            const url2 = `https://comp2140.uqcloud.net/api/samplerating/${idInstance}/?api_key=SREr2lsVOu`
            const dataToPost = {
                "api_key": "SREr2lsVOu",
                "sample_id": id,
                "rating": Math.round(ratingScore) 
            }
            const response  = await fetch(url2, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToPost)
            });
        }
    }
    
    return (
        <SafeAreaView style={{backgroundColor: colorScheme == "dark" ? "#800080" : colors.whiteColorTranslucent}}>
            <View style={styles.location}>
                <Image style={styles.locationIcon} resizeMode="contain" tintColor={colorScheme == "dark" ? "" : colors.purpleColorLighter} source={colorScheme == "dark" ? images.IconLightpurple : images.IconDarkpurple} />
                <Text style={colorScheme == "dark" ? styles.locationHeadingDark : styles.locationHeading}>
                    {locationName}
                </Text>
            </View>
            <View style={{height: 0}}>
                    <WebView
                        ref={ref => webViewRef.current = ref}
                        originWhitelist={["*"]}
                        source={{
                            uri: "https://comp2140.uqcloud.net/static/samples/index.html"
                        }}
                        pullToRefreshEnabled={true}
                        onLoad={webViewLoaded}
                    />
            </View>
            <View style={{padding: 5}}>
                <Text style={colorScheme == "dark" ? styles.songNameDark : styles.songName}>
                    {name}
                </Text>
                {webViewState && 
                    <TouchableOpacity style={colorScheme == "dark" ? styles.playButtonDark : styles.playButton} onPress={handleActionPress}>
                        <Text style={{color: colorScheme == "dark" ? "#A42DE8" : colors.whiteColor, fontWeight: "bold"}}>{!webViewState.actioned ? "Play Song" : "Stop Playing"}</Text>
                    </TouchableOpacity>
                }
                <View style={{flexDirection: "row", justifyContent: "center", marginTop: 5}}>
                {ratingArray.map((ratingScore) => {
                    return (
                        <TouchableOpacity  key={ratingScore} style={{padding: 6}} onPress={() => handleRating(ratingScore)}>
                            <Image style={{height:50, width: 50 }} tintColor={rating >= ratingScore ? "#FFFF00" : ""} source={icons.ratingStar}/>
                        </TouchableOpacity>
                    )
                })}
                </View>
            </View>
            <View style={{padding: 5, marginTop: height / 3.5}}>
                <Text style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: colors[colorScheme].fgColor,
                    paddingBottom: 0}}
                >
                    Currently At This Location
                </Text>
                <View style={{flexDirection: "row", marginBottom: 7}}>
                    <Image
                        style={{width:75, height:75, borderRadius: 75, borderColor: colorScheme == "dark" ? "#f0c4f0" : colors.purpleColorLighter, borderWidth: 1}}
                        resizeMode="cover"
                        source={{ uri: photoState?.uri }}
                    />
                    <Text style={{fontSize: 14,
                                color: colors[colorScheme].fgColor,
                                paddingTop: 25,
                                paddingLeft: 10,
                                fontWeight: "bold"}}>
                        {text}
                    </Text>
                </View>     
                <View style={{flexDirection: "row"}}>
                    <Image
                        style={{width:75, height:75, borderRadius: 75, borderColor: colorScheme == "dark" ? "#f0c4f0" : colors.purpleColorLighter, borderWidth: 1}}
                        resizeMode="cover"
                        source={colorScheme == "dark" ? icons.smileyFaceDark : icons.smileyFace}
                    />
                    <Text style={{fontSize: 14,
                                color: colors[colorScheme].fgColor,
                                fontWeight: "bold",
                                paddingTop: 25,
                                paddingLeft: 10}}>
                        And Others...
                    </Text>
                </View>  
            </View>
            
        </SafeAreaView>
    );
}

export default TrackPage;