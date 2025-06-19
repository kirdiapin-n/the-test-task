import { CommentType } from "@/types";
import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

type Props = {
  onSubmitAction: (args: CommentType) => Promise<void>;
  submitText: string;
};

export default function CommentForm({ onSubmitAction, submitText }: Props) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      author: "",
      text: "",
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    await onSubmitAction(values);
    form.reset();
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack mt={8}>
        <TextInput key={form.key("author")} label="Author" required {...form.getInputProps("author")} />

        <Textarea key={form.key("text")} label="Comment" required {...form.getInputProps("text")} />

        <Button size="sm" type="submit">
          {submitText}
        </Button>
      </Stack>
    </form>
  );
}
