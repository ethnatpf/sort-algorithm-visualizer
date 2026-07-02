"use client";
import { memo, useEffect, useState } from "react";
import type { Algorithm } from "@/lib/constants";
import AlgorithmSidebar from "@/components/layout/algorithm-sidebar";
import { capitalizeFirstLetter } from "@/lib/string";
import clsx from "clsx";
import { getRandomIntInclusive } from "@/lib/utils";
import VisualizedItem, {
  getVisualizedItemColor,
  VisualizedItemProps,
} from "@/components/visualized-item";
import { Spinner } from "@/components/ui/spinner";

interface ExtendedVisualizedItem extends VisualizedItemProps {
  id: number;
}

function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<Algorithm>("bubble");
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(50);
  const [arrSize, setArrSize] = useState(40);

  // Generate a random array of values for the visualizedItems state.
  function generateItems(size: number) {
    const arr: Array<ExtendedVisualizedItem> = [];

    for (let i = 0; i < size; i++) {
      arr.push({
        id: i,
        value: getRandomIntInclusive(1, 100),
        state: "default",
      });
    }

    return arr;
  }

  // Array of items to visualize
  const [visualizedItems, setVisualizedItems] = useState<
    Array<ExtendedVisualizedItem>
  >([]);

  // Only generate the items on mount (client-side)
  // Generating it as the initial value of the state would create an hydratation error, as the items are random.
  // This will cause an initial flash with empty values, but its an acceptable trade-of (instead of disabling SSR)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only init to avoid SSR hydration mismatch (random values)
    setVisualizedItems(generateItems(arrSize));
  }, []);

  function onSetArraySize(size: number) {
    setArrSize(size);
    setVisualizedItems(generateItems(size));
    setStep(0);
    setIsPlaying(false);
  }

  const legendItems: Array<{ label: string; bgClass: string }> = [
    { label: "Default", bgClass: `bg-[${getVisualizedItemColor("default")}]` },
    {
      label: "Comparing",
      bgClass: `bg-[${getVisualizedItemColor("comparing")}]`,
    },
    {
      label: "Swapping",
      bgClass: `bg-[${getVisualizedItemColor("swapping")}]`,
    },
    { label: "Sorted", bgClass: `bg-[${getVisualizedItemColor("sorted")}]` },
  ];

  function onRandomize() {
    setVisualizedItems(generateItems(arrSize));
    setStep(0);
    setIsPlaying(false);
  }

  function onReset() {
    // TODO: Revert to the initial array
    setStep(0);
    setIsPlaying(false);
  }

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
          {visualizedItems.length ? (
            visualizedItems.map((item) => (
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
        onRandomize={onRandomize}
        onReset={onReset}
      />
    </div>
  );
}

export default memo(Home);
