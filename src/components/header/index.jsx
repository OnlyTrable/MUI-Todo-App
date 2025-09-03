import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function Header(){
    const { i18n } = useTranslation();
    const now = new Date();

    const localeMap = {
        uk: 'uk-UA',
        ru: 'ru-RU',
        en: 'en-US',
        de: 'de-DE',
    };

    const currentLocale = localeMap[i18n.language.split('-')[0]] || 'uk-UA';

    // Допоміжна функція для переводу першої літери у верхній регістр
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    };

    const dayOfWeek = capitalize(now.toLocaleDateString(currentLocale, { weekday: 'long' }));
    const date = now.toLocaleDateString(currentLocale, { day: 'numeric', month: 'long' });

    return(
        <Stack>
            <Typography variant="h1">{dayOfWeek}</Typography>
            <Typography variant="body2" color="text.secondary">{date}</Typography>
        </Stack>
    )
}

export default Header;