"use client";
import { Dispatch, SetStateAction } from "react";
import { Algorithm, ALGORITHM_LIST } from "@/lib/algorithm";
import { capitalizeFirstLetter } from "@/lib/string";
import clsx from "clsx";
import { PauseIcon, PlayIcon, StepBack, StepForward } from "lucide-react";
import { Slider } from "../shadcn/slider";
import { Button } from "../shadcn/button";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface Props {
  // State
  selectedAlgorithm: string;
  setSelectedAlgorithm: Dispatch<SetStateAction<Algorithm>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  speed: number;
  setSpeed: Dispatch<SetStateAction<number>>;
  arrSize: number;
  setArrSize: (size: number) => void;
  stepsCount: number;
  // Events
  onRandomize: () => void;
  onReset: () => void;
}

const MIN_STEP = 0;

export default function AlgorithmSidebar({
  setSelectedAlgorithm,
  selectedAlgorithm,
  isPlaying,
  setIsPlaying,
  step,
  setStep,
  speed,
  setSpeed,
  arrSize,
  setArrSize,
  stepsCount,
  onRandomize,
  onReset,
}: Readonly<Props>) {
  return (
    <>
      <div className="flex border-l border-l-[#FFFFFF]/15">
        <SidebarTrigger className="self-center" />
      </div>
      <Sidebar
        side="right"
        className="min-w-[360px] border-l border-[#FFFFFF]/15 p-4"
      >
        <SidebarContent>
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
                    : "text-secondary-text",
                )}
              >
                {capitalizeFirstLetter(al)}
              </button>
            ))}
          </div>

          {/* Playback buttons */}
          <span className="sidebar-label block mb-4">PLAYBACK</span>
          <div className="flex gap-x-3 justify-center items-center mb-6">
            <button
              onClick={() => {
                if (step > MIN_STEP) {
                  setStep(step - 1);
                }
              }}
              className="w-10 h-10 flex items-center justify-center border border-white/15 rounded-xl bg-[#1B1E24] hover:bg-[#1B1E24]/75 transition-colors cursor-pointer"
            >
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

            <button
              onClick={() => {
                if (step < stepsCount) {
                  setStep(step + 1);
                }
              }}
              className="w-10 h-10 flex items-center justify-center border border-white/15 rounded-xl bg-[#1B1E24] hover:bg-[#1B1E24]/75 transition-colors cursor-pointer"
            >
              <StepForward width={16} />
            </button>
          </div>

          {/* Timeline slider */}
          <div className="flex justify-between mb-2">
            <span className="sidebar-label block ">TIMELINE</span>
            <span className="text-[11px] text-secondary-text">
              {step}/{stepsCount}
            </span>
          </div>
          <Slider
            color="teal-accent"
            max={stepsCount}
            disabled={isPlaying}
            value={[step]}
            onValueChange={(values) => {
              setStep(values[0]);
            }}
          />

          {/* Speed slider */}
          <div className="flex justify-between mt-4 mb-5">
            <span className="sidebar-label block ">SPEED</span>
            <span className="text-[11px] text-secondary-text">{speed}%</span>
          </div>
          <Slider
            color="sky-accent"
            min={1}
            max={100}
            value={[speed]}
            onValueChange={(values) => {
              setSpeed(values[0]);
            }}
          />

          {/* Array size */}
          <div className="flex justify-between mb-2 mt-5">
            <span className="sidebar-label block ">ARRAY SIZE</span>
            <span className="text-[11px] text-secondary-text">{arrSize}</span>
          </div>
          <Slider
            color="indigo-accent"
            min={10}
            max={100}
            disabled={isPlaying}
            value={[arrSize]}
            onValueChange={(values) => {
              setArrSize(values[0]);
            }}
          />

          {/* Buttons */}
          <div className="flex gap-2 mt-8">
            <Button onClick={onRandomize} className="flex-1">
              Randomize
            </Button>
            <Button onClick={onReset} className="flex-1" variant="outline">
              Reset
            </Button>
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
