// Light and Dark colour schemes
import { Dimensions } from "react-native";
export const colors = {
	purpleColorLighter: "#A42DE8",
	blueColorLighter: "#318AFF",
	blueColorDarker: "#2D3DE8",
	blackColorTranslucentLess: "rgba(0,0,0,0.35)",
	blackColorTranslucentMore: "rgba(0,0,0,0.7)",
    whiteColor: "#ffffff",
    whiteColorTranslucent: "rgba(255,255,255, 0.5)",
	"light" : {
		bgColor: "#ffffff",
		fgColor: "#800080",
		fgColorLighter: "rgba(128,0,128,0.5)",
		headerTextColor: "#ffffff"
	},
	"dark" : {
		bgColor: "#422142",
		fgColor: "#f0c4f0",
		fgColorLighter: "rgba(210,169,210,0.5)",
		headerTextColor: "#f0c4f0",
	}
};
const { width, height } = Dimensions.get("window");
const mode = "light"
export const customMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ];
export const styles = {
    nearbyAndPlayContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: colors[mode].bgColor
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors["light"].fgColor,
        paddingBottom: 0
    },
    headingDark: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors["dark"].fgColor,
        paddingBottom: 0
    },
    subHeading: {
        fontSize: 14,
        color: colors["light"].fgColor,
        paddingBottom: 25
    },
    subHeadingDark: {
        fontSize: 14,
        color: colors["dark"].fgColor,
        paddingBottom: 25
    },
    songName: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors["light"].fgColor,
        paddingBottom: 0,
        marginBottom: 12
    },
    songNameDark: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors["dark"].fgColor,
        paddingBottom: 0,
        marginBottom: 12
    },
    location: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center", 
    },
    locationHeading: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors["light"].fgColor,
        paddingBottom: 6
    },
    locationHeadingDark: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors["dark"].fgColor,
        paddingBottom: 6
    },
    playButton: {
        backgroundColor: colors["light"].fgColor,
        color: colors["light"].bgColor,
        fontWeight: "bold",
        padding: 13,
        borderRadius: 10,
        alignItems: "center",
    },
    playButtonDark: {
        backgroundColor: colors["dark"].fgColor,
        color: colors["dark"].bgColor,
        fontWeight: "bold",
        padding: 13,
        borderRadius: 10,
        alignItems: "center",
    },
    locationIcon: {
        width: 35,
        height: 105,
    },
    currentLocation: {
        marginBottom: 10
    }, 
    ratingComponent: {
        paddingTop: 15,
    },
    profileContainer: {
        padding: 20,
        backgroundColor: colors[mode].bgColor,
        flex: 1
    },
    input: {
        marginTop: height / 40,
        backgroundColor: colors["light"].fgColorLighter,
        color: colors["light"].fgColor,
        borderRadius: 5,
        textAlign: "center",
        height: 40
    },
    inputDark: {
        marginTop: height / 40,
        backgroundColor: colors["dark"].fgColorLighter,
        color: colors["dark"].fgColor,
        borderRadius: 5,
        textAlign: "center",
        height: 40
    },
    photoEmptyView: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors[mode].fgColorLighter,
        borderStyle: "dashed",
        height: height / 1.8
    },
    photoFullImage: {
        width: "100%",
        borderRadius: 10,
        height: height / 1.8
    },
    addPhoto: {
        backgroundColor: colors["light"].fgColor,
        color: colors["light"].bgColor,
        fontWeight: "bold",
        padding: 5,
        borderRadius: 10,
        textAlign: "center",
        width: "50%",
        marginLeft: "25%",
        marginTop: height / 60,
        alignItems: "center"
    },
    addPhotoDark: {
        backgroundColor: colors["dark"].fgColor,
        color: colors["dark"].bgColor,
        fontWeight: "bold",
        padding: 5,
        borderRadius: 10,
        textAlign: "center",
        width: "50%",
        marginLeft: "25%",
        marginTop: height / 60,
        alignItems: "center"
    },
    changePhoto: {
        backgroundColor: colors[mode].fgColor,
        color: colors[mode].bgColor,
        fontWeight: "bold",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        width: "50%",
        marginLeft: "25%",
        marginTop: -(height / 12)
    }
}


