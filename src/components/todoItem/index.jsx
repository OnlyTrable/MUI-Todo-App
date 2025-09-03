import * as React from 'react';
import { ListItem, ListItemText, Checkbox } from "@mui/material";

function TodoItem({ id, text, date, completed, shouldRemind, onToggle, onTodoClick }){

    return(
        <ListItem
            onClick={() => onTodoClick({ id, text, date, completed, shouldRemind })}
            sx={{
                cursor: 'pointer',
                minWidth: 84,        // 396px
                minHeight: 7.75,      // 62px
                borderRadius: 4,      // 16px
                py: 1,                // 8px padding top/bottom
                pr: 1.5,              // 12px padding right
                pl: 1,                // 8px padding left
                gap: 1,               // 8px
                bgcolor: 'secondary.main',
                boxShadow: 1,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Checkbox
                edge="start"
                checked={completed}
                onChange={() => onToggle(id)}
                onClick={(e) => e.stopPropagation()}
            />
            <ListItemText
                primary={date}
                secondary={text}
                slotProps={{
                    primary: {
                        variant: 'body2',
                        color: 'text.primary',
                        sx: {
                            marginBottom: 1,
                        },
                    },
                    secondary: {
                        variant: 'body1',
                        color: 'text.primary',
                        sx: {
                            textDecoration: completed ? 'line-through' : 'none',
                        },
                    },
                }}
                sx={{ flexGrow: 1 }} />
        </ListItem>
    )
}

export default TodoItem;