import { Stack, SplashScreen } from "expo-router";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { AmaticSC_400Regular, AmaticSC_700Bold} from "@expo-google-fonts/amatic-sc";
import { useEffect } from "react";

export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts({
      Inter: Inter_900Black,
      Amatic: AmaticSC_400Regular,
      AmaticBold: AmaticSC_700Bold,
    });
  
    useEffect(() => {
      if(fontsLoaded || fontError){
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded, fontError])
  return (
    <Stack
      screenOptions={{headerTitleAlign: "center", headerStyle: {backgroundColor: "#fff"} }}
    >
      <Stack.Screen name="index" options={{ title: "Dev-Marathon"}}/>
    </Stack>
  );
}
