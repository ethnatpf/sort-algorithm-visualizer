// Disclaimer: tests have been AI generated.
import { LineState, VisualizedItemProps } from "@/components/visualized-item";
import { generateSnapshotsBubble } from "@/lib/algorithm";

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
  // Several snapshots share an arrangement while only the highlighted
  // states change (compare -> swap -> settle).
  const arr0 = [5, 1, 4, 2, 8];
  const arr1 = [1, 5, 4, 2, 8]; // after swapping positions 0,1
  const arr2 = [1, 4, 5, 2, 8]; // after swapping positions 1,2
  const arr3 = [1, 4, 2, 5, 8]; // after swapping positions 2,3
  const arr4 = [1, 2, 4, 5, 8]; // after swapping positions 1,2 (pass 2) - final sorted order

  // Each row documents the bubble sort step it represents, so a failure
  // points straight at the stage (compare / swap / settle / mark sorted)
  // that's broken, instead of a diff of the whole snapshot array.
  const expectedSteps: Array<
    [description: string, expected: Array<VisualizedItemProps>]
  > = [
    ["initial array, all default", snapshot(arr0, [D, D, D, D, D])],

    // Pass 1
    ["compares 5 and 1", snapshot(arr0, [C, C, D, D, D])],
    ["swaps 5 and 1", snapshot(arr0, [S, S, D, D, D])],
    ["settles after swapping 5 and 1", snapshot(arr1, [D, D, D, D, D])],

    ["compares 5 and 4", snapshot(arr1, [D, C, C, D, D])],
    ["swaps 5 and 4", snapshot(arr1, [D, S, S, D, D])],
    ["settles after swapping 5 and 4", snapshot(arr2, [D, D, D, D, D])],

    ["compares 5 and 2", snapshot(arr2, [D, D, C, C, D])],
    ["swaps 5 and 2", snapshot(arr2, [D, D, S, S, D])],
    ["settles after swapping 5 and 2", snapshot(arr3, [D, D, D, D, D])],

    ["compares 5 and 8 (no swap needed)", snapshot(arr3, [D, D, D, C, C])],
    ["marks 8 as sorted after pass 1", snapshot(arr3, [D, D, D, D, SORTED])],

    // Pass 2
    ["compares 1 and 4 (no swap needed)", snapshot(arr3, [C, C, D, D, SORTED])],

    ["compares 4 and 2", snapshot(arr3, [D, C, C, D, SORTED])],
    ["swaps 4 and 2", snapshot(arr3, [D, S, S, D, SORTED])],
    ["settles after swapping 4 and 2", snapshot(arr4, [D, D, D, D, SORTED])],

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
