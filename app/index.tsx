import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import DayListItem from "../src/components/core/DayListItem";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const days = [...Array(24)].map( (val, index) => index + 1);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.content}
        numColumns={2}
        columnWrapperStyle={{gap: 10}}
        data={days}
        renderItem={({ item }) => (
            <DayListItem day={item} />
          )}
        keyExtractor={(item) => item.toString()}
      />
      <StatusBar backgroundColor="#000" style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    gap: 10,
    padding: 10,
  },
  columns:{
    gap: 10,
  }
});
