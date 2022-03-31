import { Box, List, ThemeIcon } from "@mantine/core";
import { CheckCircleFillIcon } from "@primer/octicons-react";
import useSWR from "swr";
import AddTodo from "./components/AddTodo";

export const ENDPOINT = "http://localhost:4000";

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

function App() {
  const fetcher = (url: string) =>
    fetch(`${ENDPOINT}/${url}`).then((r) => r.json());
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);

  async function markTodoDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then((r) => r.json());
    mutate(updated);
  }

  return (
    <Box
      sx={(theme) => ({
        padding: "2rem",
        maxWidth: "40rem",
        margin: "0 auto",
        width: "100%",
      })}
    >
      <List center spacing="xs" size="sm" mb={12}>
        {data?.map((todo) => {
          return (
            <List.Item
              key={`todo_list__${todo.id}`}
              icon={
                <ThemeIcon
                  size={24}
                  color={todo.done ? "teal" : "gray"}
                  radius={"xl"}
                  onClick={() => markTodoDone(todo.id)}
                  sx={() => ({ cursor: "pointer" })}
                >
                  <CheckCircleFillIcon />
                </ThemeIcon>
              }
            >
              {todo.title}
            </List.Item>
          );
        })}
      </List>
      <AddTodo mutate={mutate} />
    </Box>
  );
}

export default App;
