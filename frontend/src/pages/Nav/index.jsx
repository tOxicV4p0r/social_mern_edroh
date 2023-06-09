import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import NavMenu from "components/NavMenu";
import FlexBetween from "components/FlexBetween";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Close,
    Menu,
    Search
} from "@mui/icons-material";

const Nav = () => {
    const navigate = useNavigate();
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = user.firstName;
    //const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <Box>
            <FlexBetween padding="1rem 6%" backgroundColor={alt} >
                <FlexBetween gap="1.75rem">
                    <Typography
                        fontWeight="bold"
                        fontSize="clamp(1rem, 2rem, 2.25rem)"
                        color="primary"
                        onClick={() => { navigate("/home") }}
                        sx={{
                            "&:hover": {
                                color: primaryLight,
                                cursor: "pointer"
                            }
                        }}
                    >
                        SocialPedia
                    </Typography>
                    {
                        isNonMobileScreens ?
                            <FlexBetween
                                backgroundColor={neutralLight}
                                borderRadius="9px"
                                gap="3rem"
                                padding="0.1rem 1.5rem"
                            >
                                <InputBase placeholder="Search..." ></InputBase>
                                <IconButton>
                                    <Search />
                                </IconButton>
                            </FlexBetween>
                            : null
                    }
                </FlexBetween>

                {/* DESKTOP NAV */}
                {
                    isNonMobileScreens ?
                        <FlexBetween gap="2rem">
                            <NavMenu fullName={fullName} theme={theme} neutralLight={neutralLight} dark={dark} />
                        </FlexBetween>
                        :
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Menu />
                        </IconButton>
                }

                {/* MOBILE NAV */}
                {
                    !isNonMobileScreens && isMobileMenuToggled ?
                        <Box
                            position="fixed"
                            right="0"
                            bottom="0"
                            height="100%"
                            zIndex="10"
                            maxWidth="500px"
                            minWidth="300px"
                            backgroundColor={background}
                        >
                            {/* CLOSE ICON */}
                            <Box display="flex" justifyContent="flex-end" p="1rem">
                                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                                    <Close />
                                </IconButton>
                            </Box>

                            {/* MENU ITEM */}
                            <FlexBetween display="flex" flexDirection="column" justifyContent="center" gap="2rem">
                                <NavMenu fullName={fullName} theme={theme} neutralLight={neutralLight} dark={dark} />
                            </FlexBetween>
                        </Box>
                        : null
                }

            </FlexBetween>
            <Outlet />
        </Box>
    )
}

export default Nav;