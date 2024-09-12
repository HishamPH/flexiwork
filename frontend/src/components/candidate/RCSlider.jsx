import { useState } from "react";
import Slider from "rc-slider";
import { Typography } from "@material-tailwind/react";
import "rc-slider/assets/index.css";

const RCSlider = ({ range, setRange, min, max, step }) => {
  const handleChange = (newRange) => {
    setRange(newRange);
  };

  const diff = (max - min) / 4;
  const marks = {};
  for (let i = 0; i <= 4; i++) {
    const value = min + i * diff;
    marks[value] = {
      style: {
        transform: "translateX(-50%)",
        whiteSpace: "nowrap",
      },
      label: `$${Math.round(value / 1000).toLocaleString()}k`,
    };
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <Typography variant="h6" color="blue-gray" className="mb-4">
        Select Salary Range
      </Typography>
      <Slider
        range
        min={min}
        max={max}
        step={step}
        value={range}
        marks={marks}
        onChange={handleChange}
        railStyle={{ backgroundColor: "#e5e7eb", height: 4 }}
        trackStyle={[{ backgroundColor: "#3b82f6", height: 4 }]}
        handleStyle={[
          { backgroundColor: "#3b82f6", borderColor: "#3b82f6", opacity: 1 },
          { backgroundColor: "#3b82f6", borderColor: "#3b82f6", opacity: 1 },
        ]}
      />
      {/* <div className="flex justify-between mt-4">
        <Typography variant="small" color="blue-gray">
          {"30000".toLocaleString()}
        </Typography>
        <Typography variant="small" color="blue-gray" className="font-medium">
          ${range[0].toLocaleString()} - ${range[1].toLocaleString()}
        </Typography>
        <Typography variant="small" color="blue-gray">
          {"200000".toLocaleString()}
        </Typography>
      </div> */}
    </div>
  );
};

export default RCSlider;
