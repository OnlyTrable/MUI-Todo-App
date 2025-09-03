import { FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";

function SearchBar({ searchQuery, onSearchChange }){
    const { t } = useTranslation();
    return(
        <FormControl fullWidth sx={{ width: '100%', maxWidth: 720 }}>
            <OutlinedInput
                placeholder={t('searchBar.placeholder')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                }
                sx={{
                    height: 48,
                    borderRadius: '28px',
                    backgroundColor: 'secondary.main',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& ::placeholder': {
                        color: '#49454F',
                        opacity: 1, // Важливо, щоб перебити стандартну прозорість
                    },
                }}
            />
        </FormControl>
    )
}

export default SearchBar;