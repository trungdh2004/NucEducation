import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormTestType } from "./FormIndex";

interface Props {
  form: UseFormReturn<FormTestType, any, undefined>;
}

const FormItemTest = ({ form }: Props) => {
  return (
    <div>
      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormItemTest;
