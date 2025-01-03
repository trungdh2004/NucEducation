import Image from "next/image";
import React, { useEffect, useState } from "react";
import ButtonQuestionOption from "./ButtonQuestionOption";
import { ILessonQuestion } from "@/types/lesson.type";
import { Input } from "@/components/ui/input";
import { IOption, TypeQuestion } from "@/types/question.type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FooterLessonPlayer from "./FooterLessonPlayer";

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
  handleNextQuestion: () => void;
}

const BoxLessonPlayer = ({
  question,
  totalQuestion,
  questionIndex,
  answer,
  handleAnswer,
  handleNextQuestion,
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
    handleNextQuestion();
  }

  return (
    <div className="w-full h-[calc(100vh-136px)] mt-16 p-4">
      <div className="w-full h-full flex flex-col gap-2">
        <div className="h-1/2 w-full flex flex-col">
          <div className="w-full relative flex items-center justify-center py-3 h-full transition-all duration-300 ">
            <div className="max-sm:w-full min-w-[60%] filter backdrop-blur-md border border-gray-600 relative sm:h-min h-fit rounded-md">
              <div className="absolute px-3 py-1 -top-4 bg-gray-900 left-1/2 border border-gray-600 rounded-full -translate-x-1/2 text-white text-sm">
                {questionIndex} / {totalQuestion}
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
                  />
                )}

                {question?.type === "MTQ" && (
                  <FooterLessonPlayer handleNextQuestion={handleNextQuestion} />
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
}
function ListQuestionOptions({
  options,
  type,
  answer,
  handleAnswer,
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
        console.log({
          answer,
          value: option.value,
          selected,
        });
        return (
          <ButtonQuestionOption
            key={option._id}
            {...option}
            type={type}
            selected={selected}
            handleAnswer={handleAnswer}
          />
        );
      })}
    </div>
  );
}
