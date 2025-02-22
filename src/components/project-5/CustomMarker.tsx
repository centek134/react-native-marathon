import { View, Text, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import React from "react";

type CustomMarker = {
    apartment: {
        id: number,
        title: string,
        price: number,
        latitude: number,
        longitude: number,
        rating: number,
        stars: number,
        image: string,
    },
    onPress: () => void
}
export const CustomMarker = ({apartment, onPress}: CustomMarker) => {
  return (
    <Marker onPress={onPress} key={apartment.id} coordinate={{ latitude: apartment.latitude, longitude: apartment.longitude }}>
        <View style={styles.marker}>
            <Text style={styles.markerText}>${apartment.price}</Text>
        </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
    marker: {
      maxWidth: 150 ,
      backgroundColor: "white",
      padding: 5,
      borderRadius: 20,
      borderColor: "grey",
      borderWidth: 1,
    },
    markerText: {
      fontFamily: "Inter",
      fontSize: 10
    }
  })