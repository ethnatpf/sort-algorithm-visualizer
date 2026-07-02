"use client";
import { useState } from "react";
import { ALGORITHM_LIST, type Algorithm } from "@/src/lib/constants";
import { capitalizeFirstLetter } from "@/src/lib/string";
import clsx from "clsx";
import { PauseIcon, PlayIcon, StepBack, StepForward } from "lucide-react";
import { Slider } from "../shadcn/slider";
import { Button } from "../shadcn/button";

export default function AlgorithmSidebar() {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<Algorithm>("bubble");
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(50);
  const [arrSize, setArrSize] = useState(40);

  return (
    <aside className="min-w-[360px] border-l border-[#FFFFFF]/15 p-4">
      {/* Algorithm selector */}
      <span className="sidebar-label block mb-2">ALGORITHM</span>
      {/* This could be a reusable component, but we only use it once for this project */}
      <div className="p-1 bg-[#1B1E24] flex justify-around rounded-lg gap-x-1 mb-6">
        {ALGORITHM_LIST.map((al) => (
          <button
            onClick={() => setSelectedAlgorithm(al)}
            key={al}
            className={clsx(
              "cursor-pointer p-1 py-1.5 flex-1 text-sm",
              selectedAlgorithm === al
                ? "text-[#0D0F13] bg-teal-accent rounded-lg font-semibold"
                : "text-[#9CA3AF]",
            )}
          >
            {capitalizeFirstLetter(al)}
          </button>
        ))}
      </div>

      {/* Playback buttons */}
      <span className="sidebar-label block mb-4">PLAYBACK</span>
      <div className="flex gap-x-3 justify-center items-center mb-6">
        <button className="w-10 h-10 flex items-center justify-center border border-white/15 rounded-xl bg-[#1B1E24] hover:bg-[#1B1E24]/75 transition-colors cursor-pointer">
          <StepBack width={16} />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-teal-accent hover:bg-teal-accent/90 transition-colors flex items-center justify-center p-3 rounded-xl w-12 h-12 cursor-pointer"
        >
          {isPlaying ? (
            <PauseIcon width={20} color="black" fill="black" />
          ) : (
            <PlayIcon width={20} color="black" fill="black" />
          )}
        </button>

        <button className="w-10 h-10 flex items-center justify-center border border-white/15 rounded-xl bg-[#1B1E24] hover:bg-[#1B1E24]/75 transition-colors cursor-pointer">
          <StepForward width={16} />
        </button>
      </div>

      {/* Timeline slider */}
      <div className="flex justify-between mb-2">
        <span className="sidebar-label block ">TIMELINE</span>
        <span className="text-[11px] text-[#9CA3AF]">{step}/100</span>
      </div>
      <Slider
        color="teal-accent"
        max={100}
        value={[step]}
        onValueChange={(values) => {
          setStep(values[0]);
        }}
      />

      {/* Speed slider */}
      <div className="flex justify-between mt-4 mb-5">
        <span className="sidebar-label block ">SPEED</span>
        <span className="text-[11px] text-[#9CA3AF]">{speed}%</span>
      </div>
      <Slider
        color="sky-accent"
        max={100}
        value={[speed]}
        onValueChange={(values) => {
          setSpeed(values[0]);
        }}
      />

      {/* Array size */}
      <div className="flex justify-between mb-2 mt-5">
        <span className="sidebar-label block ">ARRAY SIZE</span>
        <span className="text-[11px] text-[#9CA3AF]">{arrSize}</span>
      </div>
      <Slider
        color="indigo-accent"
        max={100}
        value={[arrSize]}
        onValueChange={(values) => {
          setArrSize(values[0]);
        }}
      />

      {/* Buttons */}
      <div className="flex gap-2 mt-8">
        <Button className="flex-1">Randomize</Button>
        <Button className="flex-1" variant="outline">
          Reset
        </Button>
      </div>
    </aside>
  );
}
