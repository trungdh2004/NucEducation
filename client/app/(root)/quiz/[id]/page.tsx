import { redirect } from "next/navigation";
import QuizIndexDetail from "../_component/QuizIndexDetail";
import { getByIdQuizApi } from "@/actions/quiz.action";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;

  if (!id) {
    redirect("/");
  }

  return (
    <div>
      <QuizIndexDetail id={id} />
    </div>
  );
};

export default page;