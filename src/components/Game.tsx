import { StyleSheet, SafeAreaView, View } from "react-native";

import { boardHeight } from "@/constants";

const Game = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.board}></View>
    </SafeAreaView>
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
