import QuizIndexDetail from "@/components/root/quiz/QuizIndexDetail";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <div>
      <QuizIndexDetail id={id} isAdmin={true} />
    </div>
  );
};

export default page;
