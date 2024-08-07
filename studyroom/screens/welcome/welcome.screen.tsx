import React from "react";
import { Link, Stack, router, useNavigation } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useEffect } from "react";

import { useAssets } from "expo-asset";
import Button from "@/components/Button";
import { Image, ImageBackground } from "expo-image";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [assets] = useAssets([
    require("../../assets/images/EKAANT.png"),
    require("../../assets/images/EkaantWelcom.png"),
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.text}>
          Study Anywhere & Anytime{" "}
          <Text style={{ fontWeight: "bold", color: "#0077B6" }}>
            Book Your Seat
          </Text>{" "}
          Now
        </Text>

        <View
          style={{
            flexDirection: "column",
            gap: 5,
            marginVertical: 0,
          }}
        >
          <ImageBackground
            source={{
              uri: "https://res.cloudinary.com/dbnnlqq5v/image/upload/v1722597055/assets/zkh6zr51x1fmgrwai59i.png",
            }}
            style={{
              width: 360,
              height: 320,
            }}
          />
          <ImageBackground
            source={{
              uri: "https://res.cloudinary.com/dbnnlqq5v/image/upload/v1722597083/assets/cwdjhddyzahxbbp0vaqf.png",
            }}
            style={{
              width: "auto",
              height: 60,
              // width: 320,
              // height: 5 0,
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.text2}>
            Reserve library spaces across India with ease
          </Text>
        </View>
      </View>

      <View style={styles.view2}>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={() => router.push("/(routes)/signup")}>
            <Button width={250} text="Get Started" />
          </TouchableOpacity>
          {/* <linearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.buttonBox}> */}
        </View>
        {/* </linearGradient> */}
        <Text style={styles.orText}>Or</Text>

        <View style={{}}>
          <Link href={{ pathname: "login" }}>
            <Text
              style={{
                color: "#0077B6",
                fontSize: 25,
                lineHeight: 30,
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view1: {
    height: "80%",
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "space-around",

    alignItems: "center",
  },
  view2: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
  },
  text: {
    color: "#000000",

    fontSize: 26,
    fontWeight: "700",

    lineHeight: 39,
    textAlign: "center",
  },
  text2: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonBox: {
    width: "80%",
    height: 50,

    // backgroundColor: "#007AFF",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 20,
    // paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  orText: {
    color: "#8E8E93",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },
});
