import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Game from "@/components/Game";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Game />
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
};
export default App;
