import { View, Text, StyleSheet, Image } from "react-native";
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
  }
}

export const ApartmentListItem = ({apartment}: ApartmentListItem) => {
  return (
    <View style={styles.card}>
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
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 50,
    left: 10,
    right: 10,
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
    fontFamily: "InterBold"
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