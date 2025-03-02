import { View, Text, StyleSheet, Image, ViewStyle, Pressable } from "react-native";
import React from "react";
import { Apartment } from "@/app/(projects)/project-5/airbnb";

type ApartmentListItem = {
  apartment: {
      id: number,
      title: string,
      description: string,
      price: number,
      latitude: number,
      longitude: number,
      rating: number,
      stars: number,
      image: string,
  },
  containerStyle?: ViewStyle,
  setRegion?: () => void
}

export const ApartmentListItem = ({apartment, containerStyle, setRegion}: ApartmentListItem) => {
  return ( 
    <Pressable onTouchEndCapture={setRegion}>
      <View style={[styles.card, containerStyle]}>
        <Image style={styles.image} source={{uri: apartment.image}} />
        <View style={styles.rightContainer}>
          <View>
            <Text style={styles.title}>{apartment.title}</Text>
            <Text style={styles.description}>{apartment.description}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.price}>$ {apartment.price}</Text>
            <Text style={styles.price}>★ {apartment.rating} ({apartment.stars})</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 20,
    overflow: "hidden"
  },
  image: {
    width: 150,
    aspectRatio: 1
  },
  rightContainer: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between"
  },
  title: {
    fontFamily: "InterBold",
    color: "#000"
  },
  description: {
    fontFamily: "Inter",
    fontSize: 12,
    color: "#bababa"
  },
  footer:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  price: {
    fontFamily: "Inter"
  }
})