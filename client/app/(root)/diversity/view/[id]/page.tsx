import QuizIndexDetail from "@/components/root/quiz/QuizIndexDetail";
import { redirect } from "next/navigation";

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
