import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  useWindowDimensions,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { BallData } from "@/types";
import { GameContext } from "@/GameContext";
import { ballRadius, boardHeight } from "@/constants";

import Ball from "./Ball";

const Game = () => {
  const { width } = useWindowDimensions();

  const ball = useSharedValue<BallData>({
    x: width / 2,
    y: boardHeight - ballRadius,
    r: ballRadius,
    dx: -1,
    dy: -1,
  });

  return (
    <GameContext.Provider value={{ ball }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.board}>
          <Ball />
        </View>
      </SafeAreaView>
    </GameContext.Provider>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292929",
  },
  board: {
    backgroundColor: "#202020",
    height: boardHeight,
    marginVertical: "auto",
    overflow: "hidden",
  },
});
