import { Stack, SplashScreen } from "expo-router";
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { AmaticSC_400Regular, AmaticSC_700Bold} from "@expo-google-fonts/amatic-sc";
import { useEffect } from "react";
import { GestureHandlerRootView} from "react-native-gesture-handler";

export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts({
      Inter: Inter_400Regular,
      InterBold: Inter_700Bold,
      InterSemi: Inter_600SemiBold,
      Amatic: AmaticSC_400Regular,
      AmaticBold: AmaticSC_700Bold,
    });
  
    useEffect(() => {
      if(fontsLoaded || fontError){
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded, fontError])
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Stack
        screenOptions={{headerTitleAlign: "center", headerStyle: {backgroundColor: "#fff"} }}
        >
        <Stack.Screen name="index" options={{ title: "Dev-Marathon"}}/>
      </Stack>
    </GestureHandlerRootView>
  );
}
