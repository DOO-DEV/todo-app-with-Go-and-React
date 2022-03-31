import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { ENDPOINT, Todo } from "../App";

function AddTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
      body: "",
      title: "",
    },
  });

  async function createTodo(values: { title: string; body: string }) {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      body: JSON.stringify(values),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((r) => r.json());
    mutate(updated);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)}>
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            placeholder="What you want to do?"
            label="Title"
            mb={10}
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            placeholder="Tell me more..."
            label="Body"
            mb={10}
            {...form.getInputProps("body")}
          />
          <Button type="submit">Create TODO</Button>
        </form>
      </Modal>
      <Button fullWidth onClick={() => setOpen(true)}>
        ADD TODO
      </Button>
    </>
  );
}

export default AddTodo;
