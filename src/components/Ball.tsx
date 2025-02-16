import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useFrameCallback,
} from "react-native-reanimated";
import { useWindowDimensions } from "react-native";

import { useGameContext } from "@/GameContext";
import { ballSpeed, boardHeight } from "@/constants";

const Ball = () => {
  const { ball, isUserTurn, onEndTurn } = useGameContext();

  const { width } = useWindowDimensions();

  const frameCallback = useFrameCallback((frameInfo) => {
    const delta = (frameInfo.timeSincePreviousFrame || 0) / 1000;

    let { x, y, dx, dy, r } = ball!.value;

    x += dx * delta * ballSpeed;
    y += dy * delta * ballSpeed;

    if (y < r) {
      dy *= -1;
      y = r;
    }
    if (y > boardHeight - r) {
      y = boardHeight - r;
      onEndTurn();
    }

    if (x > width - r) {
      dx *= -1;
      x = width - r;
    }
    if (x < r) {
      dx *= -1;
      x = r;
    }

    ball!.value = {
      ...ball!.value,
      x,
      y,
      dy,
      dx,
    };
  }, false);

  const startFrameCallback = (val: boolean) => {
    frameCallback.setActive(val);
  };

  useAnimatedReaction(
    () => isUserTurn!.value,
    (val) => runOnJS(startFrameCallback)(!val)
  );

  const ballStyles = useAnimatedStyle(() => {
    const { x, y, r } = ball!.value;
    return {
      left: x - r,
      top: y - r,
      borderRadius: r,

      width: r * 2,
      aspectRatio: 1,
      backgroundColor: "white",

      position: "absolute",
    };
  });

  return <Animated.View style={ballStyles} />;
};

export default Ball;
