import React from "react";
import { SafeAreaView, View, Text, Image, Button, TouchableOpacity, Dimensions, Appearance } from "react-native";
import { styles } from "../styles.js"
import { colors } from '../styles';
import images from "../data/images.js"
import { useRef, useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import icons from '../data/icons';
const colorScheme = Appearance.getColorScheme()
const { width, height } = Dimensions.get("window");
function TrackPage( {navigation, route, text, photoState} ) {
    const { locationName, id, name, data, instrument } = route.params
    const [rating, setRating] = useState(0)
    const ratingArray = [1, 2, 3, 4, 5]
    const [ webViewState, setWebViewState ] = useState({
        loaded: false,
        actioned: false,
    });
    const webViewRef = useRef();
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

    function webViewLoaded() {
        setWebViewState({
            ...webViewState,
            loaded: true
        });
    }
    function handleActionPress() {
        if(!webViewState.actioned) {
            const instrumentType = instrument.toLowerCase()
            const modifiedData = JSON.parse(data)
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