"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React from "react";

interface IProps {
  value: number;
}

const CircularProgressbarPage = ({ value }: IProps) => {
  return (
    <CircularProgressbar
      styles={buildStyles({
        pathColor: "red",
      })}
      value={value}
      text={`${value}%`}
    />
  );
};

export default CircularProgressbarPage;
