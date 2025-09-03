import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from 'react-i18next';

function Filters({ currentFilter, onFilterChange }){
    const { t } = useTranslation();
    const handleFilterChange = (event, newFilter) => {
        // Забороняємо скасовувати вибір, щоб завжди був активний один фільтр
        if (newFilter !== null) {
            onFilterChange(newFilter);
        }
    };

    return(
        <ToggleButtonGroup
            value={currentFilter}
            exclusive
            onChange={handleFilterChange}
            aria-label="фільтри завдань"
            sx={{
                width: '100%',
                height: 48,
                borderRadius: '28px',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',

                '& .MuiToggleButton-root': {
                    flex: 1,
                    border: 'none',
                    borderRadius: 0,
                    textTransform: 'none', // M3 buttons are not all-caps
                    typography: 'h2', // Using h2 from your theme for button-like text
                    '&.Mui-selected, &.Mui-selected:hover': {
                        color: 'primary.main',
                        backgroundColor: 'secondary.main',
                    },
                },
                '& .MuiToggleButtonGroup-grouped:not(:last-of-type)': {
                    borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                },
            }}
        >
            <ToggleButton value="all" aria-label="всі завдання">
                {currentFilter === 'all' && <CheckIcon sx={{ mr: 1 }} />}
                {t('filters.all')}
            </ToggleButton>
            <ToggleButton value="active" aria-label="активні завдання">
                {currentFilter === 'active' && <CheckIcon sx={{ mr: 1 }} />}
                {t('filters.active')}
            </ToggleButton>
            <ToggleButton value="completed" aria-label="завершені завдання">
                {currentFilter === 'completed' && <CheckIcon sx={{ mr: 1 }} />}
                {t('filters.completed')}
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default Filters;