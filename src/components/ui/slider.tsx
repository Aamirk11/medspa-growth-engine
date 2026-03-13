"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ min, max, step = 1, value, onChange, className }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <div className={cn("relative w-full", className)}>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-input h-2 w-full cursor-pointer appearance-none rounded-full bg-muted outline-none"
          style={{
            background: `linear-gradient(to right, #0D9488 0%, #0D9488 ${percentage}%, hsl(var(--muted)) ${percentage}%, hsl(var(--muted)) 100%)`,
          }}
        />
        <style jsx>{`
          .slider-input::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #0D9488;
            box-shadow: 0 2px 6px rgba(13, 148, 136, 0.4);
            cursor: pointer;
            border: 2px solid white;
            transition: transform 0.15s ease;
          }
          .slider-input::-webkit-slider-thumb:hover {
            transform: scale(1.15);
          }
          .slider-input::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #0D9488;
            box-shadow: 0 2px 6px rgba(13, 148, 136, 0.4);
            cursor: pointer;
            border: 2px solid white;
            transition: transform 0.15s ease;
          }
          .slider-input::-moz-range-thumb:hover {
            transform: scale(1.15);
          }
        `}</style>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
