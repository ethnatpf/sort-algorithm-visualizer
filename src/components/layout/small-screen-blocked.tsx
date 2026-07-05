import clsx from "clsx";

interface Props {
  className?: string;
}

export default function SmallScreenBlocked({ className }: Readonly<Props>) {
  return (
    <section
      className={clsx(
        className,
        "w-screen h-screen flex items-center justify-center px-2",
      )}
    >
      <div className="flex flex-col items-center gap-y-3 text-center">
        {/* Sort logo */}
        <div className="bg-[#1B1E24] size-16 rounded-2xl border border-white/15 flex items-center justify-center">
          <div className="flex gap-x-1 items-end">
            <div className="bg-[#475579] w-[5px] h-[10px] rounded-t-xl" />
            <div className="bg-[#FBBF24] w-[5px] h-[18px] rounded-t-xl" />
            <div className="bg-[#F87171] w-[5px] h-[24px] rounded-t-xl" />
            <div className="bg-[#4ADE80] w-[5px] h-[14px] rounded-t-xl" />
          </div>
        </div>

        <span className="font-jetbrains-mono text-muted text-[13px]">
          SORT()
        </span>

        <h1 className="text-[#F4F5F7] text-[22px] font-semibold">
          Best viewed on a larger screen
        </h1>

        <p className="text-secondary-text text-sm leading-6 ">
          The visualizer relies on a wide layout to show algorithms. <br></br>
          Please switch to a laptop or desktop.
        </p>
      </div>
    </section>
  );
}
