"use client";
import { memo, useState } from "react";
import type { Algorithm } from "../lib/constants";
import AlgorithmSidebar from "../components/layout/algorithm-sidebar";

function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<Algorithm>("bubble");
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(50);
  const [arrSize, setArrSize] = useState(40);

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <main className="flex-1 bg-[#12141a]"></main>
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
      />
    </div>
  );
}

export default memo(Home);
