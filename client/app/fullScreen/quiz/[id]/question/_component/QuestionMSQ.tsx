import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusIcon, Trash2 } from "lucide-react";
import React from "react";
import {
  useFieldArray,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";

const QuestionMSQ = () => {
  const form = useFormContext();
  const control = form.control;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  return (
    <div className="flex-1 w-full mt-4 flex flex-col">
      <div className="w-full flex-1 flex flex-col sm:flex-row gap-2">
        <div
          className={cn(
            "grid flex-1 grid-cols-1 sm:grid-cols-4 gap-2",
            fields?.length === 2 && "grid-cols-1 sm:grid-cols-2",
            fields?.length === 3 && "grid-cols-1 sm:grid-cols-3",
            fields?.length === 4 && "grid-cols-1 sm:grid-cols-4"
          )}
        >
          {fields.map((field, index) => (
            <QuestionOptions
              key={field.id}
              index={index}
              remove={remove}
              value={index}
            />
          ))}
        </div>
        <div
          className={cn(
            "w-full sm:w-9 h-9 sm:h-full flex items-center justify-center",
            fields.length === 4 && "hidden"
          )}
        >
          <button
            type="button"
            className="size-8 rounded-sm border flex items-center justify-center text-white hover:bg-black/20"
            onClick={() => {
              append({
                value: fields.length,
                text: "",
              });
            }}
          >
            <PlusIcon size={20} />
          </button>
        </div>
      </div>
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <div className="h-10 w-full  mt-4">
            <Tabs value={field.value} className="h-full ">
              <TabsList className="bg-[#09090980] text-sm">
                <TabsTrigger
                  value="SGQ"
                  onClick={() => {
                    field.onChange("SGQ");
                    form.setValue("answer", []);
                  }}
                >
                  Câu trả lời duy nhất
                </TabsTrigger>
                <TabsTrigger
                  value="MTQ"
                  onClick={() => {
                    field.onChange("MTQ");
                    form.setValue("answer", []);
                  }}
                >
                  Nhiều câu trả lời đúng
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
      />
    </div>
  );
};

export default QuestionMSQ;

function QuestionOptions({
  index,
  remove,
  value,
}: {
  index: number;
  remove: UseFieldArrayRemove;
  value: number;
}) {
  const form = useFormContext();
  const type = form.watch("type");

  return (
    <div className="w-full h-full rounded-md p-1 flex flex-row sm:flex-col gap-1 bg-[#3FA2F6]">
      <div className="h-full sm:h-8 sm:w-full flex flex-col sm:flex-row items-center justify-between">
        <div>
          {form.watch("options")?.length > 2 && (
            <div
              className="p-1 rounded-sm border text-white cursor-pointer"
              onClick={() => {
                remove(index);
                form.setValue("answer", []);
              }}
            >
              <Trash2 size={14} />
            </div>
          )}
        </div>
        {type === "MTQ" ? (
          <div
            className={cn(
              "p-1 rounded-sm border text-white  cursor-pointer",
              form.watch("answer") && form.watch("answer").includes(value)
                ? "bg-green-500"
                : "",
              form.formState.errors.answer && "border-red-500 text-red-500"
            )}
            onClick={() => {
              const initAnswer = form.getValues("answer");
              const check = initAnswer.indexOf(value);

              if (check === -1) {
                form.setValue("answer", [...initAnswer, value]);
              } else {
                initAnswer.splice(check, 1);
                form.setValue("answer", [...initAnswer]);
              }
              form.clearErrors("answer");
            }}
          >
            <CheckIcon size={14} />
          </div>
        ) : (
          <div
            className={cn(
              "p-1 rounded-full border text-white  cursor-pointer",
              form.watch("answer") && form.watch("answer").includes(value)
                ? "bg-green-500"
                : "",
              form.formState.errors.answer && "border-red-500 text-red-500"
            )}
            onClick={() => {
              form.setValue("answer", [value]);
              form.clearErrors("answer");
            }}
          >
            <CheckIcon size={14} />
          </div>
        )}
      </div>

      <div className="w-full flex-1 mt-1">
        <FormField
          control={form.control}
          name={`options.${index}.text`}
          render={({ field }) => (
            <FormControl>
              <Textarea
                className={cn(
                  "flex justify-content items-center w-full h-full text-center resize-none leading-4 border-none text-white font-semibold md:text-xl placeholder:text-gray-200 focus:bg-gray-700/20 placeholder:font-medium"
                )}
                placeholder="Nhập câu hỏi tại đây !!!"
                {...field}
              />
            </FormControl>
          )}
        />
      </div>
    </div>
  );
}
