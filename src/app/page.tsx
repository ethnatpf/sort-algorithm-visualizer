"use client";
import { memo, useEffect, useRef, useState } from "react";
import {
  generateSnapshotsByAlgorithm,
  type Algorithm,
  type VisualizedItemWithId,
} from "@/lib/algorithm";
import AlgorithmSidebar from "@/components/layout/algorithm-sidebar";
import { capitalizeFirstLetter } from "@/lib/string";
import clsx from "clsx";
import { getRandomIntInclusive } from "@/lib/utils";
import VisualizedItem, {
  getVisualizedItemColor,
  LineState,
} from "@/components/visualized-item";
import { Spinner } from "@/components/ui/spinner";

function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<Algorithm>("bubble");
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(50);
  const [arrSize, setArrSize] = useState(40);

  // Generate a random array of values for the visualizedItems state.
  function generateItems(size: number) {
    const arr: Array<VisualizedItemWithId> = [];

    for (let i = 0; i < size; i++) {
      arr.push({
        id: i,
        value: getRandomIntInclusive(1, 100),
        state: LineState.DEFAULT,
      });
    }

    return arr;
  }

  const [visualizedSnapshots, setVisualizedSnapshots] =
    useState<Array<Array<VisualizedItemWithId>>>();

  function generateSnapshots(size: number) {
    const items = generateItems(size);
    setVisualizedSnapshots(
      generateSnapshotsByAlgorithm(selectedAlgorithm, items),
    );
  }

  const currentSnapshot = visualizedSnapshots?.[step] ?? [];

  // Only generate the snapshots on mount (client-side)
  // Generating it as the initial value of the state would create an hydratation error, as the items are random.
  // This will cause an initial flash with empty values, but its an acceptable trade-of (instead of disabling SSR)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only init to avoid SSR hydration mismatch (random values)
    generateSnapshots(arrSize);
  }, []);

  function onSetArraySize(size: number) {
    setArrSize(size);
    generateSnapshots(size);
    setStep(0);
    setIsPlaying(false);
  }

  const legendItems: Array<{ label: string; bgClass: string }> = [
    {
      label: "Default",
      bgClass: `bg-[${getVisualizedItemColor(LineState.DEFAULT)}]`,
    },
    {
      label: "Comparing",
      bgClass: `bg-[${getVisualizedItemColor(LineState.COMPARING)}]`,
    },
    {
      label: "Swapping",
      bgClass: `bg-[${getVisualizedItemColor(LineState.SWAPPING)}]`,
    },
    {
      label: "Sorted",
      bgClass: `bg-[${getVisualizedItemColor(LineState.SORTED)}]`,
    },
  ];

  function onRandomize() {
    generateSnapshots(arrSize);
    setStep(0);
    setIsPlaying(false);
  }

  function onReset() {
    // TODO: Revert to the initial array
    setStep(0);
    setIsPlaying(false);
  }

  const requestRef = useRef<null | number>(null);
  const previousTimeRef = useRef<null | number>(null);
  const accumulatedRef = useRef(0);

  // Play the animation based on the speed.
  // Chose to use requestAnimationFrame instead of setInterval to avoid "losing" snapshots visually when the speed is too high.
  // The browser only repaints the screen at about 16.67ms for a 60hz screen, so updating the steps every 10ms for example would
  // visually skip some snapshots.
  useEffect(() => {
    // Time is a timestamp that represents when the current frame started.
    const animate = (time: number) => {
      // ms elapsed since the last time we incremented the step
      const accumulatedDeltaTime = previousTimeRef.current
        ? time - previousTimeRef.current + accumulatedRef.current
        : null;

      // Determines at which interval we should increment the step at speed 0
      const BASE_MS = 1000;
      // For a base of 1000ms, this will be a range between 10ms and 1000ms
      const calculatedMs = (1 - speed / 100) * BASE_MS;

      if (
        accumulatedDeltaTime === null ||
        accumulatedDeltaTime > calculatedMs
      ) {
        setStep((previousStep) => {
          if (previousStep < visualizedSnapshots!.length - 1) {
            return previousStep + 1;
          } else {
            return previousStep;
          }
        });

        accumulatedRef.current = 0;
      } else if (previousTimeRef.current !== null) {
        // If previousTimeRef is null, its the first iteration.
        // We don't want to increment the accumulatedRef as we always increment the step initially
        accumulatedRef.current += time - previousTimeRef.current;
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = null;
    }

    return () => {
      if (requestRef.current) {
        // Here, we don't want to set the previousTimeRef to null as the cleanup function also runs when dependencies changes.
        // Setting it to null would retrigger the initial step incrementation, which would visually appears as if the speed accelerates
        // even if we are decreasing it inside the slider
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, speed]);

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <main className="flex-1 flex flex-col bg-[#12141a] py-8 px-6  ">
        <div className="flex justify-between mb-6">
          {/* Sort title and step counter */}
          <div>
            <h2 className="text-xl font-semibold">
              {capitalizeFirstLetter(selectedAlgorithm)} Sort
            </h2>
            <span className="text-[13px] text-muted">
              Step{" "}
              <span className="font-jetbrains-mono text-secondary-text">
                {step}
              </span>{" "}
              / 100
            </span>
          </div>

          {/* Colors legend */}
          <div className="flex items-center gap-3">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-x-1">
                <div
                  className={clsx("w-2.5 h-2.5 rounded-[2px]", item.bgClass)}
                />
                <span className="text-secondary-text text-[12px]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visualizer */}
        <div className="bg-[#181A20] p-4 rounded-lg border border-white/5 h-full flex items-end gap-x-2">
          {currentSnapshot.length ? (
            currentSnapshot.map((item) => (
              <VisualizedItem
                key={item.id}
                value={item.value}
                state={item.state}
              />
            ))
          ) : (
            <Spinner className="size-16 self-center mx-auto " />
          )}
        </div>
      </main>
      <AlgorithmSidebar
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        step={step}
        setStep={setStep}
        speed={speed}
        setSpeed={setSpeed}
        arrSize={arrSize}
        setArrSize={onSetArraySize}
        stepsCount={visualizedSnapshots ? visualizedSnapshots.length - 1 : 0}
        onRandomize={onRandomize}
        onReset={onReset}
      />
    </div>
  );
}

export default memo(Home);
