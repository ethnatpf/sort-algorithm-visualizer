"use client";
import { memo, useState } from "react";
import type { Algorithm } from "../lib/constants";
import AlgorithmSidebar from "../components/layout/algorithm-sidebar";
import { capitalizeFirstLetter } from "../lib/string";
import clsx from "clsx";

function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<Algorithm>("bubble");
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(50);
  const [arrSize, setArrSize] = useState(40);

  const legendItems: Array<{ label: string; bgClass: string }> = [
    { label: "Default", bgClass: "bg-[#475569]" },
    { label: "Comparing", bgClass: "bg-[#FBBF24]" },
    { label: "Swapping", bgClass: "bg-[#F87171]" },
    { label: "Sorted", bgClass: "bg-[#4ADE80]" },
  ];

  function onRandomize() {
    // TODO: Implement this
  }

  function onReset() {
    // TODO: Implement this
  }

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <main className="flex-1 bg-[#12141a] py-8 px-6">
        <div className="flex justify-between">
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
        setArrSize={setArrSize}
        onRandomize={onRandomize}
        onReset={onReset}
      />
    </div>
  );
}

export default memo(Home);
