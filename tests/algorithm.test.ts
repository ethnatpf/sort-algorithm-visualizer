// Disclaimer: tests have been AI generated.
import { LineState, VisualizedItemProps } from "@/components/visualized-item";
import {
  generateSnapshotsBubble,
  generateSnapshotsInsertion,
} from "@/lib/algorithm";

function snapshot(
  values: Array<number>,
  states: Array<LineState>,
): Array<VisualizedItemProps> {
  return values.map((value, i) => ({ value, state: states[i] }));
}

const D = LineState.DEFAULT;
const C = LineState.COMPARING;
const S = LineState.SWAPPING;
const SORTED = LineState.SORTED;

describe("generateSnapshotsBubble", () => {
  const arrayToSort: Array<VisualizedItemProps> = [5, 1, 4, 2, 8].map(
    (value) => ({
      value,
      state: LineState.DEFAULT,
    }),
  );

  // Each arrN below is one stable arrangement of values (by position).
  // The SWAPPING snapshot itself already carries the swapped values
  // (there's no separate settle step): it goes straight into the next
  // compare, or into the sorted mark.
  const arr0 = [5, 1, 4, 2, 8];
  const arr1 = [1, 5, 4, 2, 8]; // after swapping positions 0,1
  const arr2 = [1, 4, 5, 2, 8]; // after swapping positions 1,2
  const arr3 = [1, 4, 2, 5, 8]; // after swapping positions 2,3
  const arr4 = [1, 2, 4, 5, 8]; // after swapping positions 1,2 (pass 2) - final sorted order

  // Each row documents the bubble sort step it represents, so a failure
  // points straight at the stage (compare / swap / mark sorted)
  // that's broken, instead of a diff of the whole snapshot array.
  const expectedSteps: Array<
    [description: string, expected: Array<VisualizedItemProps>]
  > = [
    ["initial array, all default", snapshot(arr0, [D, D, D, D, D])],

    // Pass 1
    ["compares 5 and 1", snapshot(arr0, [C, C, D, D, D])],
    ["swaps 5 and 1", snapshot(arr1, [S, S, D, D, D])],

    ["compares 5 and 4", snapshot(arr1, [D, C, C, D, D])],
    ["swaps 5 and 4", snapshot(arr2, [D, S, S, D, D])],

    ["compares 5 and 2", snapshot(arr2, [D, D, C, C, D])],
    ["swaps 5 and 2", snapshot(arr3, [D, D, S, S, D])],

    ["compares 5 and 8 (no swap needed)", snapshot(arr3, [D, D, D, C, C])],
    ["marks 8 as sorted after pass 1", snapshot(arr3, [D, D, D, D, SORTED])],

    // Pass 2
    ["compares 1 and 4 (no swap needed)", snapshot(arr3, [C, C, D, D, SORTED])],

    ["compares 4 and 2", snapshot(arr3, [D, C, C, D, SORTED])],
    ["swaps 4 and 2", snapshot(arr4, [D, S, S, D, SORTED])],

    ["compares 4 and 5 (no swap needed)", snapshot(arr4, [D, D, C, C, SORTED])],
    [
      "marks 5 as sorted after pass 2",
      snapshot(arr4, [D, D, D, SORTED, SORTED]),
    ],

    // Pass 3
    [
      "compares 1 and 2 (no swap needed)",
      snapshot(arr4, [C, C, D, SORTED, SORTED]),
    ],
    [
      "compares 2 and 4 (no swap needed)",
      snapshot(arr4, [D, C, C, SORTED, SORTED]),
    ],
    [
      "marks 4 as sorted after pass 3",
      snapshot(arr4, [D, D, SORTED, SORTED, SORTED]),
    ],

    // Pass 3 required no swaps, so the remaining unsorted items are already
    // in order: mark them all sorted in one shot instead of running pass 4.
    [
      "marks the rest as sorted since pass 3 required no swaps",
      snapshot(arr4, [SORTED, SORTED, SORTED, SORTED, SORTED]),
    ],
  ];

  let snapshots: Array<Array<VisualizedItemProps>>;

  beforeAll(() => {
    snapshots = generateSnapshotsBubble(arrayToSort);
  });

  it.each(
    expectedSteps.map(
      ([description, expected], index) =>
        [index, description, expected] as const,
    ),
  )("snapshot %i %s", (index, _description, expected) => {
    expect(snapshots[index]).toEqual(expected);
  });

  it("produces exactly the expected sequence of snapshots, in order", () => {
    const expectedSnapshots = expectedSteps.map(([, expected]) => expected);
    expect(snapshots).toEqual(expectedSnapshots);
  });
});

describe.only("generateSnapshotsInsertion", () => {
  const arrayToSort: Array<VisualizedItemProps> = [5, 1, 4, 2, 8].map(
    (value) => ({
      value,
      state: LineState.DEFAULT,
    }),
  );

  // Each arrN below is one stable arrangement of values (by position).
  // The SWAPPING snapshot itself already carries the swapped values
  // (there's no separate settle step): it goes straight into the next
  // compare, or into the sorted mark.
  const arr0 = [5, 1, 4, 2, 8];
  const arr1 = [1, 5, 4, 2, 8]; // after inserting 1
  const arr2 = [1, 4, 5, 2, 8]; // after inserting 4
  const arr3 = [1, 4, 2, 5, 8]; // mid-shift while inserting 2
  const arr4 = [1, 2, 4, 5, 8]; // after inserting 2 - final sorted order

  // Each row documents the insertion sort step it represents, so a failure
  // points straight at the stage (compare / swap / mark sorted) that's
  // broken, instead of a diff of the whole snapshot array.
  const expectedSteps: Array<
    [description: string, expected: Array<VisualizedItemProps>]
  > = [
    [
      "initial array, first element trivially sorted",
      snapshot(arr0, [SORTED, D, D, D, D]),
    ],

    // Insert 1
    ["compares 5 and 1", snapshot(arr0, [C, C, D, D, D])],
    ["swaps 5 and 1", snapshot(arr1, [S, S, D, D, D])],
    [
      "marks 1,5 as sorted after inserting 1",
      snapshot(arr1, [SORTED, SORTED, D, D, D]),
    ],

    // 1 5 4 2 8
    // Insert 4
    ["compares 5 and 4", snapshot(arr1, [SORTED, C, C, D, D])],
    ["swaps 5 and 4", snapshot(arr2, [SORTED, S, S, D, D])],
    // 1 4 5 2 8
    ["compares 1 and 4 (no swap needed)", snapshot(arr2, [C, C, SORTED, D, D])],
    [
      "marks 1,4,5 as sorted after inserting 4",
      snapshot(arr2, [SORTED, SORTED, SORTED, D, D]),
    ],

    // Insert 2
    ["compares 5 and 2", snapshot(arr2, [SORTED, SORTED, C, C, D])],
    ["swaps 5 and 2", snapshot(arr3, [SORTED, SORTED, S, S, D])],
    ["compares 4 and 2", snapshot(arr3, [SORTED, C, C, SORTED, D])],
    ["swaps 4 and 2", snapshot(arr4, [SORTED, S, S, SORTED, D])],
    [
      "compares 1 and 2 (no swap needed)",
      snapshot(arr4, [C, C, SORTED, SORTED, D]),
    ],
    [
      "marks 1,2,4,5 as sorted after inserting 2",
      snapshot(arr4, [SORTED, SORTED, SORTED, SORTED, D]),
    ],

    // Insert 8 (already in place, no shifting needed)
    [
      "compares 5 and 8 (no swap needed)",
      snapshot(arr4, [SORTED, SORTED, SORTED, C, C]),
    ],
    [
      "marks the rest as sorted after inserting 8",
      snapshot(arr4, [SORTED, SORTED, SORTED, SORTED, SORTED]),
    ],
  ];

  let snapshots: Array<Array<VisualizedItemProps>>;

  beforeAll(() => {
    snapshots = generateSnapshotsInsertion(arrayToSort);
  });

  it.each(
    expectedSteps.map(
      ([description, expected], index) =>
        [index, description, expected] as const,
    ),
  )("snapshot %i %s", (index, _description, expected) => {
    expect(snapshots[index]).toEqual(expected);
  });

  it("produces exactly the expected sequence of snapshots, in order", () => {
    const expectedSnapshots = expectedSteps.map(([, expected]) => expected);
    expect(snapshots).toEqual(expectedSnapshots);
  });
});
