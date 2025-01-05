import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ILessonQuestion } from "@/types/lesson.type";
import { IOption, TypeQuestion } from "@/types/question.type";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ButtonQuestionOption from "./ButtonQuestionOption";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  answer: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
});

interface IProps {
  question: ILessonQuestion;
  totalQuestion: number;
  questionIndex: number;
  answer: (string | number)[];
  handleAnswer: (type: TypeQuestion, value: number | string) => void;
  handleResponse: (type: TypeQuestion, value: string) => void;
  handleNextQuestion: () => void;
  response: (string | number)[];
  status: "none" | "completed" | "wrong";
  isPending: boolean;
}

const BoxLessonPlayer = ({
  question,
  totalQuestion,
  questionIndex,
  answer,
  handleAnswer,
  status,
  response,
  isPending,
  handleResponse,
}: IProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    handleResponse("BLANK", values.answer);
  }

  return (
    <div className="w-full h-[calc(100vh-136px)] mt-16 p-4">
      <div className="w-full h-full flex flex-col gap-2">
        <div className="h-1/2 w-full flex flex-col">
          <div className="w-full relative flex items-center justify-center py-3 h-full transition-all duration-300 ">
            <div className="max-sm:w-full min-w-[60%] filter backdrop-blur-md border border-gray-600 relative sm:h-min h-fit rounded-md">
              <div className="absolute px-3 py-1 -top-4 bg-gray-900 left-1/2 border border-gray-600 rounded-full -translate-x-1/2 text-white text-sm">
                {questionIndex + 1} / {totalQuestion}
              </div>
              <div className="text-white p-4 sm:p-6 h-full rounded-md">
                <div className="w-full h-full flex flex-col gap-4 sm:flex-row overflow-y-auto items-center sm:overflow-y-hidden">
                  {question?.query?.image && (
                    <div>
                      <Image
                        src={question?.query?.image}
                        width={100}
                        height={100}
                        alt="image qu"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 h-full flex items-center justify-center">
                    <div className="text-xl font-bold text-center">
                      {question?.query?.text}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1/2 w-full flex flex-col overflow-y-auto">
          <div className="flex flex-col gap-y-2 h-full">
            <div className="max-w-max text-gray-300 mx-auto bg-gray-900 px-4 py-1 rounded-full border border-gray-500 text-sm">
              {question?.type === "BLANK"
                ? "Nhập đáp án vào ô "
                : "Chọn tất cả các câu đúng"}
            </div>

            {question?.type === "BLANK" ? (
              <div className="w-full  h-full flex flex-col gap-2 sm:gap-4 bg-gray-800/50 rounded-lg items-center justify-center">
                <div className="max-w-2xl flex flex-col items-center justify-center gap-3">
                  <p className="text-gray-400">Nhập đáp án vào ô trống</p>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex items-center gap-2"
                    >
                      <FormField
                        control={form.control}
                        name="answer"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-full bg-white sm:text-xl md:text-2xl h-14"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button variant={"secondary"} className="h-14">
                        Nộp
                      </Button>
                    </form>
                  </Form>

                  <div className="w-fit h-10 text-white ">
                    <div
                      className={cn(
                        "px-3 py-2 bg-gray-500/50 rounded-sm",
                        status === "completed" && "bg-green-500",
                        status === "wrong" && "bg-red-500",
                        status === "none" && "hidden"
                      )}
                    >
                      {response?.[0]}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {question?.options.length > 0 && (
                  <ListQuestionOptions
                    options={question?.options}
                    type={question?.type}
                    answer={answer}
                    handleAnswer={handleAnswer}
                    response={response}
                    status={status}
                    isPending={isPending}
                  />
                )}

                {question?.type === "MTQ" && (
                  <div
                    className={
                      "w-full h-16 fixed bottom-0 flex items-center justify-between px-4 backdrop-blur-sm"
                    }
                  >
                    <div></div>
                    <div>
                      <Button
                        variant={"secondary"}
                        disabled={isPending}
                        onClick={() => {
                          handleResponse("MTQ", "");
                        }}
                      >
                        Nộp
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxLessonPlayer;

interface IPropList {
  options: IOption[];
  type: TypeQuestion;
  answer: (string | number)[];
  handleAnswer: (type: TypeQuestion, value: number | string) => void;
  response: (number | string)[];
  status: "none" | "completed" | "wrong";
  isPending: boolean;
}
function ListQuestionOptions({
  options,
  type,
  answer,
  handleAnswer,
  response,
  isPending,
  status,
}: IPropList) {
  return (
    <div
      className="w-full  h-full flex flex-col sm:flex-row gap-2 sm:gap-4"
      style={
        { "--totalOptions": options.length } as React.CSSProperties & {
          "--totalOptions": number;
        }
      }
    >
      {options.map((option) => {
        const selected = answer.includes(option.value);
        const success = response.includes(option.value);
        const isSuccess = status === "none" ? undefined : success;
        console.log({
          status,
          success,
          isSuccess,
          isBoolean: isSuccess === false,
        });

        return (
          <ButtonQuestionOption
            key={option._id}
            {...option}
            type={type}
            selected={selected}
            handleAnswer={handleAnswer}
            isSuccess={isSuccess}
            isPending={isPending}
            status={status}
          />
        );
      })}
    </div>
  );
}
