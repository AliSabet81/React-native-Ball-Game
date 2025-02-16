import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { BallData, BlockData } from "@/types";
import { GameContext } from "@/GameContext";
import { ballRadius, boardHeight } from "@/constants";

import Ball from "./Ball";
import { generateBlocksRow } from "@/utils";
import Block from "./Block";

const Game = () => {
  const { width } = useWindowDimensions();

  const ball = useSharedValue<BallData>({
    x: width / 2,
    y: boardHeight - ballRadius,
    r: ballRadius,
    dx: -1,
    dy: -1,
  });

  const blocks = useSharedValue<BlockData[]>(
    Array(3)
      .fill(0)
      .flatMap((_, row) => generateBlocksRow(row + 1))
  );

  const isUserTurn = useSharedValue(true);

  const onEndTurn = () => {
    "worklet";
    if (isUserTurn.value) {
      return;
    }
    isUserTurn.value = true;
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (!isUserTurn.value) {
        return;
      }

      const x = e.translationX;
      const y = e.translationY;

      const mag = Math.sqrt(x * x + y * y);

      ball.value = {
        ...ball.value,
        dx: -x / mag,
        dy: -y / mag,
      };
    })
    .onEnd(() => {
      if (ball.value.dy < 0) {
        isUserTurn.value = false;
      }
    });

  const pathStyle = useAnimatedStyle(() => {
    const { x, y, dx, dy } = ball.value;
    const angle = Math.atan2(-dx, dy);

    return {
      display: isUserTurn.value ? "flex" : "none",
      top: y,
      left: x,
      transform: [
        {
          rotate: `${angle}rad`,
        },
      ],
    };
  });

  return (
    <GameContext.Provider value={{ ball, isUserTurn, onEndTurn, blocks }}>
      <GestureDetector gesture={pan}>
        <SafeAreaView style={styles.container}>
          <View style={styles.board}>
            {blocks.value.map((block, index) => (
              <Block key={index} index={index} />
            ))}

            <Ball />

            <Animated.View
              style={[
                {
                  width: 0,
                  height: 1000,
                  borderWidth: 1,
                  borderColor: "#ffffff99",
                  borderStyle: "dotted",
                  position: "absolute",
                  transformOrigin: "top-center",
                },
                pathStyle,
              ]}
            />
          </View>
          <Button title="Move" onPress={() => (isUserTurn.value = false)} />
        </SafeAreaView>
      </GestureDetector>
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
