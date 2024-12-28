"use client";
import React from "react";

const TestComponent = () => {
  return <div>{process.env.NEXT_PUBLIC_SERVER_URL}</div>;
};

export default TestComponent;
