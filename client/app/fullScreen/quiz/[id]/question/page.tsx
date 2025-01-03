import React from "react";
import QuestionIndex from "./_component/QuestionIndex";

const page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const id = params.id;
  return (
    <div>
      <QuestionIndex quizId={id} />
    </div>
  );
};

export default page;
