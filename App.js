import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { View, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from './styles';
import icons from './data/icons';
import Map from './screens/Map';
import Profile from './screens/Profile';
import MusicNearby from './screens/MusicNearby'
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


/**
 * The Tab Icon component for Bottom tab navigation except Music Nearby
 *
 * @param focused - Whether the tab is currently focused
 * @param icon - The icon for this tab
 * @param heightIcon - The height of the icon
 * @param widthIcon - The width of the icon for this tab
 * @returns "TabIcon" component
 */
function TabIcon({ focused, icon, heightIcon, widthIcon }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        heigh: 40,
        width: 50,
      }}
    >
      <Image
        source={icon}
        resizeMode='contain'
        style={{
          width: widthIcon,
          height: heightIcon,
          tintColor: focused ? colors.whiteColor : colors.whiteColorTranslucent
        }}
      />
    </View>
  );
}

/**
 * The Tab Icon component for Music Nearby page
 *
 * @param focused - Whether the tab is currently focused
 * @param musicNearby - Whether there's a location that might contain music nearby
 * @returns "MusicTabIcon" component
 */
function MusicTabIcon( { focused, musicNearby } ) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        heigh: 70,
        width: 150,
      }}
    >
      <Text style={[{
          lineHeight: 23,
          fontWeight: "bold",
          fontSize: 22,
      }, {marginBottom: musicNearby ? 10 : 0}, {color: focused ? colors.whiteColor : colors.whiteColorTranslucent}]}>
        SongTrax
      </Text>
      {musicNearby && 
        <Text style={[{
          lineHeight: 12,
          fontWeight: "bold",
          fontSize: 12,
        }, {color: focused ? colors.whiteColor : colors.whiteColorTranslucent}]}>
          There's music nearby
        </Text>
      }
    </View>
  );
}

// This is the bottom tab navigator
const Tab = createBottomTabNavigator();

// This function returns the options for the bottom tabs
function tabOptions(icon, heightIcon=30, widthIcon=30) {
  return {
    tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icon} heightIcon={heightIcon} widthIcon={widthIcon}  />,
    tabBarStyle: {
      height: 90,
      backgroundColor: colors.purpleColorLighter
    },
    headerShown: false,
    tabBarShowLabel: false
  };
}
export default function App() {
  // The state determining if there's a location with potential music nearby
  const [musicNearby, setMusicNearby] = useState(false)
  // The state storing the location nearby
  const [locationNearby, setLocationNearby] = useState(null)
  // The state storing the profile photo of the user
  const [photoState, setPhotoState] = useState({});
  // The state storing the profile name of the user
  const [text, onChangeText] = useState();

  //This return the tab navigator for three pages - Map, Music Nearby, Profile
  return ( 
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
      <Tab.Navigator>
          <Tab.Screen 
            name="Map"
            children={() => <Map setMusicNearby={setMusicNearby} setLocationNearby={setLocationNearby} />}
            options={() => tabOptions(icons.tabMapWhite, 40)}
          />
          <Tab.Screen
            name="MusicNearby"
            children={() => <MusicNearby musicNearby={musicNearby} locationNearby={locationNearby} text={text} photoState={photoState} />}
            options={{
              tabBarIcon: ({ focused }) => <MusicTabIcon focused={focused} musicNearby={musicNearby} />,
              tabBarStyle: {
                height: 90,
                backgroundColor: colors.purpleColorLighter
              },
              headerShown: false,
              tabBarShowLabel: false
            }}
          />
        <Tab.Screen
          name="Profile"
          children={() => <Profile photoState={photoState} setPhotoState={setPhotoState} text={text} onChangeText={onChangeText}/>}
          options={() => tabOptions(icons.tabProfileWhite)}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
    
    
  );
}


