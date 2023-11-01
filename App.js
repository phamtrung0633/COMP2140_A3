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
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const Tab = createBottomTabNavigator();
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
  const [musicNearby, setMusicNearby] = useState(false)
  const [locationNearby, setLocationNearby] = useState(null)
  const [photoState, setPhotoState] = useState({});
  const [text, onChangeText] = useState();
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


