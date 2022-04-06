import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";
import RootStack from "./src/navigation/RootStack";

const client = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <RootStack />
        <StatusBar style="auto" />
      </QueryClientProvider>
    </>
  );
}

