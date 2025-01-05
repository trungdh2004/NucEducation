import { Button } from "@/components/ui/button";
import React from "react";

interface IProp {
  handleNextQuestion: () => void;
  status: "none" | "completed" | "wrong";
}
const FooterLessonPlayer = ({ handleNextQuestion }: IProp) => {
  return (
    <div
      className={
        "w-full h-16 fixed bottom-0 flex items-center justify-between px-4 backdrop-blur-sm"
      }
    >
      <div></div>
      <div>
        <Button variant={"secondary"} onClick={handleNextQuestion}>
          Nộp
        </Button>
      </div>
    </div>
  );
};

export default FooterLessonPlayer;
