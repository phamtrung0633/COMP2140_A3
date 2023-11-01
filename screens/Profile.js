import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Image, Text, Button, Appearance, TouchableOpacity, TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { styles } from "../styles.js";

import { colors } from '../styles';
// Get the screen width and height for styling

const colorScheme = Appearance.getColorScheme()
function Profile( {photoState, setPhotoState, text, onChangeText} ) {
    // Function to handle photo selection using the Image Picker
    async function handleChangePress() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // If the user didn't cancel and an image is selected, update the state
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setPhotoState(result.assets[0]);
        }
    }
    // Check if a photo has been selected
    const hasPhoto = Boolean(photoState.uri);
    // Component to display the selected photo or a placeholder
    function Photo(props) {
        if (hasPhoto) {
            return (
                <View>
                    <Image
                        style={styles.photoFullImage}
                        resizeMode="cover"
                        source={{ uri: photoState.uri }}
                    />
                </View>
            );
        } else {
            return <View style={colorScheme == "dark" ? styles.photoEmptyViewDark : styles.photoEmptyView} />;
        }
    }

    // Main render of the App component
    return (
        <SafeAreaView style={{backgroundColor: colorScheme == "dark" ? "#800080" : colors.whiteColorTranslucent}}>
            <View style={{padding: 20}}>
                <Text style={colorScheme == "dark" ? styles.headingDark : styles.heading}>
                    Edit Profile
                </Text>
                <Text style={colorScheme == "dark" ? styles.subHeadingDark : styles.subHeading}>
                    Mirror, Mirror On The Wall..
                </Text>
                <Photo />
                <TouchableOpacity style = {colorScheme == "dark" ? styles.addPhotoDark : styles.addPhoto} onPress={handleChangePress}>
                    <Text style={{color: colorScheme == "dark" ? "#A42DE8" : colors.whiteColor, padding: 7, fontWeight: "bold"}}>
                        {hasPhoto ? "Change Photo" : "Add Photo"}
                    </Text>
                </TouchableOpacity>
                <TextInput defaultValue="Enter Your Name" onChangeText={onChangeText} value={text} style={colorScheme == "dark" ? styles.inputDark : styles.input}/>
            </View>
        </SafeAreaView>
    );
}

export default Profile;