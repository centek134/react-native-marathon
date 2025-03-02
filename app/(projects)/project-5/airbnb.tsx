import { View, Text, StyleSheet, FlatList} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import apartments from "../../../assets/data/project-5/apartments.json";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { CustomMarker } from "../../../src/components/project-5/CustomMarker";
import { ApartmentListItem } from "@/src/components/project-5/ApartmentListLitem";
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Stack } from "expo-router";
import BottomSheet, { BottomSheetView, BottomSheetFlatList, BottomSheetScrollView } from "@gorhom/bottom-sheet";


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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [50, "50%", "90%"], []);
  const [ selectedApartment, setSelectedApartment ] = useState<Apartment | null>(null);
  const [ region, setMapRegion ] = useState({latitude:50.0646501 , longitude:19.9449799, latitudeDelta: 0.09,longitudeDelta: 0.04 })

  const setMapView = (latitude : number, longitude: number) => {
    setMapRegion({latitude: latitude, longitude: longitude, latitudeDelta:0.09, longitudeDelta: 0.04});
    bottomSheetRef.current?.collapse();
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerShown: false}} />
      <MapView initialRegion={region} region={region} style={styles.map} provider={PROVIDER_GOOGLE}>
        {apartments.map( apartment => (
          <CustomMarker key={apartment.id} onPress={() => setSelectedApartment(apartment)} apartment={apartment} />
        ))}
      </MapView>
      { selectedApartment && (
          <ApartmentListItem apartment={selectedApartment} containerStyle={{ position: "absolute", bottom: 80, right: 10, left: 10,}}/>
      )}
      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <BottomSheetScrollView style={{padding: 5}}>
          <Text style={styles.listTitle}>Over {apartments.length} Places</Text>
          {apartments.map((apartment: Apartment) => <ApartmentListItem key={apartment.id} apartment={apartment} containerStyle={{marginVertical: 10}} setRegion={() => {setMapView(apartment.latitude, apartment.longitude)}}/>)}
        </BottomSheetScrollView>
      </BottomSheet>
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
  },
  listTitle: {
    textAlign: "center",
    fontFamily: "InterBold",
    fontSize: 16,
    marginBottom: 20
  }
});
