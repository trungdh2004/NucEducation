"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import Image from "next/image";
import React, { useState } from "react";
import QuizItem from "../quiz/_component/QuizItem";
import { Check, CheckIcon, RectangleHorizontalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import DiversityIndex from "./DiversityIndex";

const page = () => {

  return (
    <div>
      <DiversityIndex />
    </div>
  );
};

export default page;
