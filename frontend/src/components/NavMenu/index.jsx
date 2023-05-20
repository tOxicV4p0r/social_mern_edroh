import { DarkMode, Help, LightMode, Message, Notifications } from "@mui/icons-material";
import { FormControl, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogout, setMode } from "state";

const NavMenu = ({ fullName, theme, neutralLight, dark }) => {
    const dispatch = useDispatch();

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
            <Message sm={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName} >
                <Select
                    value={fullName}
                    sx={{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                            pr: "0.25.rem",
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