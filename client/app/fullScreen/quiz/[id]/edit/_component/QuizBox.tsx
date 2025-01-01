import { Button } from "@/components/ui/button";
import { IQuestionResponse } from "@/types/question.type";
import { Plus, PlusIcon, Search } from "lucide-react";
import Link from "next/link";
import QuizQuestion from "./QuizQuestion";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useState } from "react";
import { copyQuestionApi } from "@/actions/question.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  questions: IQuestionResponse[];
  id: string;
  handleDeleteQuestion: (id: string) => void;
}

const QuizBox = ({ questions, id, handleDeleteQuestion }: Props) => {
  const router = useRouter();
  const [idQuestion, setIdQuestion] = useState("");

  const handleOpenConfirm = (idQuestion: string) => {
    setIdQuestion(idQuestion);
  };

  const handleCopy = async (idQuestion: string) => {
    try {
      const res = await copyQuestionApi(idQuestion);
      router.push(`/fullScreen/quiz/${id}/question/${res.data._id}/edit`);
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  return (
    <section className="col-span-9 col-start-4  order-2">
      <div className="w-full border rounded-md p-2 bg-white box-shadow flex justify-between items-center sticky top-14">
        <div className="text-lg font-semibold">{questions?.length} câu hỏi</div>
        <div className="flex gap-2">
          <Button variant={"outline"} size={"sm"}>
            <Search size={16} />
            Tìm kiếm câu hỏi
          </Button>
          <Link href={`/fullScreen/quiz/${id}/question`}>
            <Button variant={"outline"} size={"sm"}>
              <PlusIcon size={16} />
              Thêm câu hỏi
            </Button>
          </Link>
        </div>
      </div>

      {questions?.length === 0 && (
        <div className="w-full h-40 mt-2 rounded-md border bg-white flex items-center justify-center">
          <Link
            href={`/fullScreen/quiz/${id}/question`}
            className="flex relative items-center px-3 py-2 border rounded-md bg-blue-500 text-white cursor-pointer border-b-[4px] border-b-blue-800 focus:border-b-0"
          >
            <Plus className="mr-2" size={20} />{" "}
            <span>Tạo câu hỏi đầu tiên</span>
            <div className="animate-ping absolute inline-flex h-full w-full rounded-md bg-blue-400 opacity-25"></div>
          </Link>
        </div>
      )}
      {questions?.length > 0 && (
        <div>
          {questions?.map((question) => (
            <QuizQuestion
              key={question._id}
              data={question}
              quizId={id}
              handleDeleteQuestion={handleOpenConfirm}
              handleCopy={handleCopy}
            />
          ))}

          <div className="mt-2 flex justify-center">
            <Link href={`/fullScreen/quiz/${id}/question`}>
              <Button variant={"outline"} size={"sm"}>
                <PlusIcon size={16} />
                Thêm câu hỏi
              </Button>
            </Link>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!idQuestion}
        handleClose={() => {
          setIdQuestion("");
        }}
        handleSubmit={() => {
          handleDeleteQuestion(idQuestion);
          setIdQuestion("");
        }}
        description="Bạn có chắc chắn muốn xóa câu hỏi không, sau khi xóa sẽ không thể khôi phục nữa !!!"
      />
    </section>
  );
};

export default QuizBox;
