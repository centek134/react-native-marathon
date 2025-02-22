import { View, Text, StyleSheet} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import apartments from "../../../assets/data/project-5/apartments.json";
import React, { useState } from "react";
import { CustomMarker } from "../../../src/components/project-5/CustomMarker";
import { ApartmentListItem } from "@/src/components/project-5/ApartmentListLitem";
import { Stack } from "expo-router";


export type Apartment = {
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

export default function airbnb() {
  const [ selectedApartment, setSelectedApartment ] = useState<Apartment | null>(null);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerShown: false}} />
      <MapView style={styles.map} provider={PROVIDER_GOOGLE}>
        {apartments.map( apartment => (
          <CustomMarker key={apartment.id} onPress={() => setSelectedApartment(apartment)} apartment={apartment} />
        ))}
      </MapView>
      { selectedApartment && <ApartmentListItem apartment={selectedApartment}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  }
});
