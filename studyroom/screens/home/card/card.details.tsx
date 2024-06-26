import Avatar from "@/components/AvatarComponent";
import Header from "@/components/Header";
import StarRating from "@/components/Ratinstar";

import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
} from "react-native";

import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import Button from "@/components/Button";
import getLocationName from "@/utils/location";

interface CardDetailScreenProps {
  // Define your params here
}

const CardDetailScreen: React.FC<CardDetailScreenProps> = ({}) => {
  const width = Dimensions.get("window").width;

  const params = useRoute();
  const data = JSON.parse(params.params.item);


  const [city, setCity] = useState("Delhi");  

  const seat = data.seatLayout;


  const locationData = async () => {
    const res = await getLocationName(data.location[0], data.location[1])
    setCity(res)


  }
  locationData();





  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

    const librarybooking = () => {

      router.push({
        pathname: "/(routes)/library/library.booking",
        params: { item: JSON.stringify(seat) },
      })

      // params: { params.item.seatLayout },
    // });

    }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ flex: 1 }}>
        <Carousel
          loop
          width={width}
          height={width / 1.2} // Adjusted height for better aspect ratio
          autoPlay={true}
          data={data.images}
          scrollAnimationDuration={80000}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.image} />
            </View>
          )}
        />
      </View>

      <ScrollView
        style={{
          flex: 1,

          marginHorizontal: 0,
          flexDirection: "column",
          ...(Platform.OS ==="ios" ? {marginTop: -200} : {marginTop: -100,})
          
        }}
      >
        <View style={styles.cardDetails}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              gap: 10,
            }}
          >
            <Text style={styles.heading}>{data?.name}</Text>
            <Text
              style={{
                fontSize: 15,
                color: "blue",
                fontWeight: "500",
                fontStyle: "italic",
              }}
            >
              {" "}
              ₹{data?.price}/month
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              // justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              gap: 10,
            }}
          >
            <Ionicons name="location" size={24} />
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontWeight: "semi-bold",
              }}
            >
             {city}
            </Text>
          </View>

          <Text style={styles.amenities}>About</Text>
          <Text
            style={{
              fontSize: 15,

              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
              minHeight: 100,
            }}
            numberOfLines={7}
          >
            {data?.description}
          </Text>

          <View>
            <Text>Amenities</Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                margin: 10,
                // justifyContent: "space-between",
              }}
            >
              {data.amenities.map((amenity: string, index: any) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    borderColor: "black",
                    borderWidth: 1,
                    borderRadius: 20,
                    padding: 7,
                    alignSelf: "flex-start",
                  }}
                >
                  {/* Your text here */}
                  <Text>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                // onPress={() => Linking.openURL('mailto:example@example.com')}
                >
                  <Text style={{ color: "blue" }}>
                    Email: example@example.com
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                // onPress={() => Linking.openURL('tel:+1234567890')}
                >
                  <Text style={{ color: "blue" }}>Phone: +1234567890</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleModal}>
                  <Ionicons name="close" size={30} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              // gap: 10,
              marginRight: 10,
              borderRadius: 20,
            }}
          >

              <TouchableOpacity
                onPress={() => librarybooking()}
              >
                    <View>
                <Button text="BookNow" width={300} />
              </View>

                {/* pathname: "/(routes)/library/library.booking", */}
              </TouchableOpacity>

          

          </View>

          {/* //ratings */}

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                margin: 20,
                fontFamily: "Roboto",
                fontSize: 20,
                fontStyle: "normal",
                fontWeight: "700",

                textAlign: "center",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Reviews
            </Text>

            <View
              style={{
                marginHorizontal: "auto",
                flexWrap: "wrap",
                backgroundColor: "lightgray",

                borderRadius: 20,
                flexDirection: "row",
                padding: 20,
                justifyContent: "space-between",
                alignSelf: "flex-start",
                gap: 10,
              }}
            >
              {/* <Text>4.5</Text> */}
              <StarRating rating={4.5} />
              <Text>10 Reviews</Text>
            </View>

            {/* ///review by user */}

            <View>
              <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10 }}>
                User Reviews
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  flexWrap: "wrap",
                  gap: 10,
                  // margin: 10,
                  // justifyContent: "space-between",
                }}
              >
                {[1, 1, 1].map((item) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      // margin: 20,
                      padding: 10,
                      paddingHorizontal: 20,
                      borderRadius: 20,
                      backgroundColor: "lightgray",

                      alignSelf: "flex-start",
                      gap: 10,
                    }}
                  >
                    <Avatar name="Arsh" />
                    <View
                      style={{
                        flexDirection: "column",

                        marginTop: 10,

                        borderRadius: 20,
                        padding: 7,
                        alignSelf: "flex-start",
                      }}
                    >
                      <Text>Name</Text>
                      <Text>Review revis iss dd</Text>
                    </View>

                    <StarRating rating={3} />
                  </View>
                ))}
                {/* {data.map((review: any, index: any) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      marginTop: 10,
                      borderColor: "black",
                      borderWidth: 1,
                      borderRadius: 20,
                      padding: 7,
                      alignSelf: "flex-start",
                    }}
                  >

                    <Text>{review.rating}</Text>

                    <StarRating rating={review.rating} />
                  </View>
                ))} */}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,

    flexDirection: "column", // Arrange children in columns
    // justifyContent: "space-between", // Arrange children in columns
    // alignItems: "center", // Arrange children in columns
  },
  imageContainer: {
    // flex: 1,

    borderRadius: 20,
    marginRight: 30,
    backgroundColor: "blue",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 250,
    marginTop: -10,
    borderRadius: 20,
  },
  cardDetails: {
    flexDirection: "column", // Arrange children in columns
    gap: 10, // Add gap between children
    // height: 400, // Adjust height for better spacing
    // marginBottom: 120, // Add margin for better spacing
    padding: 10, // Add padding for better spacing
  },
  heading: {
    fontSize: 25,
    fontWeight: "500",
  },

  amenities: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // This will give a semi-transparent background
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    gap: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CardDetailScreen;
