"use client";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface Props {
  percent: number;
}

const CircularProgressBar = ({ percent }: Props) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(percent);
  }, [percent]);

  const getColor = (value: number) => {
    if (value <= 70) {
      return 'rgba(1, 163, 28, 1)';
    } else if (value <= 90) {
      return 'rgba(247, 202, 24, 1)';
    } else {
      return 'rgba(255, 0, 0, 1)';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <CircularProgressbar
            value={value}
            text={`${value}%`}
            styles={buildStyles({
              pathTransitionDuration: 1, // Animation duration in seconds
              pathColor: getColor(value),
              textColor: getColor(value),
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
            className="self-center m-0 p-0"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Percent of Budget Spent</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CircularProgressBar;
