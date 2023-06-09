import { useDispatch } from "react-redux";
import { setLogout, setMode } from "store";
import { DarkMode, Help, LightMode, Message, Notifications } from "@mui/icons-material";
import { FormControl, IconButton, MenuItem, Select, Typography } from "@mui/material";

const NavMenu = ({ fullName, theme, neutralLight, dark }) => {
    const dispatch = useDispatch();
    const lightMedium = theme.palette.neutral.lightMedium;

    return (
        <>
            <IconButton onClick={() => dispatch(setMode())} >
                {
                    theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )
                }
            </IconButton>
            <Message sx={{ fontSize: "25px", color: lightMedium }} />
            <Notifications sx={{ fontSize: "25px", color: lightMedium }} />
            <Help sx={{ fontSize: "25px", color: lightMedium }} />
            <FormControl variant="standard" value={fullName} >
                <Select
                    value={fullName}
                    sx={{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                            pr: "0.25rem",
                            width: "3rem"
                        },
                        "& .MuiSelect-select:focus": {
                            backgroundColor: neutralLight
                        }
                    }}
                >
                    <MenuItem value={fullName}>
                        <Typography>{fullName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default NavMenu;