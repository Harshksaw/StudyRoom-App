import React, { useEffect, useState } from 'react'; // Ensure React is imported for JSX transformation
import {
  PermissionsAndroid,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Dimensions } from "react-native";
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { useDispatch, useSelector } from "react-redux";
import { set } from 'react-native-reanimated';

const { width, height } = Dimensions.get("window");

const Header= ({ color ,handleLocationChange }:any) => {
  const dispatch = useDispatch(); 
  const [selectedLocation, setSelectedLocation] = useState();
  const [Enable, setEnable] = useState(true);

  const citiesData = useSelector((state) => state.app); // Moved useSelector inside the component
  // console.log("🚀 ~ Header ~ citiesData:", citiesData)

  // useState for cities is initialized with an empty array
  const [cities, setCities] = useState(citiesData.locations || []);
  console.log(selectedLocation)

  

  // useEffect to update cities when citiesData changes
  useEffect(() => {
    setCities(citiesData.locations || []);

  }, [citiesData.locations]);

  useEffect(() => {
    if (selectedLocation) {
      // Call fetchLibrary or dispatch an action to fetch library data
      console.log(`Fetching library for location: ${selectedLocation}`);
      // Example: dispatch(fetchLibrary(selectedLocation));
    }
  }, [selectedLocation, dispatch]);

  const [assets, error] = useAssets([
    require("../assets/icons/headerlogo.svg"),
    require("../assets/icons/Headerwhite.png"),
    require("../assets/icons/Ekaant.svg"),
    require("../assets/icons/Headerloc.svg"),
  ]);

  return (
    <View style={styles.header}>
      <View style={styles.citySelector}>
        <View style={styles.label}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              lineHeight: 24,
              textAlign: "center",
              color: color,
            }}
          >
            Location
          </Text>

          <Ionicons name="chevron-down-outline" size={20} color={color} />
        </View>

        <View style={styles.picker}>
          {color === "white" ? (
            <Ionicons name="location-outline" size={20} color={color} />
          ) : (
            assets &&
            assets[3] && (
              <Image
                source={assets[3]}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            )
          )}

          <Picker
            selectedValue={selectedLocation}
            style={{
              height: 20,
              width: 180,
              borderRadius: 150,
              color: color,
              borderBlockColor: color,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            mode={"dropdown"}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedLocation(itemValue);
              handleLocationChange(itemValue);
              setEnable(false); // Consider updating this logic as needed
            }}
          >
            {cities.map((city, index) => (
              <Picker.Item
                key={index}
                label={`${city.location}, IN`}
                value={city.location}
                style={{
                  color: "#000000",
                  lineHeight: 25,
                  fontSize: 15,
                  fontStyle: "normal",
                  fontWeight: "500",
                  textAlign: "center",
                  borderRadius: 20,
                }}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.logoContainer}>
        {color === "white" && (
          <View>
            {assets && assets[1] && (
              <Image
                source={assets[1]}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: color,
                }}
              />
            )}

            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
                color: color,
              }}
            >
              EKAANT
            </Text>
          </View>
        )}

        {color === "black" && assets && assets[0] && (
          <Image
            source={assets[0]}
            style={{
              width: 50,
              height: 50,
              tintColor: color,
            }}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: height * 0.085,
    width: "100%",

    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "pink",
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: "50%",
    height: "100%",
  },
  citySelector: {
    flex: 1,
    marginLeft: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: 5,
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 3,
    height: 30,
    paddingHorizontal: 5,

    // backgroundColor: "red",

    borderRadius: 40,
  },
  selectedCity: {
    flex: 1,
    alignItems: "center",
  },
  selectedCityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1, // Make content take full screen height
  },
  locationContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0", // Light background
    padding: 10,
    margin: 10,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationData: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
  },
});

export default Header;
