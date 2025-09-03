import * as React from 'react';
import { Button, Stack, TextField, Box, Typography, Alert } from "@mui/material";
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
        height: 56,
        borderRadius: '4px',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
        },
    },
};

function TodoForm({ onAdd, onUpdate, onDelete, todoToEdit, handleClose }){
    const isEditMode = Boolean(todoToEdit);

    const { t, i18n } = useTranslation();
    const [text, setText] = React.useState('');
    const [date, setDate] = React.useState(null);
    const [textError, setTextError] = React.useState(false);
    const [dateError, setDateError] = React.useState(false);
    const [shouldRemind, setShouldRemind] = React.useState(false);

    React.useEffect(() => {
        if (isEditMode) {
            setText(todoToEdit.text);
            setDate(todoToEdit.date ? dayjs(todoToEdit.date, 'YYYY-MM-DD HH:mm') : null);
            setShouldRemind(todoToEdit.shouldRemind || false);
        } else {
            // Скидаємо форму для додавання нового завдання
            setText('');
            setDate(null);
            setShouldRemind(false);
        }
        // Скидаємо помилки при зміні режиму
        setTextError(false);
        setDateError(false);
    }, [todoToEdit, isEditMode]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!text.trim()) {
            setTextError(true);
            return;
        }

        // Дозволяємо зберігати минулу дату, якщо вона не змінювалася
        if (date && date.isBefore(dayjs()) && (!isEditMode || date.format('YYYY-MM-DD HH:mm') !== todoToEdit.date)) {
            setDateError(true);
            return;
        }

        const formattedDate = date ? date.format('YYYY-MM-DD HH:mm') : '';
        if (isEditMode) {
            onUpdate(todoToEdit.id, text, formattedDate, shouldRemind);
        } else {
            onAdd(text, formattedDate, shouldRemind);
        }
        handleClose();
    };
    return(
         <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language}>
            <Stack component="form" spacing={3} onSubmit={handleSubmit}>
            {/* 1. Drag Handle */}
            <Box
                sx={{
                    width: 32,
                    height: 4,
                    borderRadius: '100px',
                    bgcolor: 'divider',
                    alignSelf: 'center',
                }}
            />

            {/* 2. Task Input */}
            <TextField
                fullWidth
                label={t('todoForm.description')}
                variant="outlined"
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    setTextError(false);
                }}
                autoFocus
                sx={textFieldStyles}
                error={textError}
                helperText={textError ? t('todoForm.descriptionPlaceholder') : ''}
            />

            {/* 3. Date Input */}
            <DateTimePicker
                label={t('todoForm.date')}
                value={date}
                onChange={(newValue) => { setDate(newValue); setDateError(false); }}
                sx={textFieldStyles}
            />
            {dateError && (
                <Alert severity="error">{t('todoForm.dateError')}</Alert>
            )}


            {/* 4. "Remind me" section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1">{t('todoForm.remindMe')}</Typography>
                <Switch checked={shouldRemind} onChange={(e) => setShouldRemind(e.target.checked)} />
            </Box>

            {/* 5. Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {isEditMode && (
                    <Button variant="contained" /* стилізація кнопки Видалення */
                        onClick={() => { onDelete(todoToEdit.id); handleClose(); }}
                        sx={{ borderRadius: '100px', bgcolor: 'grey.200', color: 'error.main', textTransform: 'none' }}
                    >{t('todoForm.delete')}</Button>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, ml: 'auto' }}>
                    
                    <Button variant="contained" color="primary" type="submit" sx={{ borderRadius: '100px', textTransform: 'none' }}/* стилізація кнопки Додавання/Збереження */>
                        {isEditMode ? t('todoForm.save') : t('todoForm.add')}
                    </Button>
                    <Button /* стилізація кнопки Відмови */
                        variant="contained" onClick={handleClose}
                        sx={{
                            textTransform: 'none', borderRadius: '100px', bgcolor: 'grey.200', color: 'primary.main',
                            '&:hover': {bgcolor: 'grey.300',},
                        }
                    }
                    >
                        {t('todoForm.cancel')}
                    </Button>
                </Box>
            </Box>
            </Stack>
         </LocalizationProvider>
    )
}

export default TodoForm;