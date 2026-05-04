type SectionWaveDividerProps = {
  /** Flip vertically for variety between sections. */
  flip?: boolean;
  className?: string;
};

export function SectionWaveDivider({ flip, className }: SectionWaveDividerProps) {
  return (
    <div
      className={`relative h-10 w-full overflow-hidden text-amber-100/90 sm:h-14 ${flip ? "rotate-180" : ""} ${className ?? ""}`}
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 32C180 8 360 40 540 24C720 8 900 36 1080 28C1260 20 1380 12 1440 8V48H0V32Z"
          fill="currentColor"
          className="text-amber-100/50"
        />
        <path
          d="M0 40C200 18 400 44 600 30C800 16 1000 38 1200 32C1320 28 1400 22 1440 18V48H0V40Z"
          fill="currentColor"
          className="text-white/80"
        />
      </svg>
    </div>
  );
}
