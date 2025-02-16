import { BlockData } from "./types";
import { blocksPerRow, blockW } from "./constants";

export const generateBlocksRow = (row: number) => {
  "worklet";
  const blocks: BlockData[] = [];

  // generate
  for (let col = 0; col < blocksPerRow; col++) {
    const shouldAdd = Math.random() < 0.5;

    if (shouldAdd) {
      const val = Math.ceil(Math.random() * 3);

      blocks.push({
        x: col * (blockW + 10) + 5,
        y: row * (blockW + 10) + 5,
        w: blockW,
        val,
      });
    }
  }

  return blocks;
};
