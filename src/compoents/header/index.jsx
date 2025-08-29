import { Typography } from "@mui/material";

function Header(){
    return(
        <div>
            <Typography variant="h1" sx={{
                letterSpacing: "mainTheme.typography.h1.letterSpacing",
            }}>Среда 13</Typography>
        </div>
    )
}

export default Header;