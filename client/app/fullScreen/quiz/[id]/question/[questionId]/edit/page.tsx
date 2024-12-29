import React from "react";
import QuestionIndex from "../../_component/QuestionIndex";

const page = ({
  params,
}: {
  params: {
    id: string;
    questionId: string;
  };
}) => {
  const { id, questionId } = params;
  return (
    <div>
      <QuestionIndex quizId={id} id={questionId} />
    </div>
  );
};

export default page;
