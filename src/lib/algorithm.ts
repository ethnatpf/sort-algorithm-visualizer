import { LineState, VisualizedItemProps } from "@/components/visualized-item";

export const ALGORITHM_LIST = [
  "bubble",
  "insertion",
  "merge",
  "quick",
] as const;
export type Algorithm = (typeof ALGORITHM_LIST)[number];

export function generateSnapshotsByAlgorithm(
  algo: Algorithm,
  items: Array<VisualizedItemProps>,
): Array<Array<VisualizedItemProps>> {
  switch (algo) {
    case "bubble":
      return generateSnapshotsBubble(items);
    case "insertion":
    case "merge":
    case "quick":
      return [];
    default:
      throw new Error(
        `Algorithm ${algo} has not been implemented yet or doesn't exist`,
      );
  }
}

// Helper to change the state of some items of an array of visualized items.
// This will only break the reference of the changed item.
function generateStateOnlySnapshot(
  items: Array<VisualizedItemProps>,
  // Index of the items to change the state of.
  indexes: Array<number>,
  // New state of the items at idx
  state: LineState,
) {
  return items.map((item, idx) => {
    if (indexes.includes(idx)) {
      return {
        ...item,
        state,
      };
    } else {
      return item;
    }
  });
}

// Generate all the snapshots using the bubble sort algorithm.
export function generateSnapshotsBubble(
  items: Array<VisualizedItemProps>,
): Array<Array<VisualizedItemProps>> {
  const snapshots: Array<Array<VisualizedItemProps>> = [];

  // Initial snapshot before any change
  snapshots.push(items);

  // Run a pass on the array.
  // Compare each value with the value at its right, and swap them if the right value is lower than the left value.
  const runPass = (
    previousItems: Array<VisualizedItemProps> = items,
    previousBubbledIndex: number | null = null,
  ) => {
    // Track if we swapped at least one item inside the pass.
    let swappedItems = false;
    // Assume the algorithm will break the references itself. (we want to avoid breaking all references everytime for optimization reasons)
    let _previousItems = previousItems;
    // Keep track of the previous bubbled index (the last value of the array after each pass).
    // As the highest value always bubbles at the end of the array, we can ignore it for future passes.
    let _previousBubbledIndex: null | number = previousBubbledIndex;

    const slicedPreviousItems = _previousBubbledIndex
      ? _previousItems.slice(0, _previousBubbledIndex)
      : _previousItems;

    for (
      let i = 0;
      // Exclude the bubbled elements from the array
      i < slicedPreviousItems.length;
      i++
    ) {
      // We can consider the last item of the array sorted as it "bubbled" at the end. Push a sorted snapshot and exit the loop
      if (i === slicedPreviousItems.length - 1) {
        _previousBubbledIndex = i;

        _previousItems = _previousItems.map((item, idx) => {
          if (idx === i) {
            return {
              ...item,
              state: LineState.SORTED,
            };
          } else {
            return item;
          }
        });

        snapshots.push(_previousItems);
        break;
      }

      const a = _previousItems[i];
      const b = _previousItems[i + 1];

      // Push the comparing state.
      // Don't update previousItems so that the next update will automatically remove comparing.
      snapshots.push(
        generateStateOnlySnapshot(
          // Also change back the swapping states to comparing
          _previousItems,
          [i, i + 1],
          LineState.COMPARING,
        ),
      );

      if (a.value > b.value) {
        // Swap them
        _previousItems = _previousItems.map((item, idx) => {
          if (idx === i) {
            return {
              ...b,
              state: LineState.SWAPPING,
            };
          } else if (idx === i + 1) {
            return {
              ...a,
              state: LineState.SWAPPING,
            };
          } else {
            return item;
          }
        });

        snapshots.push(_previousItems);

        _previousItems = _previousItems.map((item) => {
          if (item.state === LineState.SWAPPING) {
            return {
              ...item,
              state: LineState.DEFAULT,
            };
          } else {
            return item;
          }
        });

        swappedItems = true;
      }
    }

    // If we swapped items inside this pass, recursively do another pass.
    // If not, we can consider the array sorted.
    if (swappedItems) {
      runPass(_previousItems, _previousBubbledIndex);
    } else {
      // If the pass did not swap any items, we can consider the array sorted.
      snapshots.push(
        _previousItems.map((item) => ({
          ...item,
          state: LineState.SORTED,
        })),
      );
    }
  };

  runPass();

  return snapshots;
}

// Generate all the snapshots using the insertion sort algorithm.
export function generateSnapshotsInsertion(
  items: Array<VisualizedItemProps>,
): Array<Array<VisualizedItemProps>> {
  const snapshots: Array<Array<VisualizedItemProps>> = [];

  // Initial snapshot before any change
  snapshots.push(items);

  return snapshots;
}
