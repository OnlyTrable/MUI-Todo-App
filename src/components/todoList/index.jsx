import { Stack, Typography } from "@mui/material";
import TodoItem from "../todoItem";
import { useTranslation } from "react-i18next";

function TodoList({ todos, onToggle, onTodoClick }) {
    const { t } = useTranslation();
    return (
        <Stack spacing={2}>
            {todos.length > 0 ? (
                todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        {...todo}
                        onToggle={onToggle}
                        onTodoClick={onTodoClick}
                    />
                ))
            ) : (
                <Typography align="center" color="text.secondary">{t('other.noTasks')}</Typography>
            )}
        </Stack>
    );
}

export default TodoList;