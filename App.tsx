import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";
import RootStack from "./src/navigation/RootStack";
import { useFonts } from "expo-font";
import {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";

const client = new QueryClient();

export default function App() {
    const [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_300Light,
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
        Roboto_900Black,
    });

    return (
        <>
            <QueryClientProvider client={client}>
                {!fontsLoaded ? <AppLoading/> : <RootStack/>}
                <StatusBar style="auto"/>
            </QueryClientProvider>
        </>
    );
}

